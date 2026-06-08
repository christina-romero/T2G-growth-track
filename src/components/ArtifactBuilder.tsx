import type { ArtifactTask } from '../types'

interface ArtifactBuilderProps {
  task: ArtifactTask
  text: string
  link: string
  onChange: (patch: { text?: string; link?: string }) => void
  minChars?: number
}

/**
 * The authorship core: the teacher writes a work product (plus an optional link)
 * that saves to their portfolio. No scoring — guidance only.
 */
export default function ArtifactBuilder({
  task,
  text,
  link,
  onChange,
  minChars = 40,
}: ArtifactBuilderProps) {
  const count = text.trim().length
  const ready = count >= minChars

  return (
    <div className="artifact">
      <div className="artifact__head">
        <span className="artifact__kicker">🛠 Build your artifact</span>
        <h3 className="artifact__title">{task.title}</h3>
        <p className="artifact__prompt">{task.prompt}</p>
      </div>

      {task.starters && task.starters.length > 0 && (
        <ul className="artifact__starters">
          {task.starters.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}

      <textarea
        className="artifact__text"
        value={text}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder={task.placeholder ?? 'Author your work here…'}
        rows={7}
      />

      <input
        className="artifact__link"
        type="url"
        value={link}
        onChange={(e) => onChange({ link: e.target.value })}
        placeholder={task.linkLabel ?? 'Link (optional) — Google Doc, photo, slides…'}
      />

      <div className="artifact__foot">
        <span className={`artifact__count ${ready ? 'is-ok' : ''}`}>
          {ready
            ? '✓ Saved to your portfolio as you type'
            : `${count}/${minChars} characters to save it`}
        </span>
      </div>

      <details className="artifact__guide">
        <summary>What a strong artifact looks like</summary>
        <ul>
          {task.strongLooksLike.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </details>
    </div>
  )
}
