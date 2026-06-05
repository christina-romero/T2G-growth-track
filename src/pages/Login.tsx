import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type Mode = 'signin' | 'signup'

interface LocationState {
  from?: string
}

export default function Login() {
  const { configured, user, signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as LocationState | null)?.from ?? '/'

  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  // In local mode there is no login — send people to the app.
  if (!configured) return <Navigate to="/" replace />
  // Already signed in — bounce to where they were headed.
  if (user) return <Navigate to={from} replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setNotice(null)
    if (!email.trim() || password.length < 6) {
      setError('Enter your email and a password of at least 6 characters.')
      return
    }
    setBusy(true)
    try {
      if (mode === 'signin') {
        const { error } = await signIn(email.trim(), password)
        if (error) setError(error)
        else navigate(from, { replace: true })
      } else {
        const { error, session } = await signUp(email.trim(), password)
        if (error) {
          setError(error)
        } else if (session) {
          navigate(from, { replace: true })
        } else {
          setNotice(
            'Account created. If email confirmation is on, check your inbox to confirm, then sign in.',
          )
          setMode('signin')
        }
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="loginpage">
      <div className="logincard">
        <div className="logincard__brand">
          <span className="brand__mark">T2G</span>
          <div className="brand__name">
            Growth Track
            <small>Future 2 · Guide Certification</small>
          </div>
        </div>

        <h1 className="logincard__title">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="logincard__sub">
          {mode === 'signin'
            ? 'Sign in to pick up your certification where you left off.'
            : 'Sign up with your email to save your progress across devices.'}
        </p>

        <form className="loginform" onSubmit={handleSubmit}>
          <label className="loginform__field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.org"
              required
            />
          </label>
          <label className="loginform__field">
            <span>Password</span>
            <input
              type="password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
            />
          </label>

          {error && <div className="loginform__error">{error}</div>}
          {notice && <div className="loginform__notice">{notice}</div>}

          <button type="submit" className="btn btn--primary btn--lg loginform__submit" disabled={busy}>
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="logincard__switch">
          {mode === 'signin' ? (
            <>
              New here?{' '}
              <button className="linklike" onClick={() => { setMode('signup'); setError(null); setNotice(null) }}>
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button className="linklike" onClick={() => { setMode('signin'); setError(null); setNotice(null) }}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
