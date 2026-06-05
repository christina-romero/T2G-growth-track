import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { isSupabaseConfigured } from '../supabaseConfig'

export interface Profile {
  id: string
  email: string | null
  role: string
  full_name: string | null
}

interface AuthValue {
  /** Whether Supabase accounts are switched on at all. */
  configured: boolean
  /** True while the initial session is being resolved. */
  loading: boolean
  user: User | null
  profile: Profile | null
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string) => Promise<{ error: string | null; session: boolean }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  // In local mode there's nothing to load, so we're never "loading".
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  const loadProfile = useCallback(async (u: User | null) => {
    if (!u || !supabase) {
      setProfile(null)
      return
    }
    const { data } = await supabase
      .from('profiles')
      .select('id,email,role,full_name')
      .eq('id', u.id)
      .maybeSingle()
    setProfile(
      (data as Profile | null) ?? {
        id: u.id,
        email: u.email ?? null,
        role: 'teacher',
        full_name: null,
      },
    )
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    let active = true
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return
      const s = data.session
      setUser(s?.user ?? null)
      await loadProfile(s?.user ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange(
      async (_event: string, session: Session | null) => {
        setUser(session?.user ?? null)
        await loadProfile(session?.user ?? null)
      },
    )
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [loadProfile])

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error: string | null }> => {
      if (!supabase) return { error: 'Accounts are not enabled yet.' }
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error: error?.message ?? null }
    },
    [],
  )

  const signUp = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{ error: string | null; session: boolean }> => {
      if (!supabase) return { error: 'Accounts are not enabled yet.', session: false }
      const { data, error } = await supabase.auth.signUp({ email, password })
      return { error: error?.message ?? null, session: Boolean(data.session) }
    },
    [],
  )

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }, [])

  const value: AuthValue = {
    configured: isSupabaseConfigured,
    loading,
    user,
    profile,
    isAdmin: profile?.role === 'admin',
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
