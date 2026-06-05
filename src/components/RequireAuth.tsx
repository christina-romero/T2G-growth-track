import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Gate for the authenticated app.
 * - Local mode (no Supabase configured): lets everyone through (anonymous).
 * - Cloud mode: waits for the session, then requires a signed-in user.
 */
export default function RequireAuth() {
  const { configured, loading, user } = useAuth()
  const location = useLocation()

  if (!configured) return <Outlet />

  if (loading) {
    return (
      <div className="authsplash">
        <div className="authsplash__spinner" aria-hidden="true" />
        <p>Loading your account…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
