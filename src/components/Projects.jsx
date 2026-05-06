import { ExternalLink, MessageCircle } from 'lucide-react'
import { wa } from '../config/whatsapp'

const Projects = () => {
  const whatsappUrl = wa()

  const projetos = [
    {
      categoria: 'Academia de Jiu-Jitsu',
      titulo: 'ASBJJ — Rio de Janeiro',
      resultado: 'Aumento de alunos via contato online',
      descricao: 'Site completo para academia de artes marciais. Informações sobre aulas, professores, horários e botão direto para WhatsApp. Hoje os interessados entram em contato direto pelo site.',
      cor: 'from-teal-500 to-blue-600',
      link: 'https://asbjj.com.br',
      label: 'asbjj.com.br',
      icone: '🥋',
    },
    {
      categoria: 'Clínica Médica',
      titulo: 'Clínica Renata Bastos',
      resultado: 'Agendamentos direto pelo site',
      descricao: 'Site profissional para clínica médica com apresentação dos serviços, equipe e facilidade de agendamento. Pacientes encontram a clínica no Google e agendam sem precisar ligar.',
      cor: 'from-blue-500 to-indigo-600',
      link: 'https://clinicarenatabastos.com.br',
      label: 'clinicarenatabastos.com.br',
      icone: '🏥',
    },
    {
      categoria: 'Empresa de Tecnologia',
      titulo: 'Traffic Guardian',
      resultado: 'Geração de leads qualificados',
      descricao: 'Site institucional focado em captura de leads. Visitantes interessados chegam pelo Google, leem sobre os serviços e entram em contato. Simples, direto e eficiente.',
      cor: 'from-orange-400 to-red-500',
      link: 'https://traffic-guardian.com.br',
      label: 'traffic-guardian.com.br',
      icone: '🚀',
    },
    {
      categoria: 'Plataforma Web',
      titulo: 'Walennam',
      resultado: 'Sistema completo com área do cliente',
      descricao: 'Plataforma web com área de login, painel de controle e gestão de dados. Prova de que além de sites institucionais, também entrego sistemas completos para seu negócio.',
      cor: 'from-purple-400 to-pink-500',
      link: 'https://walennam.com.br',
      label: 'walennam.com.br',
      icone: '💻',
    },
    {
      categoria: 'Geração de Leads',
      titulo: 'Lead House',
      resultado: 'Captação de leads qualificados',
      descricao: 'Site focado em captura e qualificação de leads para empresas. Layout persuasivo com formulários estratégicos que convertem visitantes em contatos prontos para comprar.',
      cor: 'from-yellow-400 to-orange-500',
      link: 'https://leadhouse.com.br',
      label: 'leadhouse.com.br',
      icone: '🏠',
    },
    {
      categoria: 'Plataforma SaaS',
      titulo: 'Postay',
      resultado: 'Agendamento automático de posts com IA',
      descricao: 'Plataforma completa para agendamento de posts no Instagram, Facebook e TikTok. Gera legendas com IA, agenda Reels e carrosséis, gerencia múltiplas contas e posta automaticamente — sem precisar deixar o celular ligado.',
      cor: 'from-violet-500 to-fuchsia-600',
      link: 'https://postay.com.br',
      label: 'postay.com.br',
      icone: '📅',
    },
  ]

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Portfólio real
          </span>
          {/* H2 — palavra-chave: criação de sites para empresas */}
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Sites que já estão{' '}
            <span className="text-teal-600">gerando resultado</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Esses são projetos reais. Sites que foram criados, estão no ar e hoje trazem clientes para esses negócios todos os dias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {projetos.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col"
            >
              {/* Cabeçalho colorido */}
              <div className={`bg-gradient-to-r ${p.cor} p-6 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{p.icone}</span>
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                    {p.categoria}
                  </span>
                </div>
                <h3 className="text-xl font-black">{p.titulo}</h3>
                <p className="text-white/80 text-sm mt-1">✅ {p.resultado}</p>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{p.descricao}</p>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${p.cor} hover:opacity-90 transition-opacity`}
                >
                  <ExternalLink size={15} />
                  Ver site: {p.label}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA de portfólio */}
        <div className="text-center">
          <p className="text-gray-600 mb-5 text-lg">
            Seu negócio pode ser o próximo. <strong>Academia, clínica, loja, escritório</strong> — qualquer segmento.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all"
          >
            <MessageCircle size={22} />
            Quero um site assim para meu negócio
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
