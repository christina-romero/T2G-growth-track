import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { modules } from '../data/courseContent'
import { useProgress } from '../context/ProgressContext'
import ScenarioCard from '../components/ScenarioCard'
import ReflectionBox from '../components/ReflectionBox'
import ProgressBar from '../components/ProgressBar'
import Badge from '../components/Badge'
import ArtifactBuilder from '../components/ArtifactBuilder'
import type { Artifact } from '../types'

const STEPS = [
  { key: 'hook', label: 'Hook', icon: '🎬' },
  { key: 'learn', label: 'Learn', icon: '📘' },
  { key: 'see', label: 'See It', icon: '👀' },
  { key: 'build', label: 'Build', icon: '🛠' },
  { key: 'reflect', label: 'Reflect', icon: '💭' },
] as const

const MIN_ARTIFACT = 40

export default function ModulePage() {
  const { id } = useParams()
  const moduleId = Number(id)
  const navigate = useNavigate()
  const { getModule, updateModule, completeModule, isModuleUnlocked, isModuleCompleted } =
    useProgress()
  const [step, setStep] = useState(0)

  const module = modules.find((m) => m.id === moduleId)

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
          <p>Finish Module {moduleId - 1} first — each competency builds on the one before it.</p>
          <Link to="/course" className="btn btn--primary">← Back to Course Map</Link>
        </div>
      </div>
    )
  }

  const saved = getModule(moduleId)
  const artifact: Artifact = saved.artifact ?? { text: '', link: '' }
  const reflection = saved.reflection ?? ''
  const completed = isModuleCompleted(moduleId)
  const stepKey = STEPS[step].key
  const artifactReady = (artifact.text ?? '').trim().length >= MIN_ARTIFACT

  const setArtifact = (patch: Partial<Artifact>) =>
    updateModule(moduleId, {
      artifact: { ...artifact, ...patch, updatedAt: new Date().toISOString() },
    })

  const goNext = () => setStep((s) => Math.min(STEPS.length - 1, s + 1))
  const goPrev = () => setStep((s) => Math.max(0, s - 1))

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
        <div className="modulehead__tags">
          <Badge label={module.competency} tone="rubric" icon="🎯" />
          <span className="modulehead__time">⏱ {module.estimatedTime}</span>
        </div>
      </header>

      <nav className="stepper" aria-label="Module steps">
        {STEPS.map((s, i) => (
          <button
            key={s.key}
            className={`stepper__item ${i === step ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`}
            onClick={() => setStep(i)}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className="stepper__icon" aria-hidden="true">{s.icon}</span>
            <span className="stepper__label">{s.label}</span>
          </button>
        ))}
      </nav>

      <ProgressBar
        percent={((step + 1) / STEPS.length) * 100}
        label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step].label}`}
      />

      <section className="stepbody">
        {stepKey === 'hook' && (
          <div className="stepblock">
            <ScenarioCard kicker="Hook — a real classroom moment" scenario={module.scenario} />
            <p className="stepblock__goal">
              <strong>You'll build toward:</strong> {module.competency}.
            </p>
          </div>
        )}

        {stepKey === 'learn' && (
          <div className="stepblock">
            <h2 className="stepblock__h">📘 Learn</h2>
            <ul className="learnlist">
              {module.lessonPoints.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            {module.keyTerms && module.keyTerms.length > 0 && (
              <div className="termlist">
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
            <h2 className="stepblock__h">👀 See It</h2>
            <div className="example example--single">{module.example}</div>
            {module.nonNegotiables && (
              <div className="nonneg">
                <span className="nonneg__head">Non-negotiables</span>
                <ul>
                  {module.nonNegotiables.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {stepKey === 'build' && (
          <div className="stepblock">
            <ArtifactBuilder
              task={module.artifact}
              text={artifact.text ?? ''}
              link={artifact.link ?? ''}
              onChange={setArtifact}
              minChars={MIN_ARTIFACT}
            />
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
            <div className="completebar">
              <button
                className="btn btn--primary btn--lg"
                onClick={handleComplete}
                disabled={!artifactReady}
              >
                {completed ? 'Save & continue' : 'Complete module'} ✓
              </button>
              {!artifactReady && (
                <span className="completebar__hint">
                  Add your artifact in the <button className="linklike" onClick={() => setStep(3)}>Build</button> step to complete.
                </span>
              )}
            </div>
          </div>
        )}
      </section>

      <div className="stepnav">
        <button className="btn" onClick={goPrev} disabled={step === 0}>← Back</button>
        {step < STEPS.length - 1 ? (
          <button className="btn btn--primary" onClick={goNext}>Next →</button>
        ) : (
          <span className="stepnav__end">Finish your artifact + reflection to complete ✓</span>
        )}
      </div>
    </div>
  )
}
