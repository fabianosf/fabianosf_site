import { MessageCircle, Building2, Stethoscope, Dumbbell, Store, User, HelpCircle, Monitor, TrendingUp, Search } from 'lucide-react'

const Servicos = () => {
  const whatsappUrl = (msg) => `https://wa.me/5521994078286?text=${encodeURIComponent(msg)}`

  const pilares = [
    {
      icon: <Monitor size={36} />,
      titulo: 'Site Profissional',
      descricao: 'Um site que apresenta seu negócio com autoridade, carrega rápido no celular e tem botão de WhatsApp estratégico para converter visitantes em clientes.',
      cor: 'from-teal-400 to-teal-600',
      bg: 'bg-teal-50',
      destaques: ['Design moderno e profissional', 'Rápido no celular', 'Pronto em até 7 dias', 'Botão WhatsApp em destaque'],
      msg: 'Olá! Quero um site profissional para meu negócio. Como funciona?',
    },
    {
      icon: <TrendingUp size={36} />,
      titulo: 'Tráfego Pago',
      descricao: 'Anúncios no Facebook, Instagram e Google que levam as pessoas certas direto para o seu WhatsApp. Você define o orçamento e eu garanto o resultado.',
      cor: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      destaques: ['Anúncios no Meta (Face/Insta)', 'Campanhas no Google Ads', 'Segmentação precisa do público', 'Relatório mensal de resultados'],
      msg: 'Olá! Quero saber mais sobre tráfego pago para meu negócio. Como funciona?',
    },
    {
      icon: <Search size={36} />,
      titulo: 'Tráfego Orgânico (SEO)',
      descricao: 'Aparecer no Google quando o cliente busca pelo seu serviço — de graça, sem pagar por clique. Resultados que crescem todo mês e duram no longo prazo.',
      cor: 'from-green-400 to-green-600',
      bg: 'bg-green-50',
      destaques: ['Aparecer no Google gratuitamente', 'Palavras-chave do seu negócio', 'Google Meu Negócio otimizado', 'Tráfego crescente todo mês'],
      msg: 'Olá! Quero entender como aparecer no Google organicamente. Pode me ajudar?',
    },
  ]

  const segmentos = [
    {
      icon: <Dumbbell size={32} />,
      titulo: 'Site para Academia',
      descricao: 'Mostre seus horários, professores e planos. Receba interessados direto no WhatsApp. Seus futuros alunos estão buscando no Google agora.',
      cor: 'from-orange-400 to-red-500',
      kw: 'site para academias',
      msg: 'Olá! Quero um site para minha academia. Pode me ajudar?',
    },
    {
      icon: <Stethoscope size={32} />,
      titulo: 'Site para Clínica',
      descricao: 'Apresente seus serviços, especialistas e facilite o agendamento. Pacientes que te encontram online chegam com mais confiança.',
      cor: 'from-blue-400 to-blue-600',
      kw: 'site para clínicas',
      msg: 'Olá! Quero um site para minha clínica. Pode me ajudar?',
    },
    {
      icon: <Building2 size={32} />,
      titulo: 'Site para Empresa',
      descricao: 'Presença profissional completa para sua empresa. Seus clientes precisam encontrar você no Google antes do seu concorrente.',
      cor: 'from-teal-400 to-teal-600',
      kw: 'site para empresas',
      msg: 'Olá! Quero um site para minha empresa. Pode me ajudar?',
    },
    {
      icon: <Store size={32} />,
      titulo: 'Site para Loja / Comércio',
      descricao: 'Venda mais com presença online. Mostre seus produtos, horários e localização. Clientes chegam sabendo o que querem.',
      cor: 'from-green-400 to-green-600',
      kw: 'site para pequenos negócios',
      msg: 'Olá! Quero um site para minha loja/comércio. Pode me ajudar?',
    },
    {
      icon: <User size={32} />,
      titulo: 'Site para Autônomo',
      descricao: 'Advogado, dentista, arquiteto, personal trainer, coach... Se você vende um serviço, um site profissional multiplica seus clientes.',
      cor: 'from-purple-400 to-purple-600',
      kw: 'site para profissionais autônomos',
      msg: 'Olá! Quero um site para o meu trabalho autônomo. Pode me ajudar?',
    },
    {
      icon: <HelpCircle size={32} />,
      titulo: 'Outro segmento?',
      descricao: 'Não importa o ramo — se você precisa de clientes, um site que gera contato pelo WhatsApp funciona para qualquer negócio.',
      cor: 'from-gray-400 to-gray-600',
      kw: 'criação de sites',
      msg: 'Olá! Tenho um negócio e preciso de um site. Pode me ajudar?',
    },
  ]

  return (
    <section id="servicos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">

        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            O que eu faço
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Não é só criação de site.{' '}
            <span className="text-teal-600">É geração de clientes.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trabalho com 3 frentes para o seu negócio aparecer onde o cliente está e transformar visitas em contatos no WhatsApp.
          </p>
        </div>

        {/* 3 Pilares — destaque principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pilares.map((p, i) => (
            <div
              key={i}
              className={`${p.bg} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-black/5`}
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${p.cor} text-white mb-5 w-fit shadow-lg`}>
                {p.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">{p.titulo}</h3>
              <p className="text-gray-600 leading-relaxed mb-5 flex-1">{p.descricao}</p>
              <ul className="space-y-2 mb-6">
                {p.destaques.map((d, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${p.cor} flex-shrink-0`}></span>
                    {d}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappUrl(p.msg)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${p.cor} hover:opacity-90 transition-opacity`}
              >
                <MessageCircle size={16} />
                Quero saber mais
              </a>
            </div>
          ))}
        </div>

        {/* Divisor — segmentos */}
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            Atendo qualquer segmento
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            Academia, clínica, loja, autônomo — não importa o ramo. Se você precisa de clientes, eu tenho a solução.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
          {segmentos.map((s, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl p-7 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${s.cor} text-white mb-5 w-fit shadow-md`}>
                {s.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">{s.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{s.descricao}</p>
              <a
                href={whatsappUrl(s.msg)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${s.cor} hover:opacity-90 transition-opacity`}
              >
                <MessageCircle size={16} />
                Quero para meu negócio
              </a>
            </div>
          ))}
        </div>

        {/* Destaque de valor */}
        <div className="bg-teal-700 rounded-2xl p-8 text-white text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-black mb-3">
            Sem linguagem técnica, sem complicação
          </h3>
          <p className="text-teal-100 leading-relaxed">
            Você não precisa entender nada de tecnologia. Me conta o que você precisa — e eu cuido de tudo para trazer clientes reais para o seu negócio.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Servicos
