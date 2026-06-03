import type { ReactNode } from 'react'

interface DashboardCardProps {
  title: string
  value?: ReactNode
  hint?: string
  icon?: string
  accent?: 'blue' | 'gold' | 'green' | 'plain'
  children?: ReactNode
}

/** A summary card for the Home dashboard (a single stat or a small panel). */
export default function DashboardCard({
  title,
  value,
  hint,
  icon,
  accent = 'plain',
  children,
}: DashboardCardProps) {
  return (
    <div className={`dashcard dashcard--${accent}`}>
      <div className="dashcard__head">
        {icon && <span className="dashcard__icon" aria-hidden="true">{icon}</span>}
        <span className="dashcard__title">{title}</span>
      </div>
      {value !== undefined && <div className="dashcard__value">{value}</div>}
      {children}
      {hint && <div className="dashcard__hint">{hint}</div>}
    </div>
  )
}
