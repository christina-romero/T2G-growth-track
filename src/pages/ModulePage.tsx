import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { modules } from '../data/courseContent'
import { useProgress } from '../context/ProgressContext'
import ScenarioCard from '../components/ScenarioCard'
import RubricFeedback from '../components/RubricFeedback'
import ReflectionBox from '../components/ReflectionBox'
import ProgressBar from '../components/ProgressBar'
import Badge from '../components/Badge'

const STEPS = [
  { key: 'hook', label: 'Hook', icon: '🎬' },
  { key: 'learn', label: 'Learn', icon: '📘' },
  { key: 'see', label: 'See It', icon: '👀' },
  { key: 'try', label: 'Try It', icon: '🎯' },
  { key: 'feedback', label: 'Get Feedback', icon: '🧭' },
  { key: 'reflect', label: 'Reflect', icon: '💭' },
  { key: 'certify', label: 'Certify', icon: '🏅' },
] as const

export default function ModulePage() {
  const { id } = useParams()
  const moduleId = Number(id)
  const navigate = useNavigate()
  const {
    getModule,
    updateModule,
    completeModule,
    isModuleUnlocked,
    isModuleCompleted,
  } = useProgress()

  const module = useMemo(() => modules.find((m) => m.id === moduleId), [moduleId])
  const saved = getModule(moduleId)

  const [step, setStep] = useState(0)
  const [choiceId, setChoiceId] = useState<string | undefined>(saved.practiceChoiceId)

  if (!module) {
    return (
      <div className="page">
        <p>Module not found.</p>
        <Link to="/course" className="btn">← Back to Course Map</Link>
      </div>
    )
  }

  if (!isModuleUnlocked(moduleId)) {
    return (
      <div className="page page--locked">
        <div className="lockedcard">
          <span className="lockedcard__icon">🔒</span>
          <h1>Module {moduleId} is locked</h1>
          <p>Finish Module {moduleId - 1} first — each skill builds on the one before it.</p>
          <Link to="/course" className="btn btn--primary">← Back to Course Map</Link>
        </div>
      </div>
    )
  }

  const chosenOption = module.practice.options.find((o) => o.id === choiceId)
  const reflection = saved.reflection ?? ''
  const certifyResponse = saved.certifyResponse ?? ''
  const completed = isModuleCompleted(moduleId)

  const stepKey = STEPS[step].key

  const canAdvance = (() => {
    if (stepKey === 'try') return Boolean(chosenOption)
    return true
  })()

  const goNext = () => setStep((s) => Math.min(STEPS.length - 1, s + 1))
  const goPrev = () => setStep((s) => Math.max(0, s - 1))

  const handleChoose = (optId: string) => {
    setChoiceId(optId)
    updateModule(moduleId, { practiceChoiceId: optId })
  }

  const handleComplete = () => {
    completeModule(moduleId)
    if (moduleId < 9) navigate(`/module/${moduleId + 1}`)
    else navigate('/final')
  }

  return (
    <div className="page page--module">
      <div className="module-topline">
        <Link to="/course" className="backlink">← Course Map</Link>
        {completed && <Badge label="Completed" tone="success" icon="✓" />}
      </div>

      <header className="modulehead">
        <span className="modulehead__kicker">Module {module.id}</span>
        <h1 className="modulehead__title">{module.title}</h1>
        <div className="modulehead__meta">
          <span>⏱ {module.estimatedTime}</span>
        </div>
        <div className="modulehead__goal">
          <strong>Learning goal:</strong> {module.learningGoal}
        </div>
      </header>

      {/* Stepper — free navigation, except Get Feedback needs a choice first. */}
      <nav className="stepper" aria-label="Module steps">
        {STEPS.map((s, i) => {
          const isLocked = s.key === 'feedback' && !chosenOption
          return (
            <button
              key={s.key}
              className={`stepper__item ${i === step ? 'is-active' : ''} ${
                i < step ? 'is-done' : ''
              }`}
              onClick={() => {
                if (!isLocked) setStep(i)
              }}
              disabled={isLocked}
              aria-current={i === step ? 'step' : undefined}
            >
              <span className="stepper__icon" aria-hidden="true">{s.icon}</span>
              <span className="stepper__label">{s.label}</span>
            </button>
          )
        })}
      </nav>

      <ProgressBar
        percent={((step + 1) / STEPS.length) * 100}
        label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step].label}`}
      />

      {/* Step body */}
      <section className="stepbody">
        {stepKey === 'hook' && (
          <div className="stepblock">
            <ScenarioCard kicker="Hook — a real classroom moment" scenario={module.scenario} />
            <p className="stepblock__lead">
              Read the moment above. By the end of this module you'll know the Guide move — and
              you'll prove it.
            </p>
          </div>
        )}

        {stepKey === 'learn' && (
          <div className="stepblock">
            <h2 className="stepblock__h">📘 Learn — the core skill</h2>
            {module.lesson.map((p, i) => (
              <p key={i} className="stepblock__p">{p}</p>
            ))}
            {module.keyTerms && module.keyTerms.length > 0 && (
              <div className="termlist">
                <span className="termlist__head">Key terms</span>
                {module.keyTerms.map((t) => (
                  <div key={t.term} className="termlist__item">
                    <strong>{t.term}:</strong> {t.def}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {stepKey === 'see' && (
          <div className="stepblock">
            <h2 className="stepblock__h">👀 See It — strong Guide execution</h2>
            <div className="example">
              {module.example.map((p, i) => (
                <p key={i} className="stepblock__p">{p}</p>
              ))}
            </div>
            {module.nonNegotiables && (
              <div className="nonneg">
                <span className="nonneg__head">⛔ Non-negotiables</span>
                <ul>
                  {module.nonNegotiables.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {stepKey === 'try' && (
          <div className="stepblock">
            <h2 className="stepblock__h">🎯 Try It — make the call</h2>
            <ScenarioCard kicker="The decision" scenario={module.practice.prompt} />
            <div className="options">
              {module.practice.options.map((opt) => (
                <button
                  key={opt.id}
                  className={`option ${choiceId === opt.id ? 'is-chosen' : ''}`}
                  onClick={() => handleChoose(opt.id)}
                >
                  <span className="option__dot" aria-hidden="true">
                    {choiceId === opt.id ? '●' : '○'}
                  </span>
                  <span className="option__text">{opt.text}</span>
                </button>
              ))}
            </div>
            {!chosenOption && (
              <p className="stepblock__hint">Choose the move you'd make, then continue for feedback.</p>
            )}
            {chosenOption && (
              <p className="stepblock__hint stepblock__hint--ok">
                Choice saved. Continue to see how it lands on the rubric →
              </p>
            )}
          </div>
        )}

        {stepKey === 'feedback' && chosenOption && (
          <div className="stepblock">
            <h2 className="stepblock__h">🧭 Get Feedback</h2>
            <RubricFeedback chosen={chosenOption} rubric={module.rubric} />
            <p className="stepblock__hint">
              Want a higher rating? Step back to <button className="linklike" onClick={() => setStep(3)}>Try It</button> and pick a stronger move — there's no penalty here.
            </p>
          </div>
        )}

        {stepKey === 'reflect' && (
          <div className="stepblock">
            <h2 className="stepblock__h">💭 Reflect</h2>
            <ReflectionBox
              prompt={module.reflectionPrompt}
              value={reflection}
              onChange={(v) => updateModule(moduleId, { reflection: v })}
              label="What would you do differently tomorrow?"
            />
          </div>
        )}

        {stepKey === 'certify' && (
          <div className="stepblock">
            <h2 className="stepblock__h">🏅 Certify — module performance task</h2>
            <div className="certtask">
              <span className="certtask__kicker">Performance task</span>
              <p className="certtask__prompt">{module.certifyTask}</p>
            </div>
            <ReflectionBox
              prompt="Write your response. This is your evidence for this module."
              value={certifyResponse}
              onChange={(v) => updateModule(moduleId, { certifyResponse: v })}
              label="Your performance task"
              placeholder="Lay out your move concretely…"
              minChars={40}
            />
            <div className="completebar">
              <button
                className="btn btn--primary btn--lg"
                onClick={handleComplete}
                disabled={certifyResponse.trim().length < 40}
              >
                {completed ? 'Save & continue' : 'Complete module'} ✓
              </button>
              {certifyResponse.trim().length < 40 && (
                <span className="completebar__hint">
                  Add a little more to your performance task to complete the module.
                </span>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Footer nav */}
      <div className="stepnav">
        <button className="btn" onClick={goPrev} disabled={step === 0}>
          ← Back
        </button>
        {step < STEPS.length - 1 ? (
          <button className="btn btn--primary" onClick={goNext} disabled={!canAdvance}>
            {stepKey === 'try' && !canAdvance ? 'Choose a move to continue' : 'Next →'}
          </button>
        ) : (
          <span className="stepnav__end">Finish the performance task above to complete ✓</span>
        )}
      </div>
    </div>
  )
}
