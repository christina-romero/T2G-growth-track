import { useProgress } from '../context/ProgressContext'
import { modules } from '../data/courseContent'
import ModuleCard from '../components/ModuleCard'
import ProgressBar from '../components/ProgressBar'

export default function CourseMap() {
  const { isModuleCompleted, isModuleUnlocked, isFinalUnlocked, progress, percentComplete } =
    useProgress()

  return (
    <div className="page page--course">
      <header className="pagehead">
        <div>
          <span className="pagehead__kicker">🗺 Course Map</span>
          <h1 className="pagehead__title">Ten steps to Certified Guide</h1>
          <p className="pagehead__sub">
            Each module follows the same rhythm: Hook → Learn → See It → Try It → Get Feedback →
            Reflect → Certify. Modules unlock in order so each skill builds on the last.
          </p>
        </div>
        <div className="pagehead__progress">
          <ProgressBar percent={percentComplete} label="Overall progress" />
        </div>
      </header>

      <div className="modulegrid">
        {modules.map((m) => (
          <ModuleCard
            key={m.id}
            id={m.id}
            title={m.title}
            estimatedTime={m.estimatedTime}
            learningGoal={m.learningGoal}
            completed={isModuleCompleted(m.id)}
            unlocked={isModuleUnlocked(m.id)}
          />
        ))}

        <ModuleCard
          id={10}
          title="Final Guide Certification"
          estimatedTime="30 min"
          learningGoal="A live classroom simulation: respond to six Future 2 moments to earn Certified Guide."
          completed={progress.finalCompleted}
          unlocked={isFinalUnlocked()}
          isFinal
        />
      </div>
    </div>
  )
}
