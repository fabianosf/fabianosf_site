import { Link } from 'react-router-dom'
import useSEO from '../utils/useSEO'
import Precos from '../components/Precos'
import FAQ from '../components/FAQ'
import { MessageCircle, ArrowLeft } from 'lucide-react'

const PrecosPage = () => {
  useSEO({
    title: 'Preços | Criação de Sites a partir de R$800 — Fabiano Freitas',
    description: 'Planos de criação de site profissional a partir de R$800. Página de Captação, Site Profissional ou Clientes Todo Dia (site + tráfego pago). Sem taxas ocultas.',
    canonical: 'https://fabianosf.com/precos',
  })

  const whatsappUrl = `https://wa.me/5521994078286?text=${encodeURIComponent('Oi Fabiano! Vi a página de preços e quero entender qual plano é certo para o meu negócio.')}`

  return (
    <>
      {/* Hero da página */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900">
        <div className="container mx-auto max-w-3xl text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Voltar ao início
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Investimento claro,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">
              sem surpresas.
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Você sabe exatamente o que vai receber antes de fechar.
            Sem taxas ocultas. Sem proposta de 20 páginas.
          </p>
          <p className="text-gray-400 text-base mb-8">
            Não sabe qual plano escolher?{' '}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 underline font-semibold"
            >
              Me chama no WhatsApp
            </a>{' '}
            — te ajudo em 5 minutos, sem compromisso.
          </p>
        </div>
      </section>

      {/* Planos */}
      <Precos />

      {/* FAQ logo abaixo dos preços */}
      <FAQ />

      {/* CTA final */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black text-white mb-3">
            Ainda tem dúvida?
          </h2>
          <p className="text-gray-400 mb-6">
            Me chama no WhatsApp. Em 5 minutos de conversa te digo qual plano faz sentido
            para o seu negócio — sem pressão e sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all"
            >
              <MessageCircle size={22} />
              Falar com o Fabiano — é grátis
            </a>
            <Link
              to="/servicos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-teal-500 text-teal-400 hover:bg-teal-500/10 rounded-xl font-bold text-base transition-all"
            >
              Ver todos os serviços →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrecosPage
