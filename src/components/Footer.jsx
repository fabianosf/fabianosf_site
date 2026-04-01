import React from 'react'
import { Heart, Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Experiência', href: '#experience' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Contato', href: '#contact' },
  ]

  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: 'https://github.com/fabianosf',
      label: 'GitHub',
    },
    {
      icon: <Linkedin size={20} />,
      href: 'https://www.linkedin.com/in/fabianosfreitas/',
      label: 'LinkedIn',
    },
    {
      icon: <Mail size={20} />,
      href: 'mailto:fabiano.freitas@gmail.com',
      label: 'Email',
    },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-teal-400">Fabiano Freitas</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Analista de Dados e Desenvolvedor Web especializado em transformar dados em decisões inteligentes.
            </p>
            <p className="text-teal-300 font-semibold italic">
              "Transformando dados em decisões inteligentes."
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-teal-400 transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Conecte-se</h4>
            <p className="text-gray-300 mb-4">
              Siga-me nas redes sociais e vamos nos conectar!
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Fabiano Sousa de Freitas. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Feito com <Heart size={16} className="text-red-500 fill-current" /> e React
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

