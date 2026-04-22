import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import CriacaoDeSites from './pages/CriacaoDeSites'
import SiteParaAcademia from './pages/SiteParaAcademia'
import SiteParaClinica from './pages/SiteParaClinica'
import ServicosPage from './pages/ServicosPage'
import PrecosPage from './pages/PrecosPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<ServicosPage />} />
            <Route path="/precos" element={<PrecosPage />} />
            <Route path="/criacao-de-sites" element={<CriacaoDeSites />} />
            <Route path="/site-para-academia" element={<SiteParaAcademia />} />
            <Route path="/site-para-clinica" element={<SiteParaClinica />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  )
}

export default App
