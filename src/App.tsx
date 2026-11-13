import { HashRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Catalog } from './pages/Catalog'
import { Detail } from './pages/Detail'
import { Evaluation } from './pages/Evaluation'
import { NotFound } from './pages/NotFound'

export default function App() {
  return <HashRouter><Layout><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/componentes" element={<Catalog />} />
    <Route path="/componentes/:slug" element={<Detail />} />
    <Route path="/avaliacao" element={<Evaluation />} />
    <Route path="*" element={<NotFound />} />
  </Routes></Layout></HashRouter>
}
