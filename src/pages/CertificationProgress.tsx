import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { modules } from '../data/courseContent'
import CertificationStatus from '../components/CertificationStatus'
import ProgressBar from '../components/ProgressBar'
import Badge from '../components/Badge'
import ResetProgress from '../components/ResetProgress'

export default function CertificationProgress() {
  const {
    percentComplete,
    certificationLevel,
    progress,
    isModuleCompleted,
    getModule,
  } = useProgress()

  const reflections = modules
    .map((m) => ({ module: m, text: getModule(m.id).reflection?.trim() }))
    .filter((r) => r.text)

  return (
    <div className="page page--cert">
      <header className="pagehead">
        <div>
          <span className="pagehead__kicker">🏅 Certification Progress</span>
          <h1 className="pagehead__title">How close are you to Certified Guide?</h1>
          <p className="pagehead__sub">
            You earn a new level as you progress. Every step forward is real growth — this track is
            built to encourage, not to grade.
          </p>
        </div>
        <div className="pagehead__progress">
          <ProgressBar percent={percentComplete} label="Overall progress" />
        </div>
      </header>

      <section className="certpanel">
        <CertificationStatus
          currentLevel={certificationLevel}
          percent={percentComplete}
          finalCompleted={progress.finalCompleted}
        />
      </section>

      <section className="certmodules">
        <h2 className="section-h">Module checklist</h2>
        <ul className="checklist">
          {modules.map((m) => {
            const done = isModuleCompleted(m.id)
            return (
              <li key={m.id} className={`checklist__item ${done ? 'is-done' : ''}`}>
                <span className="checklist__mark" aria-hidden="true">{done ? '✓' : '○'}</span>
                <span className="checklist__title">
                  <Link to={`/module/${m.id}`}>
                    {m.id}. {m.title}
                  </Link>
                </span>
                {done ? (
                  <Badge label="Complete" tone="success" icon="✓" />
                ) : (
                  <span className="checklist__time">⏱ {m.estimatedTime}</span>
                )}
              </li>
            )
          })}
          <li className={`checklist__item ${progress.finalCompleted ? 'is-done' : ''}`}>
            <span className="checklist__mark" aria-hidden="true">
              {progress.finalCompleted ? '✓' : '★'}
            </span>
            <span className="checklist__title">
              <Link to="/final">Final Guide Certification — classroom simulation</Link>
            </span>
            {progress.finalCompleted ? (
              <Badge label="Certified" tone="success" icon="🏅" />
            ) : (
              <span className="checklist__time">6 moments</span>
            )}
          </li>
        </ul>
      </section>

      {reflections.length > 0 && (
        <section className="reflectionlog">
          <h2 className="section-h">Your reflections so far</h2>
          <p className="reflectionlog__sub">
            These are saved on this device. They're a record of how your practice is shifting.
          </p>
          <div className="reflectionlog__list">
            {reflections.map((r) => (
              <blockquote key={r.module.id} className="reflectionlog__item">
                <span className="reflectionlog__from">{r.module.title}</span>
                <p>"{r.text}"</p>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <section className="resetrow">
        <ResetProgress label="Reset my progress" />
      </section>
    </div>
  )
}
