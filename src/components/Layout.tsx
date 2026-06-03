import { NavLink, Outlet } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'

const NAV = [
  { to: '/', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/course', label: 'Course Map', icon: '🗺' },
  { to: '/certification', label: 'Certification', icon: '🏅' },
  { to: '/final', label: 'Final Task', icon: '★' },
]

/** App shell: header, primary nav, and routed page outlet. */
export default function Layout() {
  const { percentComplete, certificationLevel } = useProgress()

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="brand__mark">T2G</span>
          <span className="brand__name">
            Growth Track
            <small>Future 2 · Guide Certification</small>
          </span>
        </NavLink>

        <nav className="topnav" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `topnav__link ${isActive ? 'is-active' : ''}`}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="topbar__status">
          <span className="topbar__level">{certificationLevel}</span>
          <span className="topbar__pct">{percentComplete}%</span>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <span>T2G Growth Track · A living launch tool for Future 2 Guides</span>
        <span className="footer__sub">
          Content sourced from the Access Model Brainlift, the Future 2 Operational Playbook, and the
          Scenarios training set.
        </span>
      </footer>
    </div>
  )
}
