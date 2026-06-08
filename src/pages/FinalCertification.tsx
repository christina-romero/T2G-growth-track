import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { finalSimulation } from '../data/courseContent'
import { useProgress } from '../context/ProgressContext'
import ScenarioCard from '../components/ScenarioCard'
import ReflectionBox from '../components/ReflectionBox'
import ProgressBar from '../components/ProgressBar'
import Badge from '../components/Badge'
import type { Artifact } from '../types'

const MIN_ARTIFACT = 30

export default function FinalCertification() {
  const navigate = useNavigate()
  const { isFinalUnlocked, getMoment, updateMoment, completeFinal, progress } = useProgress()
  const [activeIdx, setActiveIdx] = useState(0)

  const isAnswered = (momentId: string) =>
    ((getMoment(momentId).artifact?.text ?? '').trim().length) >= MIN_ARTIFACT

  const answeredCount = useMemo(
    () => finalSimulation.filter((m) => isAnswered(m.id)).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [progress.finalMoments],
  )
  const allAnswered = answeredCount === finalSimulation.length

  if (!isFinalUnlocked()) {
    return (
      <div className="page page--locked">
        <div className="lockedcard">
          <span className="lockedcard__icon">🔒</span>
          <h1>Final Certification is locked</h1>
          <p>Complete all nine modules to unlock the capstone. You're authoring the moves you'll use here.</p>
          <Link to="/course" className="btn btn--primary">← Back to Course Map</Link>
        </div>
      </div>
    )
  }

  if (progress.finalCompleted) {
    return (
      <div className="page page--final-done">
        <div className="certificate">
          <span className="certificate__seal">🏅</span>
          <span className="certificate__kicker">Certified Future 2 Guide</span>
          <h1 className="certificate__title">You did it.</h1>
          <p className="certificate__body">
            You authored a response to every Future 2 moment — curating environments, facilitating
            student-led Experiences, coaching stuck points, building motivation, deciding from data,
            and planning events that last. Your portfolio is the proof.
          </p>
          <div className="certificate__badges">
            <Badge label="Certified Guide" tone="success" icon="🏅" />
            <Badge label="100% complete" tone="success" icon="✓" />
          </div>
          <div className="certificate__actions">
            <Link to="/portfolio" className="btn btn--primary">View your portfolio →</Link>
            <Link to="/course" className="btn">Revisit modules</Link>
          </div>
        </div>
      </div>
    )
  }

  const moment = finalSimulation[activeIdx]
  const mp = getMoment(moment.id)
  const artifact: Artifact = mp.artifact ?? { text: '', link: '' }

  const setArtifact = (text: string) =>
    updateMoment(moment.id, {
      artifact: { ...artifact, text, updatedAt: new Date().toISOString() },
    })

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
          <h1 className="pagehead__title">The capstone</h1>
          <p className="pagehead__sub">
            Author your move for each moment. Respond to all {finalSimulation.length} to earn{' '}
            <strong>Certified Guide</strong>.
          </p>
        </div>
        <div className="pagehead__progress">
          <ProgressBar
            percent={(answeredCount / finalSimulation.length) * 100}
            label={`${answeredCount} of ${finalSimulation.length} authored`}
          />
        </div>
      </header>

      <nav className="momenttabs" aria-label="Capstone moments">
        {finalSimulation.map((m, i) => (
          <button
            key={m.id}
            className={`momenttab ${i === activeIdx ? 'is-active' : ''} ${
              isAnswered(m.id) ? 'is-answered' : ''
            }`}
            onClick={() => setActiveIdx(i)}
          >
            <span className="momenttab__num">{isAnswered(m.id) ? '✓' : i + 1}</span>
            <span className="momenttab__label">{m.label}</span>
          </button>
        ))}
      </nav>

      <section className="momentpanel">
        <div className="momentpanel__head">
          <Badge label={`Moment ${activeIdx + 1} of ${finalSimulation.length}`} tone="progress" />
          <Badge label={moment.competency} tone="rubric" icon="🎯" />
        </div>
        <h2 className="momentpanel__title">{moment.label}</h2>

        <ScenarioCard kicker="The moment" scenario={moment.scenario} />

        <div className="artifact artifact--moment">
          <p className="artifact__prompt">{moment.artifactPrompt}</p>
          <textarea
            className="artifact__text"
            value={artifact.text ?? ''}
            onChange={(e) => setArtifact(e.target.value)}
            placeholder="Author your move…"
            rows={6}
          />
          <div className="artifact__foot">
            <span className={`artifact__count ${isAnswered(moment.id) ? 'is-ok' : ''}`}>
              {isAnswered(moment.id)
                ? '✓ Saved to your portfolio'
                : `${(artifact.text ?? '').trim().length}/${MIN_ARTIFACT} characters`}
            </span>
          </div>
          <details className="artifact__guide">
            <summary>What a strong response looks like</summary>
            <ul>
              {moment.strongLooksLike.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </details>
        </div>

        <ReflectionBox
          prompt={moment.reflectionPrompt}
          value={mp.reflection ?? ''}
          onChange={(v) => updateMoment(moment.id, { reflection: v })}
          label="Quick reflection"
        />

        <div className="stepnav">
          <button className="btn" onClick={goPrev} disabled={activeIdx === 0}>← Previous</button>
          {activeIdx < finalSimulation.length - 1 ? (
            <button className="btn btn--primary" onClick={goNext}>Next moment →</button>
          ) : (
            <span className="stepnav__end">Last moment — finish below ✓</span>
          )}
        </div>
      </section>

      <section className="finalcertbar">
        <div>
          <h3 className="finalcertbar__title">
            {allAnswered ? 'All moments authored 🎉' : 'Author all moments to certify'}
          </h3>
          <p className="finalcertbar__sub">
            {allAnswered
              ? 'Claim your certification — your responses are saved to your portfolio.'
              : `${answeredCount}/${finalSimulation.length} done.`}
          </p>
        </div>
        <button className="btn btn--primary btn--lg" onClick={handleCertify} disabled={!allAnswered}>
          Become a Certified Guide 🏅
        </button>
      </section>
    </div>
  )
}
