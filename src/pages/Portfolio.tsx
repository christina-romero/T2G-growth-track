import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { modules, finalSimulation } from '../data/courseContent'
import Badge from '../components/Badge'

interface Entry {
  key: string
  title: string
  competency: string
  source: string
  text: string
  link?: string
  to: string
}

export default function Portfolio() {
  const { getModule, getMoment } = useProgress()

  const moduleEntries = modules.flatMap<Entry>((m) => {
    const a = getModule(m.id).artifact
    if (!a?.text || !a.text.trim()) return []
    return [
      {
        key: `m${m.id}`,
        title: m.artifact.title,
        competency: m.competency,
        source: `Module ${m.id} · ${m.title}`,
        text: a.text,
        link: a.link,
        to: `/module/${m.id}`,
      },
    ]
  })

  const finalEntries = finalSimulation.flatMap<Entry>((mt) => {
    const a = getMoment(mt.id).artifact
    if (!a?.text || !a.text.trim()) return []
    return [
      {
        key: `f${mt.id}`,
        title: mt.label,
        competency: mt.competency,
        source: 'Capstone',
        text: a.text,
        link: a.link,
        to: '/final',
      },
    ]
  })

  const total = moduleEntries.length + finalEntries.length
  const covered = Array.from(
    new Set([...moduleEntries, ...finalEntries].map((e) => e.competency)),
  )

  const renderCard = (e: Entry) => (
    <article className="folio-card" key={e.key}>
      <div className="folio-card__top">
        <Badge label={e.competency} tone="rubric" icon="🎯" />
        <span className="folio-card__source">{e.source}</span>
      </div>
      <h3 className="folio-card__title">{e.title}</h3>
      <p className="folio-card__text">{e.text}</p>
      <div className="folio-card__foot">
        {e.link && (
          <a className="folio-card__link" href={e.link} target="_blank" rel="noreferrer">
            🔗 Linked work
          </a>
        )}
        <Link className="folio-card__open" to={e.to}>Open / edit →</Link>
      </div>
    </article>
  )

  return (
    <div className="page page--portfolio">
      <header className="pagehead">
        <div>
          <span className="pagehead__kicker">📁 Portfolio</span>
          <h1 className="pagehead__title">Your authored work</h1>
          <p className="pagehead__sub">
            Everything you build in the track collects here — evidence of your Guide practice.
          </p>
        </div>
      </header>

      {total === 0 ? (
        <div className="folio-empty">
          <span className="folio-empty__icon">🛠</span>
          <p>No artifacts yet. Each module ends with one you author.</p>
          <Link to="/course" className="btn btn--primary">Start building →</Link>
        </div>
      ) : (
        <>
          <section className="folio-summary">
            <span className="folio-summary__count">{total} artifact{total === 1 ? '' : 's'}</span>
            <div className="folio-summary__competencies">
              <span className="folio-summary__label">Competencies covered:</span>
              {covered.map((c) => (
                <Badge key={c} label={c} tone="success" icon="✓" />
              ))}
            </div>
          </section>

          {moduleEntries.length > 0 && (
            <section>
              <h2 className="section-h">From the modules</h2>
              <div className="folio-grid">{moduleEntries.map(renderCard)}</div>
            </section>
          )}

          {finalEntries.length > 0 && (
            <section>
              <h2 className="section-h">From the capstone</h2>
              <div className="folio-grid">{finalEntries.map(renderCard)}</div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
