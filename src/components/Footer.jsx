import { MessageCircle, Mail, Linkedin, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { wa, MSG } from '../config/whatsapp'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const whatsappUrl = wa(MSG.footer)

  const menuLinks = [
    { label: 'Benefícios', href: '/#beneficios' },
    { label: 'Serviços', href: '/#servicos' },
    { label: 'Portfólio', href: '/portfolio' },
    { label: 'Preços', href: '/precos' },
    { label: 'Contato', href: '/contact' },
  ]

  // Links internos SEO — indexáveis pelo Google
  const paginasSEO = [
    { label: 'Criação de Sites', to: '/criacao-de-sites' },
    { label: 'Site para Academia', to: '/site-para-academia' },
    { label: 'Site para Clínica', to: '/site-para-clinica' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Marca + CTA */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold mb-3 inline-block hover:text-teal-400 transition-colors">
              <span className="text-teal-400">Fabiano</span> Freitas
            </Link>
            <p className="text-gray-400 leading-relaxed mb-2 max-w-sm text-sm">
              Criação de sites profissionais que geram clientes no WhatsApp. Atendo academias, clínicas, empresas e autônomos em todo o Brasil.
            </p>
            <p className="text-gray-500 text-xs mb-5">📍 Rio de Janeiro, RJ · ☎ (21) 99407-8286</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold transition-colors"
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
            </a>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2">
              {menuLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Páginas SEO — links internos valiosos */}
          <div>
            <h4 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-4">Serviços</h4>
            <ul className="space-y-2">
              {paginasSEO.map((p, i) => (
                <li key={i}>
                  <Link
                    to={p.to}
                    className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/servicos" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
                  Tráfego Pago
                </a>
              </li>
              <li>
                <a href="/servicos" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
                  Site + Anúncios
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Fabiano Freitas · Criação de Sites Profissionais · Rio de Janeiro
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:fabiano.freitas@gmail.com" className="p-2 text-gray-500 hover:text-teal-400 transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href="https://www.linkedin.com/in/fabianosfreitas/" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-teal-400 transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            Feito com <Heart size={12} className="text-red-500 fill-current" /> em React
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
