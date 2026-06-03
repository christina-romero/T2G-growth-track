import type { CertificationLevel } from '../types'
import Badge from './Badge'

interface CertLevelDef {
  level: CertificationLevel
  threshold: number // percent required (final task overrides)
  icon: string
  blurb: string
}

export const CERT_LADDER: CertLevelDef[] = [
  {
    level: 'Explorer',
    threshold: 25,
    icon: '🧭',
    blurb: 'You\'ve started the journey — 25% of the course complete.',
  },
  {
    level: 'Practitioner',
    threshold: 50,
    icon: '🛠',
    blurb: 'Halfway. You\'re running real Guide systems — 50% complete.',
  },
  {
    level: 'Classroom Ready',
    threshold: 75,
    icon: '🚀',
    blurb: 'You\'re ready for the room — 75% complete.',
  },
  {
    level: 'Certified Guide',
    threshold: 100,
    icon: '🏅',
    blurb: 'You passed the final classroom simulation. You are a Certified Guide.',
  },
]

interface CertificationStatusProps {
  currentLevel: CertificationLevel
  percent: number
  finalCompleted: boolean
  compact?: boolean
}

/** Shows the certification ladder and the teacher's current standing. */
export default function CertificationStatus({
  currentLevel,
  percent,
  finalCompleted,
  compact = false,
}: CertificationStatusProps) {
  const isEarned = (def: CertLevelDef) =>
    def.level === 'Certified Guide' ? finalCompleted : percent >= def.threshold

  return (
    <div className={`certstatus ${compact ? 'certstatus--compact' : ''}`}>
      {!compact && (
        <div className="certstatus__current">
          <span className="certstatus__current-label">Current certification level</span>
          <span className="certstatus__current-level">
            {currentLevel === 'Guide-in-Training' ? 'Guide-in-Training' : currentLevel}
          </span>
        </div>
      )}
      <ol className="certstatus__ladder">
        {CERT_LADDER.map((def) => {
          const earned = isEarned(def)
          const current = def.level === currentLevel
          return (
            <li
              key={def.level}
              className={`certstatus__step ${earned ? 'is-earned' : ''} ${
                current ? 'is-current' : ''
              }`}
            >
              <div className="certstatus__step-top">
                <Badge
                  label={def.level}
                  tone={earned ? 'success' : 'level'}
                  icon={earned ? def.icon : '🔒'}
                  earned={earned}
                />
                {current && <span className="certstatus__youarehere">You are here</span>}
              </div>
              {!compact && <p className="certstatus__blurb">{def.blurb}</p>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
