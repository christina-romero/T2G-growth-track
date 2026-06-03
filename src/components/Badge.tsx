type BadgeTone = 'neutral' | 'locked' | 'progress' | 'success' | 'level' | 'rubric'

interface BadgeProps {
  label: string
  tone?: BadgeTone
  icon?: string
  earned?: boolean
  title?: string
}

/** A small pill / achievement badge. */
export default function Badge({
  label,
  tone = 'neutral',
  icon,
  earned = true,
  title,
}: BadgeProps) {
  return (
    <span
      className={`badge badge--${tone} ${earned ? '' : 'badge--unearned'}`}
      title={title ?? label}
    >
      {icon && <span className="badge__icon" aria-hidden="true">{icon}</span>}
      {label}
    </span>
  )
}
