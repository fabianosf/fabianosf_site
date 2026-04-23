import { MessageCircle, ArrowDown, Monitor, Check } from 'lucide-react'
import { wa, MSG } from '../config/whatsapp'

const Hero = () => {
  const whatsappUrl = wa(MSG.hero)

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <div className="w-full lg:w-7/12 text-center lg:text-left">

            {/* Badge de nicho */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-300 text-sm font-semibold mb-6">
              <Monitor size={14} className="flex-shrink-0" />
              <span>Sites e landing pages para negócios locais</span>
            </div>

            {/* H1 */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-5 leading-[1.05]">
              Site profissional{' '}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">
                por R$ 300.
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                No ar em até 3 dias.
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-lg sm:text-xl text-gray-300 mb-3 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Você me manda as informações do seu negócio. Eu crio um site profissional,
              responsivo e com botão direto pro WhatsApp — e entrego em até 3 dias.{' '}
              <span className="text-white font-semibold">
                Sem enrolação, sem mensalidade, com 1 ano de hospedagem grátis inclusa.
              </span>
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-2 justify-center lg:justify-start mb-8 mt-6">
              {[
                'Site ou landing page completa por R$ 300',
                'Entrega em até 3 dias úteis',
                '1 ano de hospedagem grátis inclusa',
                'Botão direto pro WhatsApp',
                'Aparece no Google',
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                  <Check size={14} className="text-green-400 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-2xl shadow-green-500/30 transform hover:scale-105 transition-all duration-200"
              >
                <MessageCircle size={22} />
                QUERO MEU SITE POR R$ 300
              </a>
              <a
                href="#depoimentos"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl font-bold text-base transition-all duration-200"
              >
                Ver sites entregues
                <ArrowDown size={17} />
              </a>
            </div>

            {/* Micro-copy */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm">
              {[
                'Resposta em até 15 minutos',
                'Sem contrato, sem mensalidade',
                'Você fala direto comigo',
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-gray-300">
                  <Check size={14} className="text-green-400 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Foto + card de autoridade */}
          <div className="w-full lg:w-5/12 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-teal-400 via-green-400 to-blue-500 rounded-full opacity-50 blur-xl animate-pulse"></div>
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src="/images/20161127_153951.jpg"
                  alt="Fabiano Freitas - Especialista em criação de sites e tráfego pago para negócios locais"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/0f766e/ffffff?text=FF'
                  }}
                />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white text-center max-w-xs w-full">
              <p className="text-xl font-black text-white mb-0.5">Fabiano Freitas</p>
              <p className="text-teal-300 text-sm font-medium mb-4">Sites + Tráfego Pago · Rio de Janeiro</p>
              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                <div>
                  <p className="text-3xl font-black text-green-400">50+</p>
                  <p className="text-xs text-gray-400 leading-tight">negócios que hoje recebem clientes pelo site</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-teal-400">10+</p>
                  <p className="text-xs text-gray-400 leading-tight">anos gerando resultado online</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-blue-400">3d</p>
                  <p className="text-xs text-gray-400 leading-tight">e seu site já está no ar captando</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
