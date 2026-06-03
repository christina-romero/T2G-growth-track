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
import { TOTAL_UNITS } from '../data/courseContent'

const STORAGE_KEY = 't2g-growth-track-progress-v1'

const emptyProgress: CourseProgress = {
  modules: {},
  finalMoments: {},
  finalCompleted: false,
}

function loadProgress(): CourseProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress
    const parsed = JSON.parse(raw) as CourseProgress
    return {
      modules: parsed.modules ?? {},
      finalMoments: parsed.finalMoments ?? {},
      finalCompleted: parsed.finalCompleted ?? false,
    }
  } catch {
    return emptyProgress
  }
}

interface ProgressContextValue {
  progress: CourseProgress
  // module helpers
  getModule: (id: number) => ModuleProgress
  isModuleCompleted: (id: number) => boolean
  isModuleUnlocked: (id: number) => boolean
  updateModule: (id: number, patch: Partial<ModuleProgress>) => void
  completeModule: (id: number) => void
  // final helpers
  getMoment: (id: string) => MomentProgress
  updateMoment: (id: string, patch: Partial<MomentProgress>) => void
  completeFinal: () => void
  isFinalUnlocked: () => boolean
  // derived
  completedCount: number
  percentComplete: number
  certificationLevel: CertificationLevel
  nextModuleId: number | null
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<CourseProgress>(loadProgress)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // localStorage may be unavailable (private mode) — fail silently.
    }
  }, [progress])

  const getModule = useCallback(
    (id: number): ModuleProgress => progress.modules[id] ?? { completed: false },
    [progress.modules],
  )

  const isModuleCompleted = useCallback(
    (id: number) => Boolean(progress.modules[id]?.completed),
    [progress.modules],
  )

  // Modules unlock sequentially: module 1 is always open; module N opens once
  // module N-1 is complete.
  const isModuleUnlocked = useCallback(
    (id: number) => id <= 1 || Boolean(progress.modules[id - 1]?.completed),
    [progress.modules],
  )

  const updateModule = useCallback(
    (id: number, patch: Partial<ModuleProgress>) => {
      setProgress((prev) => ({
        ...prev,
        modules: {
          ...prev.modules,
          [id]: { ...(prev.modules[id] ?? { completed: false }), ...patch },
        },
      }))
    },
    [],
  )

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

  // The 9 content modules count toward unlocking the final task.
  const completedModuleCount = useMemo(
    () => Object.values(progress.modules).filter((m) => m?.completed).length,
    [progress.modules],
  )

  // Total completed units = 9 content modules + final task.
  const completedCount = completedModuleCount + (progress.finalCompleted ? 1 : 0)

  const percentComplete = Math.round((completedCount / TOTAL_UNITS) * 100)

  const isFinalUnlocked = useCallback(
    () => completedModuleCount >= 9,
    [completedModuleCount],
  )

  const certificationLevel: CertificationLevel = useMemo(() => {
    if (progress.finalCompleted) return 'Certified Guide'
    if (percentComplete >= 75) return 'Classroom Ready'
    if (percentComplete >= 50) return 'Practitioner'
    if (percentComplete >= 25) return 'Explorer'
    return 'Guide-in-Training'
  }, [percentComplete, progress.finalCompleted])

  const nextModuleId = useMemo(() => {
    for (let id = 1; id <= 9; id++) {
      if (!progress.modules[id]?.completed) return id
    }
    return null // all content modules done -> final task
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
    completedCount,
    percentComplete,
    certificationLevel,
    nextModuleId,
    resetProgress,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider')
  return ctx
}
