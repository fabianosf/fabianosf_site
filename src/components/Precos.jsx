import { Check, MessageCircle, Star, Zap } from 'lucide-react'

const Precos = () => {
  const whatsappUrl = (msg) => `https://wa.me/5521994078286?text=${encodeURIComponent(msg)}`

  const planos = [
    {
      nome: 'Página de Captação',
      badge: null,
      tagline: 'Para quem quer começar rápido e direto',
      preco: 'R$ 800',
      descricao: 'Uma página focada em um único objetivo: fazer o visitante entrar em contato com você pelo WhatsApp.',
      parcelamento: 'ou 2x R$ 400 sem juros',
      itens: [
        'Página única de alta conversão',
        'Design profissional ao seu segmento',
        'Botão WhatsApp estratégico',
        'Aparece no Google (SEO básico)',
        'Rápido no celular',
        'Entrega em até 5 dias',
        '2 rodadas de ajuste',
      ],
      ideal: 'Ideal para autônomos, profissionais liberais e pequenos negócios começando.',
      cor: 'from-teal-400 to-teal-600',
      destaque: false,
      msg: 'Oi Fabiano! Tenho interesse na Página de Captação (R$800). Como funciona?',
    },
    {
      nome: 'Site Profissional',
      badge: 'MAIS ESCOLHIDO',
      tagline: 'Para quem quer se posicionar acima da concorrência',
      preco: 'R$ 1.500',
      descricao: 'Site completo com várias páginas, apresentando seus serviços, sua história e tudo que você precisa para vender mais.',
      parcelamento: 'ou 3x R$ 500 sem juros',
      itens: [
        'Site com até 5 páginas',
        'Design exclusivo para o seu negócio',
        'WhatsApp em todas as páginas',
        'Galeria de fotos e vídeos',
        'SEO avançado para o Google',
        'Blog (opcional)',
        'Rápido no celular',
        'Entrega em até 7 dias',
        '3 rodadas de ajuste',
        '30 dias de suporte gratuito',
      ],
      ideal: 'Ideal para academias, clínicas, empresas e autônomos que querem se destacar.',
      cor: 'from-blue-500 to-indigo-600',
      destaque: true,
      msg: 'Oi Fabiano! Tenho interesse no Site Profissional (R$1.500). Como funciona?',
    },
    {
      nome: 'Clientes Todo Dia',
      badge: null,
      tagline: 'Para quem quer escalar de verdade',
      preco: 'R$ 2.500+',
      descricao: 'Site profissional + gestão de tráfego pago. A combinação que enche o WhatsApp de cliente desde a primeira semana.',
      parcelamento: 'Condições a combinar',
      itens: [
        'Tudo do Site Profissional',
        'Criação de campanhas Meta Ads',
        'Anúncios no Facebook e Instagram',
        'Segmentação do público ideal',
        'Google Ads (opcional)',
        'Relatório mensal de resultados',
        'Otimização contínua das campanhas',
        'Suporte direto via WhatsApp',
      ],
      ideal: 'Ideal para clínicas, academias, salões e quem quer resultado desde a semana 1.',
      cor: 'from-purple-500 to-pink-600',
      destaque: false,
      msg: 'Oi Fabiano! Tenho interesse no pacote Clientes Todo Dia (site + tráfego pago). Como funciona?',
    },
  ]

  return (
    <section id="precos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-teal-900">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-teal-500/20 border border-teal-500/30 text-teal-300 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Investimento
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Quanto custa ter um site que trabalha{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">
              por você 24 horas por dia?
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
            Preço justo, sem surpresas e sem taxas escondidas.
            Você sabe exatamente o que vai receber antes de fechar.
          </p>
          {/* Ancoragem de valor */}
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-6 py-2.5 text-sm text-gray-300 max-w-full text-center">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></span>
            Um funcionário meio período custa mais de R$800 por mês — seu site trabalha 24h por dia, para sempre.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
          {planos.map((plano, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden flex flex-col ${
                plano.destaque
                  ? 'ring-2 ring-blue-400 shadow-2xl shadow-blue-500/20 md:scale-105'
                  : 'border border-white/10'
              } bg-white/5 backdrop-blur`}
            >
              {plano.badge && (
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center text-xs font-black py-2 flex items-center justify-center gap-1 uppercase tracking-wider">
                  <Star size={11} fill="white" />
                  {plano.badge}
                  <Star size={11} fill="white" />
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plano.cor} text-white mb-4 w-fit`}>
                  <Zap size={22} />
                </div>

                <h3 className="text-xl font-black text-white mb-0.5">{plano.nome}</h3>
                <p className="text-gray-400 text-xs mb-4">{plano.tagline}</p>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{plano.descricao}</p>

                <div className="mb-1">
                  <span className="text-4xl font-black text-white">{plano.preco}</span>
                </div>
                <p className="text-gray-500 text-xs mb-6">{plano.parcelamento}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plano.itens.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check size={15} className="text-teal-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-teal-400/80 italic mb-5">{plano.ideal}</p>

                <a
                  href={whatsappUrl(plano.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-white bg-gradient-to-r ${plano.cor} hover:opacity-90 transition-opacity`}
                >
                  <MessageCircle size={18} />
                  Quero este plano
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-3">
          <p className="text-gray-400 text-sm">
            Não sabe qual escolher?{' '}
            <a
              href={whatsappUrl('Oi Fabiano! Preciso de ajuda para escolher o melhor plano para meu negócio.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 underline font-semibold"
            >
              Me chama no WhatsApp
            </a>{' '}
            — te ajudo a decidir em 5 minutos, sem compromisso.
          </p>
          <p className="text-gray-500 text-xs">
            💳 Parcelamento disponível · 🔒 Sem taxas ocultas · ✅ Orçamento grátis
          </p>
        </div>
      </div>
    </section>
  )
}

export default Precos
