import { HashRouter, Route, Routes, useParams } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import Login from './pages/Login'
import Home from './pages/Home'
import CourseMap from './pages/CourseMap'
import ModulePage from './pages/ModulePage'
import CertificationProgress from './pages/CertificationProgress'
import FinalCertification from './pages/FinalCertification'
import AdminDashboard from './pages/AdminDashboard'
import Foundations from './pages/Foundations'
import Portfolio from './pages/Portfolio'

// Keying ModulePage by the module id forces a fresh remount whenever the route
// param changes, so a new module always starts on the Hook step.
function ModuleRoute() {
  const { id } = useParams()
  return <ModulePage key={id} />
}

// The authenticated app shell: per-user progress provider wrapping the layout.
function AppShell() {
  return (
    <ProgressProvider>
      <Layout />
    </ProgressProvider>
  )
}

// HashRouter so routes work on GitHub Pages without server config.
// AuthProvider is outermost so the login gate and the progress layer can both
// read the current session. When Supabase isn't configured, RequireAuth lets
// everyone through (anonymous local mode) and /login redirects to the app.
export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route element={<AppShell />}>
              <Route path="/" element={<Home />} />
              <Route path="/foundations" element={<Foundations />} />
              <Route path="/course" element={<CourseMap />} />
              <Route path="/module/:id" element={<ModuleRoute />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/certification" element={<CertificationProgress />} />
              <Route path="/final" element={<FinalCertification />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}
