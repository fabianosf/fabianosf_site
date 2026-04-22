import { MessageCircle, Award, Clock, ThumbsUp } from 'lucide-react'
import { wa, MSG } from '../config/whatsapp'

const QuemSou = () => {
  const whatsappUrl = wa(MSG.quemSou)

  const numeros = [
    { valor: '50+', label: 'Sites entregues', icon: <Award size={20} />, cor: 'text-teal-400' },
    { valor: '10+', label: 'Anos de experiência', icon: <Clock size={20} />, cor: 'text-blue-400' },
    { valor: '100%', label: 'Clientes satisfeitos', icon: <ThumbsUp size={20} />, cor: 'text-green-400' },
  ]

  return (
    <section id="quem-sou" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Foto */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-teal-400/30 to-blue-500/30 rounded-3xl blur-xl"></div>
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-2 border-teal-100">
                <img
                  src="/images/20161127_153951.jpg"
                  alt="Fabiano Freitas - Especialista em criação de sites para pequenos negócios"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x500/0f766e/ffffff?text=Fabiano+Freitas'
                  }}
                />
                {/* Badge sobre a foto */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-xl p-3 shadow-lg">
                  <p className="font-black text-gray-900 text-sm">Fabiano Freitas</p>
                  <p className="text-teal-600 text-xs font-semibold">Desenvolvedor Web · Rio de Janeiro</p>
                </div>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="w-full lg:w-7/12">
            <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
              Com quem você vai trabalhar
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5 leading-tight">
              Você não contrata uma agência.<br />
              <span className="text-teal-600">Você fala direto comigo — do orçamento à entrega.</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Meu nome é Fabiano. Tenho <strong className="text-gray-900">mais de 10 anos criando sites que geram cliente de verdade</strong> — não site bonito que ninguém encontra. Já ajudei mais de 50 negócios no Rio a sair da dependência de indicação e começar a receber contato direto pelo WhatsApp.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Quando você me contrata, não aparece um gerente de conta, não tem reunião de alinhamento com 6 pessoas e não tem proposta de 30 páginas pra assinar. <strong className="text-gray-900">Você fala direto comigo.</strong> Eu entendo, entrego e fico de olho no resultado.
            </p>

            <p className="text-gray-600 leading-relaxed mb-7">
              Regra que sigo desde o primeiro projeto:{' '}
              <strong className="text-teal-700">se o site não está trazendo cliente, ele não está pronto.</strong>{' '}
              Estética é consequência. Cliente é o objetivo.
            </p>

            {/* Números */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-gray-50 rounded-2xl">
              {numeros.map((n, i) => (
                <div key={i} className="text-center">
                  <div className={`flex justify-center mb-1 ${n.cor}`}>{n.icon}</div>
                  <p className={`text-3xl font-black ${n.cor}`}>{n.valor}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight">{n.label}</p>
                </div>
              ))}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all duration-200"
            >
              <MessageCircle size={22} />
              Falar com o Fabiano agora
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

export default QuemSou
