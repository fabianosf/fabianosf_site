import { Link } from 'react-router-dom'
import useSEO from '../utils/useSEO'
import Servicos from '../components/Servicos'
import ParaQuemE from '../components/ParaQuemE'
import ComoFunciona from '../components/ComoFunciona'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import { wa } from '../config/whatsapp'

const ServicosPage = () => {
  useSEO({
    title: 'Serviços | Criação de Sites e Tráfego Pago — Fabiano Freitas',
    description: 'Sites profissionais por R$300 em até 3 dias. Tráfego pago e pacote completo para negócios locais que querem receber clientes pelo WhatsApp.',
    canonical: 'https://fabianosf.com/servicos',
  })

  const whatsappUrl = wa()

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
            O que eu faço{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">
              e como posso ajudar o seu negócio.
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Criação de site, tráfego pago ou os dois juntos —
            tudo focado em fazer o cliente chegar pelo WhatsApp.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-2xl shadow-green-500/30 transform hover:scale-105 transition-all duration-200"
          >
            <MessageCircle size={22} />
            Quero entender o que é certo para mim
          </a>
        </div>
      </section>

      {/* Seções reutilizadas */}
      <Servicos />
      <ParaQuemE />
      <ComoFunciona />

      {/* CTA final da página */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            Pronto para começar?
          </h2>
          <p className="text-gray-600 mb-6">
            Me chama no WhatsApp — em 5 minutos te digo o que faz sentido para o seu negócio, sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all"
            >
              <MessageCircle size={22} />
              Falar com o Fabiano
            </a>
            <Link
              to="/precos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-xl font-bold text-base transition-all"
            >
              Ver preços →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicosPage
