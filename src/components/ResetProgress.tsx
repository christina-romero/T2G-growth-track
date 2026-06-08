import { useState } from 'react'
import { useProgress } from '../context/ProgressContext'

interface ResetProgressProps {
  /** 'button' = ghost button (default); 'link' = subtle text link. */
  variant?: 'button' | 'link'
  label?: string
}

/**
 * A "wipe everything clean" control with an inline two-step confirm.
 * Clears all module + final-task progress and reflections via the progress
 * layer (which also clears the saved copy in storage / cloud).
 */
export default function ResetProgress({ variant = 'button', label = 'Reset progress' }: ResetProgressProps) {
  const { resetProgress, progress } = useProgress()
  const [confirming, setConfirming] = useState(false)
  const [done, setDone] = useState(false)

  const hasProgress =
    Object.keys(progress.modules).length > 0 ||
    Object.keys(progress.finalMoments).length > 0 ||
    progress.finalCompleted

  if (done) {
    return <span className="reset-done">✓ Progress cleared — fresh start.</span>
  }

  if (confirming) {
    return (
      <div className="resetconfirm" role="alertdialog" aria-label="Confirm reset progress">
        <span className="resetconfirm__msg">
          This wipes <strong>all</strong> your progress and reflections. This can't be undone.
        </span>
        <div className="resetconfirm__actions">
          <button
            className="btn btn--danger"
            onClick={() => {
              resetProgress()
              setConfirming(false)
              setDone(true)
              // Let the confirmation linger briefly, then return to the button.
              window.setTimeout(() => setDone(false), 2500)
            }}
          >
            Yes, wipe everything
          </button>
          <button className="btn" onClick={() => setConfirming(false)}>
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      className={variant === 'link' ? 'linklike reset-link' : 'btn btn--ghost'}
      onClick={() => setConfirming(true)}
      disabled={!hasProgress}
      title={hasProgress ? 'Clear all progress and reflections' : 'Nothing to reset yet'}
    >
      ↺ {label}
    </button>
  )
}
