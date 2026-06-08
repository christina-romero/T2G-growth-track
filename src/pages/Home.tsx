import { Link, useNavigate } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { modules, TOTAL_UNITS } from '../data/courseContent'
import DashboardCard from '../components/DashboardCard'
import ProgressBar from '../components/ProgressBar'
import Badge from '../components/Badge'
import CertificationStatus from '../components/CertificationStatus'
import { northStar } from '../data/t2gPhilosophy'

export default function Home() {
  const navigate = useNavigate()
  const {
    percentComplete,
    completedCount,
    certificationLevel,
    nextModuleId,
    isModuleCompleted,
    isModuleUnlocked,
    progress,
  } = useProgress()

  const completedModules = modules.filter((m) => isModuleCompleted(m.id))
  const lockedModules = modules.filter((m) => !isModuleUnlocked(m.id))
  const finalReady = modules.every((m) => isModuleCompleted(m.id))

  const continueTo = () => {
    if (nextModuleId) navigate(`/module/${nextModuleId}`)
    else navigate('/final')
  }

  const continueLabel = (() => {
    if (progress.finalCompleted) return 'Review the course'
    if (nextModuleId === null) return 'Start Final Certification'
    if (completedCount === 0) return 'Start the course'
    return 'Continue course'
  })()

  return (
    <div className="page page--home">
      <section className="hero">
        <div className="hero__text">
          <span className="hero__kicker">Welcome back, future Guide 👋</span>
          <h1 className="hero__title">Your path to becoming a Certified Future 2 Guide</h1>
          <p className="hero__sub">
            Ten modules. Real classroom moments. You practice the move, get coached, and reflect —
            then prove it in a live classroom simulation. This is a growth track, not a test.
          </p>
          <button className="btn btn--primary btn--lg" onClick={continueTo}>
            {continueLabel} →
          </button>
        </div>
        <div className="hero__progress">
          <CertificationStatus
            currentLevel={certificationLevel}
            percent={percentComplete}
            finalCompleted={progress.finalCompleted}
            compact
          />
        </div>
      </section>

      <section className="foundations-banner">
        <div className="foundations-banner__text">
          <span className="foundations-banner__kicker">🌱 What this whole track is built on</span>
          <p className="foundations-banner__quote">"{northStar}"</p>
          <p className="foundations-banner__sub">
            The Teacher-to-Guide philosophy and the Culture System are the context for every module.
          </p>
        </div>
        <Link to="/foundations" className="btn">
          Explore the Foundations →
        </Link>
      </section>

      <section className="dashgrid">
        <DashboardCard
          title="Percent complete"
          icon="📈"
          accent="blue"
          value={`${percentComplete}%`}
        >
          <ProgressBar percent={percentComplete} showValue={false} />
          <div className="dashcard__hint">
            {completedCount} of {TOTAL_UNITS} units complete
          </div>
        </DashboardCard>

        <DashboardCard
          title="Modules completed"
          icon="✓"
          accent="green"
          value={`${completedModules.length} / ${modules.length}`}
          hint={
            completedModules.length === 0
              ? 'Your first module is waiting.'
              : completedModules.map((m) => m.title).slice(-2).join(' · ')
          }
        />

        <DashboardCard
          title="Modules still locked"
          icon="🔒"
          accent="plain"
          value={lockedModules.length}
          hint={
            lockedModules.length === 0
              ? 'Everything is unlocked — nice momentum.'
              : `Next up: ${lockedModules[0]?.title}`
          }
        />

        <DashboardCard title="Current certification level" icon="🏅" accent="gold">
          <div className="dashcard__levelbig">{certificationLevel}</div>
          <div className="dashcard__levelbadges">
            <Badge
              label="Explorer"
              tone={percentComplete >= 25 ? 'success' : 'level'}
              icon={percentComplete >= 25 ? '🧭' : '🔒'}
              earned={percentComplete >= 25}
            />
            <Badge
              label="Practitioner"
              tone={percentComplete >= 50 ? 'success' : 'level'}
              icon={percentComplete >= 50 ? '🛠' : '🔒'}
              earned={percentComplete >= 50}
            />
            <Badge
              label="Classroom Ready"
              tone={percentComplete >= 75 ? 'success' : 'level'}
              icon={percentComplete >= 75 ? '🚀' : '🔒'}
              earned={percentComplete >= 75}
            />
            <Badge
              label="Certified Guide"
              tone={progress.finalCompleted ? 'success' : 'level'}
              icon={progress.finalCompleted ? '🏅' : '🔒'}
              earned={progress.finalCompleted}
            />
          </div>
        </DashboardCard>
      </section>

      <section className="continue-strip">
        <div>
          <h2 className="continue-strip__title">
            {progress.finalCompleted
              ? 'You\'re a Certified Guide 🎉'
              : nextModuleId
                ? `Up next: Module ${nextModuleId} — ${modules.find((m) => m.id === nextModuleId)?.title}`
                : 'Final step: the classroom simulation'}
          </h2>
          <p className="continue-strip__sub">
            {progress.finalCompleted
              ? 'Revisit any module any time — your reflections are saved.'
              : finalReady
                ? 'All nine modules are done. Time to prove it in the simulation.'
                : 'Pick up exactly where you left off. Progress saves automatically.'}
          </p>
        </div>
        <button className="btn btn--primary" onClick={continueTo}>
          {continueLabel} →
        </button>
      </section>

      <p className="home__maplink">
        Prefer the full picture? <Link to="/course">Open the Course Map →</Link>
      </p>
    </div>
  )
}
