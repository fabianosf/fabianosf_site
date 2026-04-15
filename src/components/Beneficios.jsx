import { Users, Star, Zap, ShieldCheck, TrendingUp, MessageCircle, Quote } from 'lucide-react'

const Beneficios = () => {
  const whatsappUrl = `https://wa.me/5521994078286?text=${encodeURIComponent('Quero um site que traga mais clientes para o meu negócio!')}`

  const beneficios = [
    {
      icon: <Users size={36} />,
      titulo: 'Cliente chega no WhatsApp sem você pedir',
      descricao: 'Às 23h, enquanto você dorme, alguém pesquisa "academia de jiu-jitsu em Botafogo", encontra seu site, clica no botão e manda mensagem. Você acorda com cliente novo esperando.',
      cor: 'from-green-400 to-green-600',
      bg: 'bg-green-50',
      kw: 'site que gera clientes',
    },
    {
      icon: <Star size={36} />,
      titulo: 'Cliente que chega pelo site já chega convencido',
      descricao: 'Ele leu sobre você, viu seus serviços, conferiu preços e decidiu que quer. Quando abre o WhatsApp, não está pedindo informação — está pronto pra fechar. Você só precisa confirmar.',
      cor: 'from-blue-400 to-blue-600',
      bg: 'bg-blue-50',
      kw: 'presença profissional online',
    },
    {
      icon: <Zap size={36} />,
      titulo: 'Site lento = cliente perdido. Simples assim.',
      descricao: 'Se o seu site demora mais de 3 segundos pra carregar no celular, 53% das pessoas fecham e vão pro concorrente. Cada site que entrego passa em testes de velocidade antes de ir ao ar.',
      cor: 'from-yellow-400 to-orange-500',
      bg: 'bg-yellow-50',
      kw: 'site responsivo para celular',
    },
    {
      icon: <ShieldCheck size={36} />,
      titulo: 'Enquanto você lê isso, seu concorrente está aparecendo no Google',
      descricao: 'Alguém buscou agora "clínica de estética em [sua cidade]". Apareceu o nome do seu concorrente. Não o seu. Isso acontece porque SEO não é opcional — é o que decide quem ganha o cliente.',
      cor: 'from-teal-400 to-teal-600',
      bg: 'bg-teal-50',
      kw: 'site para aparecer no Google',
    },
    {
      icon: <TrendingUp size={36} />,
      titulo: 'Pare de gastar com anúncio que não traz cliente',
      descricao: 'A maioria dos donos de negócio impulsiona post no Instagram, não vê resultado e acha que "anúncio não funciona". O problema não é o anúncio — é que foi feito errado. Tráfego pago gerenciado profissionalmente muda esse jogo.',
      cor: 'from-purple-400 to-purple-600',
      bg: 'bg-purple-50',
      kw: 'site que aumenta vendas',
    },
  ]

  const depoimentos = [
    {
      texto: 'Em 23 dias após o site ir ao ar, recebi 11 contatos novos pelo WhatsApp. Antes, a academia dependia 100% de indicação de aluno antigo. Hoje tenho cliente chegando sem eu precisar pedir.',
      autor: 'Rodrigo M.',
      negocio: 'Academia de Jiu-Jitsu · Rio de Janeiro',
      destaque: '11 clientes novos em 23 dias',
    },
    {
      texto: 'Minha agenda estava pela metade. 60 dias depois do site, estava lotada. Hoje tenho lista de espera. O Fabiano foi o único que me explicou como o site ia gerar paciente — não só como ia ficar bonito.',
      autor: 'Dra. Renata B.',
      negocio: 'Clínica Médica · Rio de Janeiro',
      destaque: 'Agenda lotada em 60 dias',
    },
    {
      texto: 'Fiz orçamento em 3 agências. Todas entregaram slides bonitos. O Fabiano foi o único que me mostrou, antes de fechar, onde meu cliente estava buscando e como ele ia me encontrar. Fechei na hora.',
      autor: 'Carlos A.',
      negocio: 'Imobiliária · Rio de Janeiro',
      destaque: 'Escolheu pela estratégia, não pelo preço',
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
            Seu negócio trabalhando por você{' '}
            <span className="text-teal-600">enquanto você dorme</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Não é sobre ter uma página bonita na internet.
            É sobre ter uma máquina que atrai, convence e entrega cliente no seu WhatsApp — 24 horas por dia.
          </p>
        </div>

        {/* Benefícios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto mb-14">
          {beneficios.map((b, i) => (
            <div
              key={i}
              className={`${b.bg} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${b.cor} text-white mb-5 shadow-lg`}>
                {b.icon}
              </div>
              {/* H3 — semântico + palavra-chave */}
              <h3 className="text-lg font-black text-gray-900 mb-3">{b.titulo}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{b.descricao}</p>
            </div>
          ))}
        </div>

        {/* Depoimentos */}
        <div className="mb-12">
          <h3 className="text-center text-2xl font-black text-gray-900 mb-2">
            Resultados reais de quem já apostou
          </h3>
          <p className="text-center text-gray-500 mb-8">Clientes reais. Resultados reais. Sem exagero.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {depoimentos.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500 hover:shadow-lg transition-shadow flex flex-col">
                {/* Destaque do resultado */}
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black mb-4 uppercase tracking-wide w-fit">
                  ✅ {d.destaque}
                </div>
                <Quote size={24} className="text-teal-300 mb-3" />
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic flex-1">"{d.texto}"</p>
                <div>
                  <p className="font-black text-gray-900 text-sm">{d.autor}</p>
                  <p className="text-teal-600 text-xs font-medium">{d.negocio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA da seção */}
        <div className="text-center">
          <p className="text-gray-600 mb-5 text-lg font-medium">
            Seu negócio pode ser o próximo caso de sucesso.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all"
          >
            <MessageCircle size={22} />
            Quero resultado igual — falar agora
          </a>
        </div>
      </div>
    </section>
  )
}

export default Beneficios
