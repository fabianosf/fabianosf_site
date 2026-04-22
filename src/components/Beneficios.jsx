import { Users, Star, Zap, ShieldCheck, TrendingUp, MessageCircle } from 'lucide-react'
import { wa, MSG } from '../config/whatsapp'

const Beneficios = () => {
  const whatsappUrl = wa(MSG.beneficios)

  const beneficios = [
    {
      icon: <Users size={34} />,
      titulo: 'Cliente chegando enquanto você dorme',
      descricao: 'São 23h. Você está descansando. Uma pessoa busca "academia de jiu-jitsu em Botafogo", encontra seu site, lê sobre as aulas e manda mensagem no WhatsApp. Você acorda com cliente novo esperando. Isso é o que um site bem feito faz — 24 horas por dia, 7 dias por semana.',
      cor: 'from-green-400 to-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: <Star size={34} />,
      titulo: 'Cliente que chega pelo site já chega convencido',
      descricao: 'Diferente de quem você aborda no Instagram, o cliente que chegou pelo site já pesquisou, leu sobre você e decidiu que quer. Quando abre o WhatsApp, não está pedindo informação — está pronto para fechar. Você só precisa confirmar o horário.',
      cor: 'from-blue-400 to-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: <ShieldCheck size={34} />,
      titulo: 'Você para de competir por preço',
      descricao: 'Quem te encontra pelo Google e vê um site profissional, com foto, depoimentos e serviços bem explicados, não te compara com o mais barato do bairro. Ele te vê como especialista. E especialista não precisa dar desconto pra todo mundo.',
      cor: 'from-teal-400 to-teal-600',
      bg: 'bg-teal-50',
    },
    {
      icon: <Zap size={34} />,
      titulo: 'Site lento = cliente perdido. Simples assim.',
      descricao: 'Se o seu site demora mais de 3 segundos para carregar no celular, 53% das pessoas fecham e vão pro concorrente. Cada site que entrego passa por testes de velocidade antes de ir ao ar.',
      cor: 'from-yellow-400 to-orange-500',
      bg: 'bg-yellow-50',
    },
    {
      icon: <TrendingUp size={34} />,
      titulo: 'Pare de gastar com anúncio que não traz cliente',
      descricao: 'A maioria dos donos de negócio impulsiona post no Instagram, não vê resultado e acha que "anúncio não funciona". O problema não é o anúncio — é que foi feito sem estratégia. Tráfego pago gerenciado por profissional é diferente: você vê quanto entrou, quanto saiu e quantos clientes chegaram.',
      cor: 'from-purple-400 to-purple-600',
      bg: 'bg-purple-50',
    },
  ]

  return (
    <section id="beneficios" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            O que muda na prática
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
            O que muda quando seu negócio{' '}
            <span className="text-teal-600">tem um site que trabalha por você.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Não é sobre ter uma página bonita na internet.
            É sobre ter uma máquina que atrai, convence e entrega cliente no seu WhatsApp — 24 horas por dia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto mb-12">
          {beneficios.map((b, i) => (
            <div
              key={i}
              className={`${b.bg} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${b.cor} text-white mb-5 shadow-lg`}>
                {b.icon}
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3">{b.titulo}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{b.descricao}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all"
          >
            <MessageCircle size={22} />
            Quero esses benefícios para o meu negócio
          </a>
        </div>
      </div>
    </section>
  )
}

export default Beneficios
