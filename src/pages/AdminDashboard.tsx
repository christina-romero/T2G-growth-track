import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { computeStats, normalizeProgress } from '../lib/progressStats'
import type { CertificationLevel } from '../types'
import Badge from '../components/Badge'
import ProgressBar from '../components/ProgressBar'

interface Row {
  id: string
  email: string
  role: string
  percent: number
  level: CertificationLevel
  completedModules: number
  finalCompleted: boolean
  updatedAt: string | null
}

export default function AdminDashboard() {
  const { configured, isAdmin, loading: authLoading } = useAuth()
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!configured || !supabase || !isAdmin) {
      setLoading(false)
      return
    }
    let active = true
    ;(async () => {
      setLoading(true)
      const [{ data: profiles, error: pErr }, { data: progress, error: gErr }] = await Promise.all([
        supabase.from('profiles').select('id,email,role,created_at'),
        supabase.from('user_progress').select('user_id,data,updated_at'),
      ])
      if (!active) return
      if (pErr || gErr) {
        setError(pErr?.message ?? gErr?.message ?? 'Failed to load data.')
        setLoading(false)
        return
      }
      const progressByUser = new Map(
        (progress ?? []).map((r) => [r.user_id as string, r]),
      )
      const merged: Row[] = (profiles ?? []).map((p) => {
        const rec = progressByUser.get(p.id as string)
        const data = normalizeProgress(rec?.data)
        const s = computeStats(data)
        return {
          id: p.id as string,
          email: (p.email as string) ?? '(no email)',
          role: (p.role as string) ?? 'teacher',
          percent: s.percent,
          level: s.level,
          completedModules: s.completedModuleCount,
          finalCompleted: data.finalCompleted,
          updatedAt: (rec?.updated_at as string) ?? null,
        }
      })
      merged.sort((a, b) => b.percent - a.percent)
      setRows(merged)
      setLoading(false)
    })()
    return () => {
      active = false
    }
  }, [configured, isAdmin])

  const summary = useMemo(() => {
    const total = rows.length
    const certified = rows.filter((r) => r.finalCompleted).length
    const active = rows.filter((r) => r.percent > 0).length
    const avg = total ? Math.round(rows.reduce((s, r) => s + r.percent, 0) / total) : 0
    return { total, certified, active, avg }
  }, [rows])

  if (!configured) {
    return (
      <div className="page">
        <header className="pagehead">
          <div>
            <span className="pagehead__kicker">🛡 Admin</span>
            <h1 className="pagehead__title">Admin dashboard</h1>
            <p className="pagehead__sub">
              Accounts aren't enabled yet, so there's no cohort data to show. Once Supabase is
              configured and teachers sign in, their progress appears here.
            </p>
          </div>
        </header>
      </div>
    )
  }

  if (!authLoading && !isAdmin) {
    return (
      <div className="page page--locked">
        <div className="lockedcard">
          <span className="lockedcard__icon">🛡</span>
          <h1>Admins only</h1>
          <p>This page is restricted to administrators. If you need access, ask an admin to grant it.</p>
          <Link to="/" className="btn btn--primary">← Back to dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page page--admin">
      <header className="pagehead">
        <div>
          <span className="pagehead__kicker">🛡 Admin</span>
          <h1 className="pagehead__title">Cohort progress</h1>
          <p className="pagehead__sub">
            Every teacher's certification progress, updated as they work. Sorted by completion.
          </p>
        </div>
      </header>

      <section className="dashgrid">
        <div className="dashcard dashcard--blue">
          <span className="dashcard__title">Teachers</span>
          <div className="dashcard__value">{summary.total}</div>
        </div>
        <div className="dashcard dashcard--green">
          <span className="dashcard__title">Certified Guides</span>
          <div className="dashcard__value">{summary.certified}</div>
        </div>
        <div className="dashcard">
          <span className="dashcard__title">Started</span>
          <div className="dashcard__value">{summary.active}</div>
        </div>
        <div className="dashcard dashcard--gold">
          <span className="dashcard__title">Avg. completion</span>
          <div className="dashcard__value">{summary.avg}%</div>
        </div>
      </section>

      {loading ? (
        <p className="admin__loading">Loading cohort…</p>
      ) : error ? (
        <p className="loginform__error">{error}</p>
      ) : rows.length === 0 ? (
        <p className="admin__empty">No teachers have signed up yet.</p>
      ) : (
        <div className="admintable-wrap">
          <table className="admintable">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Level</th>
                <th>Progress</th>
                <th>Modules</th>
                <th>Last active</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <span className="admintable__email">{r.email}</span>
                    {r.role === 'admin' && <Badge label="admin" tone="rubric" />}
                  </td>
                  <td>
                    <Badge
                      label={r.level}
                      tone={r.finalCompleted ? 'success' : 'level'}
                      icon={r.finalCompleted ? '🏅' : undefined}
                    />
                  </td>
                  <td className="admintable__progress">
                    <ProgressBar percent={r.percent} showValue />
                  </td>
                  <td>{r.completedModules}/9</td>
                  <td className="admintable__date">
                    {r.updatedAt ? new Date(r.updatedAt).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
