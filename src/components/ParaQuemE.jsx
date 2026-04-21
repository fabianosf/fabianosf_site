import { MessageCircle, Building2, Stethoscope, Dumbbell, Store, User, HelpCircle, CheckCircle, XCircle } from 'lucide-react'

const ParaQuemE = () => {
  const whatsappUrl = `https://wa.me/5521994078286?text=${encodeURIComponent('Oi Fabiano! Quero entender se seu serviço é o certo para o meu negócio. Pode me ajudar?')}`

  const segmentos = [
    { icon: <Dumbbell size={28} />, titulo: 'Academia', cor: 'from-orange-400 to-red-500' },
    { icon: <Stethoscope size={28} />, titulo: 'Clínica', cor: 'from-blue-400 to-blue-600' },
    { icon: <Store size={28} />, titulo: 'Salão / Estúdio', cor: 'from-pink-400 to-rose-500' },
    { icon: <Building2 size={28} />, titulo: 'Empresa local', cor: 'from-teal-400 to-teal-600' },
    { icon: <User size={28} />, titulo: 'Autônomo', cor: 'from-purple-400 to-purple-600' },
    { icon: <HelpCircle size={28} />, titulo: 'Outro segmento', cor: 'from-gray-400 to-gray-600' },
  ]

  const paraVoce = [
    'Você tem uma clínica, academia, salão, escritório ou atua como autônomo',
    'Seu negócio depende muito de indicação ou de postar no Instagram',
    'Você nunca teve site — ou tem um site que ninguém encontra',
    'Você quer receber mais clientes sem precisar ficar sempre online',
    'Você tentou fazer anúncio sozinho e não funcionou como esperava',
    'Você quer algo profissional sem precisar entender nada de tecnologia',
  ]

  const naoParaVoce = [
    'Você já tem um time de marketing interno estruturado',
    'Você precisa de e-commerce com catálogo de produtos',
    'Você quer algo pronto para amanhã sem nenhuma conversa antes',
  ]

  return (
    <section id="para-quem" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-5xl">

        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Público atendido
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Atendo qualquer negócio local{' '}
            <span className="text-teal-600">que quer receber clientes pelo WhatsApp.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Academia, clínica, salão, loja, autônomo — não importa o ramo.
            Se você precisa de cliente novo sem depender de indicação, eu tenho a solução.
          </p>
        </div>

        {/* Segmentos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-14">
          {segmentos.map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${s.cor} text-white flex-shrink-0 shadow-md`}>
                {s.icon}
              </div>
              <span className="font-bold text-gray-900 text-base">{s.titulo}</span>
            </div>
          ))}
        </div>

        {/* Para quem é / não é */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
            <h3 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
              <CheckCircle size={22} className="text-green-500" />
              Esse serviço é para você se...
            </h3>
            <ul className="space-y-3">
              {paraVoce.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-1.5"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
              <XCircle size={22} className="text-gray-400" />
              Talvez não seja para você se...
            </h3>
            <ul className="space-y-3 mb-6">
              {naoParaVoce.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-500 text-sm leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-1.5"></span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-xs italic leading-relaxed">
              Não sabe se é o seu caso? Me chama no WhatsApp — em 5 minutos te digo se consigo te ajudar.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all duration-200"
          >
            <MessageCircle size={22} />
            Isso é para mim — quero falar com o Fabiano
          </a>
        </div>

      </div>
    </section>
  )
}

export default ParaQuemE
