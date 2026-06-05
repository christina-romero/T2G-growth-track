import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  CertificationLevel,
  CourseProgress,
  ModuleProgress,
  MomentProgress,
} from '../types'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'
import { computeStats, emptyProgress, normalizeProgress } from '../lib/progressStats'

// Anonymous (logged-out / local-mode) progress keeps the original key so any
// existing per-browser progress is preserved. Signed-in users get a per-user key.
const ANON_KEY = 't2g-growth-track-progress-v1'
const userKey = (userId: string | null) =>
  userId ? `t2g-growth-track-progress-${userId}` : ANON_KEY

function loadLocal(key: string): CourseProgress {
  try {
    const raw = localStorage.getItem(key)
    return raw ? normalizeProgress(JSON.parse(raw)) : emptyProgress
  } catch {
    return emptyProgress
  }
}

interface ProgressContextValue {
  progress: CourseProgress
  getModule: (id: number) => ModuleProgress
  isModuleCompleted: (id: number) => boolean
  isModuleUnlocked: (id: number) => boolean
  updateModule: (id: number, patch: Partial<ModuleProgress>) => void
  completeModule: (id: number) => void
  getMoment: (id: string) => MomentProgress
  updateMoment: (id: string, patch: Partial<MomentProgress>) => void
  completeFinal: () => void
  isFinalUnlocked: () => boolean
  completedCount: number
  percentComplete: number
  certificationLevel: CertificationLevel
  nextModuleId: number | null
  resetProgress: () => void
  /** true while a signed-in user's cloud progress is still loading. */
  syncing: boolean
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const storageKey = userKey(userId)

  const [progress, setProgress] = useState<CourseProgress>(emptyProgress)
  // Don't persist until the correct data has been hydrated, so we never
  // overwrite a user's cloud progress with an empty initial state.
  const [hydrated, setHydrated] = useState(false)

  // Hydrate whenever the active user changes.
  useEffect(() => {
    let active = true
    setHydrated(false)
    // Show cached local copy instantly…
    setProgress(loadLocal(storageKey))
    if (userId && supabase) {
      // …then override with the authoritative cloud copy.
      supabase
        .from('user_progress')
        .select('data')
        .eq('user_id', userId)
        .maybeSingle()
        .then(({ data }) => {
          if (!active) return
          if (data?.data) setProgress(normalizeProgress(data.data))
          setHydrated(true)
        })
    } else {
      setHydrated(true)
    }
    return () => {
      active = false
    }
  }, [userId, storageKey])

  // Persist on change: local cache always; debounced cloud upsert when signed in.
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress))
    } catch {
      // ignore (private mode, quota, etc.)
    }
    if (userId && supabase) {
      const t = setTimeout(() => {
        supabase!
          .from('user_progress')
          .upsert({
            user_id: userId,
            data: progress,
            updated_at: new Date().toISOString(),
          })
          .then(({ error }) => {
            if (error) console.warn('Progress sync failed:', error.message)
          })
      }, 600)
      return () => clearTimeout(t)
    }
  }, [progress, hydrated, userId, storageKey])

  const getModule = useCallback(
    (id: number): ModuleProgress => progress.modules[id] ?? { completed: false },
    [progress.modules],
  )

  const isModuleCompleted = useCallback(
    (id: number) => Boolean(progress.modules[id]?.completed),
    [progress.modules],
  )

  const isModuleUnlocked = useCallback(
    (id: number) => id <= 1 || Boolean(progress.modules[id - 1]?.completed),
    [progress.modules],
  )

  const updateModule = useCallback((id: number, patch: Partial<ModuleProgress>) => {
    setProgress((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [id]: { ...(prev.modules[id] ?? { completed: false }), ...patch },
      },
    }))
  }, [])

  const completeModule = useCallback(
    (id: number) => updateModule(id, { completed: true }),
    [updateModule],
  )

  const getMoment = useCallback(
    (id: string): MomentProgress => progress.finalMoments[id] ?? {},
    [progress.finalMoments],
  )

  const updateMoment = useCallback((id: string, patch: Partial<MomentProgress>) => {
    setProgress((prev) => ({
      ...prev,
      finalMoments: {
        ...prev.finalMoments,
        [id]: { ...(prev.finalMoments[id] ?? {}), ...patch },
      },
    }))
  }, [])

  const completeFinal = useCallback(() => {
    setProgress((prev) => ({ ...prev, finalCompleted: true }))
  }, [])

  const resetProgress = useCallback(() => setProgress(emptyProgress), [])

  const stats = useMemo(() => computeStats(progress), [progress])

  const isFinalUnlocked = useCallback(
    () => stats.completedModuleCount >= 9,
    [stats.completedModuleCount],
  )

  const nextModuleId = useMemo(() => {
    for (let id = 1; id <= 9; id++) {
      if (!progress.modules[id]?.completed) return id
    }
    return null
  }, [progress.modules])

  const value: ProgressContextValue = {
    progress,
    getModule,
    isModuleCompleted,
    isModuleUnlocked,
    updateModule,
    completeModule,
    getMoment,
    updateMoment,
    completeFinal,
    isFinalUnlocked,
    completedCount: stats.completedCount,
    percentComplete: stats.percent,
    certificationLevel: stats.level,
    nextModuleId,
    resetProgress,
    syncing: Boolean(userId) && !hydrated,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider')
  return ctx
}
