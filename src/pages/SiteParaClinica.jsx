import { MessageCircle, CheckCircle, ArrowRight, Calendar, ShieldCheck, Star, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import useSEO from '../utils/useSEO'
import { wa } from '../config/whatsapp'

const SiteParaClinica = () => {
  useSEO({
    title: 'Site para Clínica | Receba Mais Pacientes pelo WhatsApp',
    description: 'Site profissional para clínicas e consultórios por R$300. Entrega em até 3 dias, 1 ano de hospedagem grátis. Pacientes novos chegando pelo WhatsApp.',
    canonical: 'https://fabianosf.com/site-para-clinica',
  })

  const whatsapp = wa()

  const dores = [
    'Pacientes pesquisam online antes de agendar — e encontram outra clínica',
    'Sem site, você transmite menos confiança que clínicas concorrentes',
    'Sua agenda fica vazia enquanto sua clínica está invisível na internet',
    'Cada paciente que não te encontra no Google é receita que você perdeu',
  ]

  const solucoes = [
    {
      icon: <Calendar size={24} />,
      titulo: 'Agendamento fácil pelo WhatsApp',
      texto: 'Pacientes clicam no botão e agendam direto pelo WhatsApp. Sem telefonema, sem espera. Sua agenda preenche sozinha.',
    },
    {
      icon: <Users size={24} />,
      titulo: 'Apresentação dos especialistas',
      texto: 'Cada médico, dentista ou especialista com foto, formação e CRM/CRO. Paciente que conhece o profissional antecipadamente tem muito mais chances de agendar.',
    },
    {
      icon: <ShieldCheck size={24} />,
      titulo: 'Credibilidade que converte',
      texto: 'Um site limpo, profissional e com todas as informações passa a segurança que o paciente precisa para escolher sua clínica em vez da concorrência.',
    },
    {
      icon: <Star size={24} />,
      titulo: 'Aparece nas buscas do Google',
      texto: '"Clínica ortopédica no Rio de Janeiro", "dentista perto de mim" — SEO local configurado para você aparecer quando pacientes procuram pelo que você oferece.',
    },
  ]

  const incluso = [
    'Página de especialidades e serviços',
    'Perfil dos médicos/especialistas',
    'Galeria da clínica',
    'Agendamento via WhatsApp',
    'Formulário de contato',
    'Mapa com localização',
    'SEO local para Google',
    'Rápido no celular',
    'Depoimentos de pacientes',
    '30 dias de suporte',
  ]

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <nav className="flex justify-center items-center gap-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-400 transition-colors">Início</Link>
            <span>/</span>
            <Link to="/criacao-de-sites" className="hover:text-blue-400 transition-colors">Criação de Sites</Link>
            <span>/</span>
            <span className="text-blue-400">Clínica</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-300 text-sm font-semibold mb-6">
            🏥 Especialidade: Clínicas, Consultórios e Profissionais de Saúde
          </div>

          {/* H1 — palavra-chave: site para clínica */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Site para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              Clínica
            </span>{' '}
            — Mais Pacientes Todo Dia
          </h1>

          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Pacientes pesquisam clínicas online antes de ligar. Com um site profissional, você aparece no Google, transmite confiança e recebe novos agendamentos no WhatsApp.
          </p>

          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm">
            Já criamos o site da <strong className="text-white">Clínica Renata Bastos</strong> — que hoje recebe novos pacientes diariamente pelo site, sem depender só de indicação.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-black text-lg shadow-2xl transform hover:scale-105 transition-all"
            >
              <MessageCircle size={22} />
              QUERO MAIS PACIENTES NA MINHA CLÍNICA
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-5">
            💰 <strong className="text-white">R$ 300</strong> · Entrega em 3 dias · 1 ano de hospedagem grátis
          </p>
        </div>
      </section>

      {/* Dores */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            {/* H2 */}
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Sua clínica está <span className="text-red-500">perdendo pacientes</span> por isso
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {dores.map((d, i) => (
              <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                <span className="text-red-400 text-xl flex-shrink-0 mt-0.5">✗</span>
                <p className="text-gray-700 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soluções */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            {/* H2 */}
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              O que o site da sua clínica vai ter
            </h2>
            <p className="text-gray-600">Cada elemento pensado para aumentar a confiança do paciente e facilitar o agendamento.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solucoes.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl flex-shrink-0">{s.icon}</div>
                  <div>
                    {/* H3 */}
                    <h3 className="font-black text-gray-900 mb-2">{s.titulo}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{s.texto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incluso + CTA */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          {/* H2 */}
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            Tudo incluso no <span className="text-teal-600">site para clínica</span>
          </h2>
          <p className="text-gray-600 mb-8">Sem cobranças extras. Tudo abaixo já está incluso desde o plano básico.</p>
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {incluso.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={17} className="text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-lg transform hover:scale-105 transition-all"
          >
            <MessageCircle size={22} />
            Pedir orçamento para minha clínica
          </a>
          <p className="text-gray-500 text-sm mt-3">R$300 à vista · Entrega em 3 dias · Resposta em minutos</p>
        </div>
      </section>

      {/* Depoimento */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="container mx-auto max-w-2xl text-center">
          <Star size={32} className="text-blue-400 mx-auto mb-4" />
          <blockquote className="text-xl font-bold text-gray-900 mb-3 italic">
            "Antes eu dependia só de indicação. Agora recebo contatos de pacientes novos todo dia pelo site. Foi a melhor decisão do meu consultório."
          </blockquote>
          <p className="text-gray-500 text-sm">— Dra. Renata B. · Clínica Médica · Rio de Janeiro</p>
          <div className="mt-6">
            <a
              href="https://clinicarenatabastos.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm underline"
            >
              Ver site: clinicarenatabastos.com.br <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default SiteParaClinica
