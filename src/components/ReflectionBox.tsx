interface ReflectionBoxProps {
  prompt: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minChars?: number
  label?: string
}

/** A reflective free-text box ("What would you do differently tomorrow?"). */
export default function ReflectionBox({
  prompt,
  value,
  onChange,
  placeholder = 'Write a few honest sentences…',
  minChars = 0,
  label = 'Reflection',
}: ReflectionBoxProps) {
  const count = value.trim().length
  const meetsMin = count >= minChars

  return (
    <div className="reflectionbox">
      <label className="reflectionbox__label">
        <span className="reflectionbox__kicker">💭 {label}</span>
        <span className="reflectionbox__prompt">{prompt}</span>
      </label>
      <textarea
        className="reflectionbox__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
      />
      <div className="reflectionbox__foot">
        {minChars > 0 && (
          <span className={`reflectionbox__count ${meetsMin ? 'is-ok' : ''}`}>
            {meetsMin ? '✓ saved as you type' : `${count}/${minChars} characters`}
          </span>
        )}
        {minChars === 0 && value.trim() && (
          <span className="reflectionbox__count is-ok">✓ saved as you type</span>
        )}
      </div>
    </div>
  )
}
