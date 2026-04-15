import { useState, useEffect } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

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

  // Âncoras funcionam em qualquer página via /#section
  const menuItems = [
    { label: 'Benefícios', href: isHome ? '#beneficios' : '/#beneficios' },
    { label: 'Serviços', href: isHome ? '#servicos' : '/#servicos' },
    { label: 'Portfólio', href: isHome ? '#portfolio' : '/#portfolio' },
    { label: 'Preços', href: isHome ? '#precos' : '/#precos' },
    { label: 'Contato', href: isHome ? '#contact' : '/#contact' },
  ]

  const whatsappUrl = `https://wa.me/5521994078286?text=${encodeURIComponent('Olá! Quero um site profissional. Pode me ajudar?')}`

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
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-teal-400 transition-colors font-medium text-sm"
              >
                {item.label}
              </a>
            ))}
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
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-2 bg-gray-900 rounded-xl shadow-xl p-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-teal-400 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
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
