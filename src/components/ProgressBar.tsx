interface ProgressBarProps {
  /** 0-100 */
  percent: number
  label?: string
  showValue?: boolean
}

/** A simple, accessible progress bar. */
export default function ProgressBar({ percent, label, showValue = true }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)))
  return (
    <div className="progressbar">
      {(label || showValue) && (
        <div className="progressbar__top">
          {label && <span className="progressbar__label">{label}</span>}
          {showValue && <span className="progressbar__value">{clamped}%</span>}
        </div>
      )}
      <div
        className="progressbar__track"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Course progress'}
      >
        <div className="progressbar__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}
