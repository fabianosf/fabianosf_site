import { useState, useEffect } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { wa, MSG } from '../config/whatsapp'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fecha menu mobile ao trocar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Itens: rotas próprias usam `to`, âncoras usam `href`
  const menuItems = [
    { label: 'Início',    to: '/' },
    { label: 'Serviços', to: '/servicos' },
    { label: 'Portfólio', to: '/portfolio' },
    { label: 'Preços',   to: '/precos' },
    { label: 'Contato',  to: '/contact' },
  ]

  const whatsappUrl = wa(MSG.header)

  const renderMenuItem = (item, mobile = false) => {
    const base = mobile
      ? 'text-gray-300 hover:text-teal-400 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-white/5'
      : 'text-gray-300 hover:text-teal-400 transition-colors font-medium text-sm'

    const active = location.pathname === item.to
      ? 'text-teal-400'
      : ''

    if (item.to) {
      return (
        <Link
          key={item.to}
          to={item.to}
          className={`${base} ${active}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      )
    }
    return (
      <a
        key={item.href}
        href={item.href}
        className={base}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.label}
      </a>
    )
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white hover:text-teal-400 transition-colors">
            <span className="text-teal-400">Fabiano</span> Freitas
          </Link>

          <nav className="hidden md:flex items-center space-x-7">
            {menuItems.map(item => renderMenuItem(item))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg font-bold text-sm transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-teal-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-1 bg-gray-900 rounded-xl shadow-xl p-4">
            {menuItems.map(item => renderMenuItem(item, true))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-2 px-5 py-3 bg-green-500 text-white rounded-xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
