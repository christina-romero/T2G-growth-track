import { Link } from 'react-router-dom'
import {
  northStar,
  premise,
  inversionTeacher,
  inversionGuide,
  inversionNote,
  sevenPillars,
  teacherIdentityPillars,
  guideIdentityPillars,
  conversionMarker,
  selectionFilter,
} from '../data/t2gPhilosophy'
import {
  cultureTagline,
  culturePurpose,
  sixTenets,
  ecology,
  ecologyShift,
  standardsFraming,
  interventionLadder,
  automaticRemoval,
  strikeLevelOffenses,
  repairSteps,
  academicBehaviorEquivalence,
} from '../data/cultureSystem'

export default function Foundations() {
  return (
    <div className="page page--foundations">
      <header className="foundations-hero">
        <span className="foundations-hero__kicker">🌱 The context for the entire track</span>
        <h1 className="foundations-hero__title">T2G Foundations</h1>
        <p className="foundations-hero__northstar">"{northStar}"</p>
        <span className="foundations-hero__cap">The Philosophical North Star</span>
      </header>

      {/* ---------- PART 1: The T2G Philosophy ---------- */}
      <div className="foundations-part">
        <span className="foundations-part__tag">Part 1</span>
        <h2 className="foundations-part__title">The T2G Philosophy</h2>
        <p className="foundations-part__lead">{premise}</p>
      </div>

      <section className="inversion">
        <h3 className="section-h">The Central Inversion</h3>
        <div className="inversion__cols">
          <div className="inversion__col inversion__col--teacher">
            <span className="inversion__label">Teacher</span>
            <p>{inversionTeacher}</p>
          </div>
          <div className="inversion__arrow" aria-hidden="true">→</div>
          <div className="inversion__col inversion__col--guide">
            <span className="inversion__label">Guide</span>
            <p>{inversionGuide}</p>
          </div>
        </div>
        <p className="inversion__note">{inversionNote}</p>
      </section>

      <section>
        <h3 className="section-h">The Seven Philosophical Pillars of the Guide</h3>
        <div className="pillargrid">
          {sevenPillars.map((p) => (
            <article className="pillarcard" key={p.n}>
              <div className="pillarcard__head">
                <span className="pillarcard__num">{p.n}</span>
                <h4 className="pillarcard__title">{p.title}</h4>
              </div>
              <div className="pillarcard__shift">
                <span className="pillarcard__from">{p.teacher}</span>
                <span className="pillarcard__arrow" aria-hidden="true">→</span>
                <span className="pillarcard__to">{p.guide}</span>
              </div>
              <p className="pillarcard__body">{p.body}</p>
              <p className="pillarcard__implication">
                <strong>So:</strong> {p.implication}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3 className="section-h">The identity shift</h3>
        <p className="culture-sub">
          These are not adjacent identities — the belief system underneath has to change.
        </p>
        <div className="identitycols">
          <div className="identitycol identitycol--leaving">
            <span className="identitycol__head">Leaving behind: the Teacher</span>
            <ul>
              {teacherIdentityPillars.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="identitycol identitycol--becoming">
            <span className="identitycol__head">Becoming: the Guide</span>
            <ul>
              {guideIdentityPillars.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="foundations-callouts">
          <blockquote className="foundations-callout">{conversionMarker}</blockquote>
          <blockquote className="foundations-callout foundations-callout--gold">
            {selectionFilter}
          </blockquote>
        </div>
      </section>

      {/* ---------- PART 2: The Culture System ---------- */}
      <div className="foundations-part">
        <span className="foundations-part__tag">Part 2</span>
        <h2 className="foundations-part__title">The Culture System</h2>
        <p className="foundations-part__lead">{cultureTagline}</p>
      </div>

      <section className="culture-purpose">
        <p>{culturePurpose}</p>
      </section>

      <section>
        <h3 className="section-h">The Six Campus-Wide Tenets</h3>
        <div className="tenetgrid">
          {sixTenets.map((t, i) => (
            <div className="tenetcard" key={t.title}>
              <span className="tenetcard__num">{i + 1}</span>
              <h4 className="tenetcard__title">{t.title}</h4>
              <p className="tenetcard__statement">"{t.statement}"</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="section-h">Reading the room: sheep, shepherds, wolves</h3>
        <div className="ecologygrid">
          {ecology.map((e) => (
            <div className={`ecologycard ecologycard--${e.tone}`} key={e.role}>
              <span className="ecologycard__icon" aria-hidden="true">{e.icon}</span>
              <h4 className="ecologycard__role">{e.role}</h4>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
        <p className="culture-note">
          <strong>Ecology shift:</strong> {ecologyShift}
        </p>
      </section>

      <section>
        <h3 className="section-h">Standards &amp; consequences</h3>
        <p className="culture-block">{standardsFraming}</p>
      </section>

      <section>
        <h3 className="section-h">The intervention ladder</h3>
        <p className="culture-sub">Catch destabilization early — each stage is a louder signal to act.</p>
        <ol className="ladder">
          {interventionLadder.map((s, i) => (
            <li className="ladder__step" key={s.stage}>
              <span className="ladder__num">{i + 1}</span>
              <div className="ladder__body">
                <h4 className="ladder__name">{s.stage}</h4>
                <p>{s.signal}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className="section-h">When access changes</h3>
        <p className="culture-block">{automaticRemoval}</p>
        <div className="strikecard">
          <span className="strikecard__head">⛔ Strike-level offenses</span>
          <ul>
            {strikeLevelOffenses.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h3 className="section-h">Repair &amp; re-entry</h3>
        <p className="culture-sub">Removal is not the end of the process.</p>
        <ol className="repairlist">
          {repairSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="culture-equivalence">
        <h3 className="section-h">Academic = behavioral</h3>
        <p>{academicBehaviorEquivalence}</p>
      </section>

      <p className="foundations-source">
        Sources: the <em>T2G Philosophy</em> and <em>Guide OS for Culture</em> documents. This page is
        the shared context for the whole track.{' '}
        <Link to="/module/2">See it in Module 2 → The Role of the Guide</Link> ·{' '}
        <Link to="/module/4">Module 4 → Classroom Culture</Link>
      </p>
    </div>
  )
}
