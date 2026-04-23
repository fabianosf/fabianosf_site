import { MessageCircle, CheckCircle, ArrowRight, Users, Calendar, Star, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import useSEO from '../utils/useSEO'
import { wa, MSG } from '../config/whatsapp'

const SiteParaAcademia = () => {
  useSEO({
    title: 'Site para Academia | Atraia Alunos pelo WhatsApp',
    description: 'Site profissional para academia por R$300. Entrega em até 3 dias, 1 ano de hospedagem grátis. Novos alunos chegando direto pelo WhatsApp.',
    canonical: 'https://fabianosf.com/site-para-academia',
  })

  const whatsapp = wa(MSG.academia)

  const dores = [
    'Alunos em potencial pesquisam no Google e encontram o concorrente, não você',
    'Seu Instagram não é suficiente — clientes querem um site para confiar',
    'Sem site, você parece menor do que realmente é',
    'Você perde tempo respondendo as mesmas perguntas todos os dias',
  ]

  const solucoes = [
    {
      icon: <Calendar size={24} />,
      titulo: 'Horários e modalidades organizados',
      texto: 'Muay thai, jiu-jitsu, musculação, funcional... tudo organizado e fácil de encontrar. O aluno sabe o que você oferece antes de ligar.',
    },
    {
      icon: <Users size={24} />,
      titulo: 'Professores e equipe em destaque',
      texto: 'Apresente seus professores com foto e currículo. Credibilidade gera matrícula. Alunos compram de quem conhecem.',
    },
    {
      icon: <MessageCircle size={24} />,
      titulo: 'Botão WhatsApp em todo o site',
      texto: 'A qualquer momento, o interessado clica e já entra em contato direto com você. Sem formulário, sem demora.',
    },
    {
      icon: <TrendingUp size={24} />,
      titulo: 'Aparece quando pesquisam "academia perto de mim"',
      texto: 'SEO local configurado para você aparecer nas buscas do Google Maps e pesquisas orgânicas da sua cidade.',
    },
  ]

  const incluso = [
    'Página de modalidades e horários',
    'Perfil dos professores',
    'Galeria de fotos da academia',
    'Botão WhatsApp em destaque',
    'Formulário de matrícula',
    'Localização no Google Maps',
    'SEO local configurado',
    'Design responsivo para celular',
    'Depoimentos de alunos',
    '30 dias de suporte',
  ]

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-orange-900/50 to-gray-900 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <nav className="flex justify-center items-center gap-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-orange-400 transition-colors">Início</Link>
            <span>/</span>
            <Link to="/criacao-de-sites" className="hover:text-orange-400 transition-colors">Criação de Sites</Link>
            <span>/</span>
            <span className="text-orange-400">Academia</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/40 rounded-full text-orange-300 text-sm font-semibold mb-6">
            🥋 Especialidade: Academias de Artes Marciais e Fitness
          </div>

          {/* H1 — palavra-chave: site para academia */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Site para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Academia
            </span>{' '}
            — Atraia Mais Alunos Hoje
          </h1>

          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Seu próximo aluno está pesquisando no Google agora. Com um site profissional, você aparece, convence e recebe o contato direto no WhatsApp.
          </p>

          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm">
            Já criamos o site da <strong className="text-white">ASBJJ (asbjj.com.br)</strong> — academia de jiu-jitsu no Rio de Janeiro que hoje recebe contatos novos todo dia pelo site.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white rounded-xl font-black text-lg shadow-2xl transform hover:scale-105 transition-all"
            >
              <MessageCircle size={22} />
              QUERO MAIS ALUNOS NA MINHA ACADEMIA
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
              Sua academia está <span className="text-red-500">perdendo alunos</span> por isso
            </h2>
            <p className="text-gray-600">Sem um site profissional, isso acontece todo dia com seu negócio:</p>
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
              O que o seu site de academia vai ter
            </h2>
            <p className="text-gray-600">Cada detalhe pensado para converter visitante em aluno matriculado.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solucoes.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl flex-shrink-0">{s.icon}</div>
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
            Tudo incluso no <span className="text-teal-600">site para academia</span>
          </h2>
          <p className="text-gray-600 mb-8">Sem cobranças extras. O que está abaixo já vem no seu site desde o início.</p>
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {incluso.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={17} className="text-orange-500 flex-shrink-0" />
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
            Pedir orçamento para minha academia
          </a>
          <p className="text-gray-500 text-sm mt-3">R$300 à vista · Entrega em 3 dias · Resposta em minutos</p>
        </div>
      </section>

      {/* Depoimento ASBJJ */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-orange-50">
        <div className="container mx-auto max-w-2xl text-center">
          <Star size={32} className="text-orange-400 mx-auto mb-4" />
          <blockquote className="text-xl font-bold text-gray-900 mb-3 italic">
            "Depois que fiz meu site com o Fabiano, meu WhatsApp não para de tocar. Em menos de 30 dias já tinha recuperado o investimento."
          </blockquote>
          <p className="text-gray-500 text-sm">— Rodrigo M. · Academia de Jiu-Jitsu · Rio de Janeiro</p>
          <div className="mt-6">
            <a
              href="https://asbjj.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-sm underline"
            >
              Ver site: asbjj.com.br <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default SiteParaAcademia
