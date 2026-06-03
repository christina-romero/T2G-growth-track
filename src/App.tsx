import { HashRouter, Route, Routes, useParams } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import CourseMap from './pages/CourseMap'
import ModulePage from './pages/ModulePage'
import CertificationProgress from './pages/CertificationProgress'
import FinalCertification from './pages/FinalCertification'

// Keying ModulePage by the module id forces a fresh remount whenever the
// route param changes, so a new module always starts on the Hook step (and the
// previous module's selected choice doesn't carry over).
function ModuleRoute() {
  const { id } = useParams()
  return <ModulePage key={id} />
}

// HashRouter is used so the app works when opened from a static host or the
// file system without server-side route configuration.
export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/course" element={<CourseMap />} />
            <Route path="/module/:id" element={<ModuleRoute />} />
            <Route path="/certification" element={<CertificationProgress />} />
            <Route path="/final" element={<FinalCertification />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </ProgressProvider>
  )
}
