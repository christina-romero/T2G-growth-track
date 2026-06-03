import type { PracticeOption, RubricCriterion, RubricLevel } from '../types'
import { RUBRIC_LEVELS } from '../types'
import Badge from './Badge'

interface RubricFeedbackProps {
  /** The option the teacher selected. */
  chosen: PracticeOption
  /** The rubric for this task. */
  rubric: RubricCriterion[]
}

const LEVEL_META: Record<RubricLevel, { icon: string; tone: 'rubric' }> = {
  'Not Yet': { icon: '🌱', tone: 'rubric' },
  Developing: { icon: '🌿', tone: 'rubric' },
  Ready: { icon: '⭐', tone: 'rubric' },
  'Guide-Level': { icon: '🏅', tone: 'rubric' },
}

const ENCOURAGEMENT: Record<RubricLevel, string> = {
  'Not Yet': 'Good start — this is exactly where growth happens. Try the move again with the feedback in mind.',
  Developing: 'You\'re on the path. One adjustment moves this toward Guide-Level.',
  Ready: 'Strong work — this is solid Guide practice. A small refinement makes it exemplary.',
  'Guide-Level': 'That\'s the bar. This is what high-fidelity Guide execution looks like.',
}

/** Shows immediate, encouraging rubric-based feedback for a practice choice. */
export default function RubricFeedback({ chosen, rubric }: RubricFeedbackProps) {
  const levelIndex = RUBRIC_LEVELS.indexOf(chosen.level)
  const meta = LEVEL_META[chosen.level]

  return (
    <div className={`rubricfeedback rubricfeedback--level-${levelIndex}`}>
      <div className="rubricfeedback__head">
        <Badge label={chosen.level} tone={meta.tone} icon={meta.icon} />
        <span className="rubricfeedback__encourage">{ENCOURAGEMENT[chosen.level]}</span>
      </div>

      <div className="rubricfeedback__coach">
        <strong>Coaching note:</strong> {chosen.feedback}
      </div>

      <div className="rubricfeedback__rubric">
        <div className="rubricfeedback__rubric-head">Where this lands on the rubric</div>
        <div className="rubric-table">
          <div className="rubric-table__row rubric-table__row--header">
            <span className="rubric-table__cell rubric-table__cell--name">Criterion</span>
            {RUBRIC_LEVELS.map((lvl) => (
              <span
                key={lvl}
                className={`rubric-table__cell rubric-table__cell--lvl ${
                  lvl === chosen.level ? 'is-current' : ''
                }`}
              >
                {LEVEL_META[lvl].icon} {lvl}
              </span>
            ))}
          </div>
          {rubric.map((crit) => (
            <div key={crit.name} className="rubric-table__row">
              <span className="rubric-table__cell rubric-table__cell--name">{crit.name}</span>
              {RUBRIC_LEVELS.map((lvl) => (
                <span
                  key={lvl}
                  className={`rubric-table__cell rubric-table__cell--lvl ${
                    lvl === chosen.level ? 'is-current' : ''
                  }`}
                >
                  {crit.levels[lvl]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
