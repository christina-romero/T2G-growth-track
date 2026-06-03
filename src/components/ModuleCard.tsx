import { Link } from 'react-router-dom'
import Badge from './Badge'

interface ModuleCardProps {
  id: number
  title: string
  estimatedTime: string
  learningGoal: string
  completed: boolean
  unlocked: boolean
  isFinal?: boolean
}

/** A course-map card for a single module (or the final certification task). */
export default function ModuleCard({
  id,
  title,
  estimatedTime,
  learningGoal,
  completed,
  unlocked,
  isFinal = false,
}: ModuleCardProps) {
  const to = isFinal ? '/final' : `/module/${id}`

  const status = completed ? 'completed' : unlocked ? 'open' : 'locked'

  const inner = (
    <div className={`modulecard modulecard--${status} ${isFinal ? 'modulecard--final' : ''}`}>
      <div className="modulecard__row">
        <span className="modulecard__num">{isFinal ? '★' : id}</span>
        <div className="modulecard__meta">
          <h3 className="modulecard__title">{title}</h3>
          <span className="modulecard__time">⏱ {estimatedTime}</span>
        </div>
        {completed && <Badge label="Complete" tone="success" icon="✓" />}
        {!completed && !unlocked && <Badge label="Locked" tone="locked" icon="🔒" />}
      </div>
      <p className="modulecard__goal">{learningGoal}</p>
      <div className="modulecard__foot">
        {unlocked ? (
          <span className="modulecard__cta">
            {completed ? 'Review module' : isFinal ? 'Begin certification' : 'Start module'} →
          </span>
        ) : (
          <span className="modulecard__cta modulecard__cta--muted">
            Finish the previous module to unlock
          </span>
        )}
      </div>
    </div>
  )

  if (!unlocked) {
    return <div className="modulecard-link modulecard-link--disabled">{inner}</div>
  }

  return (
    <Link to={to} className="modulecard-link">
      {inner}
    </Link>
  )
}
