import { MessageCircle, CheckCircle, Star, ArrowRight, Users, Zap, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import useSEO from '../utils/useSEO'

const CriacaoDeSites = () => {
  useSEO({
    title: 'Criação de Sites Profissionais | Rio de Janeiro',
    description: 'Criação de sites profissionais para pequenos negócios no Rio de Janeiro. Design moderno, rápido no celular e otimizado para o Google. A partir de R$800.',
    canonical: 'https://fabianosf.com/criacao-de-sites',
  })

  const whatsapp = `https://wa.me/5521994078286?text=${encodeURIComponent('Olá! Vi a página de criação de sites e quero um orçamento.')}`

  const beneficios = [
    {
      icon: <Users size={28} />,
      titulo: 'Mais clientes pelo WhatsApp',
      texto: 'Cada site criado tem botão de WhatsApp estratégico. Seu cliente lê, se convence e clica direto para falar com você — sem barreiras.',
    },
    {
      icon: <Star size={28} />,
      titulo: 'Design exclusivo e profissional',
      texto: 'Nada de templates genéricos. Cada site é criado do zero para o seu negócio, com identidade visual própria que transmite credibilidade.',
    },
    {
      icon: <Zap size={28} />,
      titulo: 'Rápido no celular — obrigatório',
      texto: '9 em cada 10 clientes pesquisam no celular. Se seu site demora para carregar, eles fecham e vão para o concorrente. Os sites entregues carregam em menos de 2 segundos.',
    },
    {
      icon: <TrendingUp size={28} />,
      titulo: 'Otimizado para aparecer no Google',
      texto: 'Cada site sai com SEO básico configurado: estrutura de títulos, meta tags, velocidade e indexação. Você começa a aparecer nos resultados desde o primeiro dia.',
    },
  ]

  const incluso = [
    'Domínio (.com.br) por 1 ano',
    'Hospedagem por 3 meses',
    'Certificado SSL (cadeado verde)',
    'Botão WhatsApp estratégico',
    'Formulário de contato',
    'SEO on-page configurado',
    'Rápido no celular',
    'Google Analytics instalado',
    'Treinamento para usar o site',
    '30 dias de suporte gratuito',
  ]

  return (
    <div className="min-h-screen">

      {/* Hero da página */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-teal-400 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-teal-400">Criação de Sites</span>
          </nav>

          {/* H1 — palavra-chave principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Criação de Sites{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">
              Profissionais
            </span>{' '}
            que Geram Clientes
          </h1>

          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Não é só um site bonito. É uma ferramenta que trabalha por você 24 horas, aparece no Google e leva o cliente direto ao seu WhatsApp.
          </p>

          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Desenvolvedor com mais de 10 anos de experiência. Mais de 50 sites entregues para pequenos negócios no Rio de Janeiro e em todo o Brasil.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-2xl shadow-green-500/30 transform hover:scale-105 transition-all"
            >
              <MessageCircle size={22} />
              PEDIR ORÇAMENTO GRÁTIS
            </a>
            <a
              href="#o-que-inclui"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl font-bold text-base transition-all"
            >
              O que está incluso
              <ArrowRight size={18} />
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-5">
            💰 A partir de <strong className="text-white">R$ 800</strong> · Parcelamento disponível · Orçamento grátis
          </p>
        </div>
      </section>

      {/* Por que precisa de um site profissional */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            {/* H2 */}
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Por que a <span className="text-teal-600">criação de sites profissionais</span> é diferente de fazer você mesmo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Qualquer um consegue montar um site no Wix ou no WordPress. O problema é que um site feito sem estratégia não gera clientes — só ocupa espaço na internet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beneficios.map((b, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-7 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-100 text-teal-700 rounded-xl flex-shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    {/* H3 */}
                    <h3 className="font-black text-gray-900 mb-2">{b.titulo}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{b.texto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que está incluso */}
      <section id="o-que-inclui" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            {/* H2 */}
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              O que está incluso em todo{' '}
              <span className="text-teal-600">site criado</span>
            </h2>
            <p className="text-gray-600">
              Nenhuma taxa escondida. Você recebe tudo isso desde o plano básico.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {incluso.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-lg transform hover:scale-105 transition-all"
            >
              <MessageCircle size={22} />
              Quero um site com tudo isso
            </a>
            <p className="text-gray-500 text-sm mt-3">Orçamento gratuito · Sem compromisso</p>
          </div>
        </div>
      </section>

      {/* Segmentos atendidos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          {/* H2 */}
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Criação de sites para <span className="text-teal-600">todo tipo de negócio</span>
          </h2>
          <p className="text-gray-600 mb-10">
            Atendo qualquer segmento — mas tenho experiência especial em negócios que dependem de contato direto com o cliente.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            {[
              { emoji: '🥋', label: 'Academia', link: '/site-para-academia' },
              { emoji: '🏥', label: 'Clínica', link: '/site-para-clinica' },
              { emoji: '🏢', label: 'Empresa', link: null },
              { emoji: '🏠', label: 'Imobiliária', link: null },
              { emoji: '💼', label: 'Autônomo', link: null },
              { emoji: '🛒', label: 'Comércio', link: null },
            ].map((seg, i) => (
              seg.link ? (
                <Link
                  key={i}
                  to={seg.link}
                  className="bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl p-5 text-center transition-colors group"
                >
                  <span className="text-3xl block mb-2">{seg.emoji}</span>
                  <span className="font-bold text-teal-700 text-sm group-hover:underline">{seg.label} →</span>
                </Link>
              ) : (
                <div key={i} className="bg-gray-50 rounded-xl p-5 text-center">
                  <span className="text-3xl block mb-2">{seg.emoji}</span>
                  <span className="font-bold text-gray-700 text-sm">{seg.label}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* CTA final da página */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-teal-900">
        <div className="container mx-auto max-w-3xl text-center">
          {/* H2 */}
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Pronto para ter seu site em <span className="text-teal-400">7 dias?</span>
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Me chama no WhatsApp agora. A conversa é rápida, gratuita e sem compromisso. Em menos de uma semana seu site pode estar no ar gerando clientes.
          </p>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-xl shadow-2xl shadow-green-500/30 transform hover:scale-105 transition-all"
          >
            <MessageCircle size={26} />
            FALAR NO WHATSAPP AGORA
          </a>
          <p className="text-gray-500 text-sm mt-4">
            💰 A partir de R$800 · ⚡ Resposta em minutos · ✅ 50+ sites entregues
          </p>
        </div>
      </section>

    </div>
  )
}

export default CriacaoDeSites
