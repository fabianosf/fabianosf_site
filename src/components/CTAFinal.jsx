import { MessageCircle, CheckCircle } from 'lucide-react'
import { wa, MSG } from '../config/whatsapp'

const CTAFinal = () => {
  const whatsappUrl = wa(MSG.ctaFinal)

  return (
    <section id="cta-final" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-3xl">

        <div className="bg-gradient-to-br from-gray-900 to-teal-900 rounded-3xl p-10 sm:p-14 text-white text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black mb-5 leading-tight">
              Quantos clientes você perdeu hoje{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                para quem aparece no Google?
              </span>
            </h2>

            <p className="text-xl text-gray-200 mb-3 max-w-2xl mx-auto leading-relaxed">
              Alguém buscou seu serviço agora. Encontrou um concorrente. Mandou mensagem.{' '}
              <strong className="text-white">Esse cliente era seu</strong> — e você nem ficou sabendo que ele existiu.
            </p>

            <p className="text-gray-400 mb-2 max-w-xl mx-auto text-base">
              Me chama agora. Em 5 minutos de conversa te mostro onde seu cliente está buscando,
              por que não te encontra e o que fazer para mudar isso.
            </p>

            <p className="text-gray-500 mb-8 max-w-xl mx-auto text-sm italic">
              Diagnóstico gratuito. Sem pressão. Sem proposta na sua cara.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-xl shadow-2xl shadow-green-500/30 transform hover:scale-105 transition-all duration-200 mb-6"
            >
              <MessageCircle size={26} />
              FALAR COM O FABIANO AGORA
            </a>

            <div className="flex flex-col sm:flex-row justify-center gap-5 text-sm text-gray-400">
              <span className="flex items-center justify-center gap-2">
                <CheckCircle size={15} className="text-green-400" />
                Conversa gratuita — zero compromisso
              </span>
              <span className="flex items-center justify-center gap-2">
                <CheckCircle size={15} className="text-green-400" />
                Resposta em até 15 minutos
              </span>
              <span className="flex items-center justify-center gap-2">
                <CheckCircle size={15} className="text-green-400" />
                Site no ar em 7 dias se fechar hoje
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CTAFinal
