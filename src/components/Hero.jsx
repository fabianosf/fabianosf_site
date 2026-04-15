import { MessageCircle, AlertTriangle, ArrowDown, Monitor, TrendingUp, Search } from 'lucide-react'

const Hero = () => {
  const whatsappUrl = `https://wa.me/5521994078286?text=${encodeURIComponent('Quero mais clientes para meu negócio! Me conta como você pode me ajudar.')}`

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

            {/* Alerta de dor — gatilho de perda */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full text-red-300 text-sm font-semibold mb-6 max-w-full">
              <AlertTriangle size={15} className="flex-shrink-0" />
              <span>Todo dia sem aparecer no Google é um cliente que vai pro concorrente</span>
            </div>

            {/* H1 — resultado específico, linguagem do cliente */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-5 leading-[1.05]">
              SEU WHATSAPP{' '}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">
                CHEIO DE
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                CLIENTES NOVOS
              </span>
            </h1>

            {/* Subtítulo — promessa clara + como */}
            <p className="text-xl sm:text-2xl text-white font-semibold mb-3 leading-snug">
              Sem depender de indicação. Sem ficar postando todo dia no Instagram.{' '}
              <span className="text-green-400">Sem virar escravo do stories.</span>
            </p>

            <p className="text-base sm:text-lg text-gray-400 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Transformo seu negócio em uma máquina de atrair clientes — com{' '}
              <strong className="text-gray-300">site que converte</strong>,{' '}
              <strong className="text-gray-300">anúncios no Meta e Google</strong> e{' '}
              <strong className="text-gray-300">SEO que aparece de graça</strong>.{' '}
              Você abre o WhatsApp e encontra cliente. Eu cuido do resto.
            </p>

            {/* 3 pilares em pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-semibold">
                <Monitor size={14} className="text-teal-400" />
                Site profissional
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-semibold">
                <TrendingUp size={14} className="text-blue-400" />
                Meta Ads · Google Ads
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-semibold">
                <Search size={14} className="text-green-400" />
                SEO · Google orgânico
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-2xl shadow-green-500/30 transform hover:scale-105 transition-all duration-200"
              >
                <MessageCircle size={24} />
                QUERO CLIENTES NO MEU WHATSAPP
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl font-bold text-base transition-all duration-200"
              >
                Ver casos reais
                <ArrowDown size={18} />
              </a>
            </div>

            {/* Micro-prova com especificidade */}
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start text-sm">
              <span className="flex items-center gap-2 text-gray-300">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Resposta em até 15 minutos
              </span>
              <span className="flex items-center gap-2 text-gray-300">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                Site no ar em 7 dias
              </span>
              <span className="flex items-center gap-2 font-bold text-teal-300">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                50+ negócios atendidos no RJ
              </span>
            </div>
          </div>

          {/* Foto + card de autoridade */}
          <div className="w-full lg:w-5/12 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-teal-400 via-green-400 to-blue-500 rounded-full opacity-50 blur-xl animate-pulse"></div>
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src="/images/20161127_153951.jpg"
                  alt="Fabiano Freitas - Especialista em captação de clientes para pequenos negócios"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/0f766e/ffffff?text=FF'
                  }}
                />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white text-center max-w-xs w-full">
              <p className="text-xl font-black text-white mb-0.5">Fabiano Freitas</p>
              <p className="text-teal-300 text-sm font-medium mb-4">Especialista em Captação de Clientes · RJ</p>
              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                <div>
                  <p className="text-3xl font-black text-green-400">50+</p>
                  <p className="text-xs text-gray-400">negócios que hoje recebem clientes pelo site</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-teal-400">10+</p>
                  <p className="text-xs text-gray-400">anos gerando resultado online</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-blue-400">7d</p>
                  <p className="text-xs text-gray-400">até seu site estar no ar e captando</p>
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
