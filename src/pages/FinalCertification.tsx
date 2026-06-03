import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { finalSimulation } from '../data/courseContent'
import { useProgress } from '../context/ProgressContext'
import ScenarioCard from '../components/ScenarioCard'
import RubricFeedback from '../components/RubricFeedback'
import ReflectionBox from '../components/ReflectionBox'
import ProgressBar from '../components/ProgressBar'
import Badge from '../components/Badge'
import type { RubricCriterion } from '../types'
import { seededShuffle, hashSeed } from '../utils/shuffle'

export default function FinalCertification() {
  const navigate = useNavigate()
  const { isFinalUnlocked, getMoment, updateMoment, completeFinal, progress } = useProgress()
  const [activeIdx, setActiveIdx] = useState(0)

  const unlocked = isFinalUnlocked()

  const answeredCount = useMemo(
    () =>
      finalSimulation.filter((m) => Boolean(getMoment(m.id).practiceChoiceId)).length,
    [getMoment],
  )
  const allAnswered = answeredCount === finalSimulation.length

  // Varied-but-stable answer order per moment so the Guide-Level option isn't
  // always last. Computed once (seeded by moment id).
  const shuffledByMoment = useMemo(
    () =>
      Object.fromEntries(
        finalSimulation.map((m) => [m.id, seededShuffle(m.practice.options, hashSeed(m.id))]),
      ),
    [],
  )

  if (!unlocked) {
    return (
      <div className="page page--locked">
        <div className="lockedcard">
          <span className="lockedcard__icon">🔒</span>
          <h1>Final Certification is locked</h1>
          <p>
            Complete all nine modules to unlock the classroom simulation. You're building the moves
            you'll need here.
          </p>
          <Link to="/course" className="btn btn--primary">← Back to Course Map</Link>
        </div>
      </div>
    )
  }

  // ----- Completed view -----
  if (progress.finalCompleted) {
    return (
      <div className="page page--final-done">
        <div className="certificate">
          <span className="certificate__seal">🏅</span>
          <span className="certificate__kicker">Certified Future 2 Guide</span>
          <h1 className="certificate__title">You did it.</h1>
          <p className="certificate__body">
            You responded to all six Future 2 classroom moments and demonstrated high-fidelity Guide
            execution: a calm Launch, student-run transitions, data-driven Core Skills coaching,
            intrinsic motivation, direction-rich Experiences, and embedded reflection.
          </p>
          <div className="certificate__badges">
            <Badge label="Certified Guide" tone="success" icon="🏅" />
            <Badge label="100% complete" tone="success" icon="✓" />
          </div>
          <div className="certificate__actions">
            <Link to="/certification" className="btn btn--primary">View certification →</Link>
            <Link to="/course" className="btn">Revisit modules</Link>
          </div>
          <p className="certificate__foot">
            "Support, don't solve. Coach from the data. Belonging comes from contribution." Carry it
            into the room tomorrow.
          </p>
        </div>
      </div>
    )
  }

  const moment = finalSimulation[activeIdx]
  const momentProgress = getMoment(moment.id)
  const chosen = moment.practice.options.find((o) => o.id === momentProgress.practiceChoiceId)
  const momentOptions = shuffledByMoment[moment.id] ?? moment.practice.options

  const handleChoose = (optId: string) =>
    updateMoment(moment.id, { practiceChoiceId: optId })

  const goPrev = () => setActiveIdx((i) => Math.max(0, i - 1))
  const goNext = () => setActiveIdx((i) => Math.min(finalSimulation.length - 1, i + 1))

  const handleCertify = () => {
    completeFinal()
    navigate('/final')
  }

  return (
    <div className="page page--final">
      <header className="pagehead">
        <div>
          <span className="pagehead__kicker">★ Final Guide Certification</span>
          <h1 className="pagehead__title">The classroom simulation</h1>
          <p className="pagehead__sub">
            Six moments, one day in a Future 2 room. Make the Guide call on each. Respond to all six
            to earn <strong>Certified Guide</strong>.
          </p>
        </div>
        <div className="pagehead__progress">
          <ProgressBar
            percent={(answeredCount / finalSimulation.length) * 100}
            label={`${answeredCount} of ${finalSimulation.length} moments answered`}
          />
        </div>
      </header>

      {/* Moment tabs */}
      <nav className="momenttabs" aria-label="Simulation moments">
        {finalSimulation.map((m, i) => {
          const answered = Boolean(getMoment(m.id).practiceChoiceId)
          return (
            <button
              key={m.id}
              className={`momenttab ${i === activeIdx ? 'is-active' : ''} ${
                answered ? 'is-answered' : ''
              }`}
              onClick={() => setActiveIdx(i)}
            >
              <span className="momenttab__num">{answered ? '✓' : i + 1}</span>
              <span className="momenttab__label">{m.label}</span>
            </button>
          )
        })}
      </nav>

      <section className="momentpanel">
        <div className="momentpanel__head">
          <Badge label={`Moment ${activeIdx + 1} of 6`} tone="progress" />
          <h2 className="momentpanel__title">{moment.label}</h2>
        </div>

        <ScenarioCard kicker="The moment" scenario={moment.scenario} />

        <div className="options">
          {momentOptions.map((opt) => (
            <button
              key={opt.id}
              className={`option ${momentProgress.practiceChoiceId === opt.id ? 'is-chosen' : ''}`}
              onClick={() => handleChoose(opt.id)}
            >
              <span className="option__dot" aria-hidden="true">
                {momentProgress.practiceChoiceId === opt.id ? '●' : '○'}
              </span>
              <span className="option__text">{opt.text}</span>
            </button>
          ))}
        </div>

        {chosen && (
          <>
            <RubricFeedback chosen={chosen} rubric={MINI_RUBRIC} />
            <ReflectionBox
              prompt={moment.reflectionPrompt}
              value={momentProgress.reflection ?? ''}
              onChange={(v) => updateMoment(moment.id, { reflection: v })}
              label="Quick reflection"
            />
          </>
        )}

        <div className="stepnav">
          <button className="btn" onClick={goPrev} disabled={activeIdx === 0}>
            ← Previous moment
          </button>
          {activeIdx < finalSimulation.length - 1 ? (
            <button className="btn btn--primary" onClick={goNext} disabled={!chosen}>
              {chosen ? 'Next moment →' : 'Make a call to continue'}
            </button>
          ) : (
            <span className="stepnav__end">Last moment — finish below ✓</span>
          )}
        </div>
      </section>

      {/* Certify bar */}
      <section className="finalcertbar">
        <div>
          <h3 className="finalcertbar__title">
            {allAnswered ? 'All six moments answered 🎉' : `Answer all six moments to certify`}
          </h3>
          <p className="finalcertbar__sub">
            {allAnswered
              ? 'You can revise any moment — then claim your certification.'
              : `${answeredCount}/${finalSimulation.length} done. Work through each moment above.`}
          </p>
        </div>
        <button className="btn btn--primary btn--lg" onClick={handleCertify} disabled={!allAnswered}>
          Become a Certified Guide 🏅
        </button>
      </section>
    </div>
  )
}

// A compact, shared rubric used across all simulation moments.
const MINI_RUBRIC: RubricCriterion[] = [
  {
    name: 'Fidelity to the Guide move',
    levels: {
      'Not Yet': 'Reverts to a traditional / control move.',
      Developing: 'Well-meant but missing the system.',
      Ready: 'Solid Guide practice.',
      'Guide-Level': 'High-fidelity, data-informed, student-run.',
    },
  },
]
