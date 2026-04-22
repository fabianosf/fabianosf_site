import { XCircle, CheckCircle, MessageCircle } from 'lucide-react'
import { wa, MSG } from '../config/whatsapp'

const Problema = () => {
  const whatsappUrl = wa(MSG.problema)

  const comparacao = [
    { ruim: 'Depende só de indicação para ter cliente novo', bom: 'Cliente novo chegando pelo Google todo dia' },
    { ruim: 'Invisível quando o cliente busca no Google', bom: 'Seu nome aparece quando ele precisa do seu serviço' },
    { ruim: 'Posta todo dia no Instagram e não converte', bom: 'Site trabalha 24h — você não precisa estar online' },
    { ruim: 'Perde cliente pro concorrente que aparece primeiro', bom: 'Você é encontrado antes — e leva o cliente' },
    { ruim: 'Nenhum controle sobre quando o próximo cliente chega', bom: 'WhatsApp tocando com cliente novo de forma previsível' },
  ]

  return (
    <section id="problema" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-5xl">

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            A realidade que ninguém fala
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Se o seu negócio depende só de indicação,{' '}
            <span className="text-red-500">você está crescendo no limite errado.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Indicação é ótima. Mas você não controla quando ela aparece.
            Hoje, toda pessoa que precisa de um serviço pega o celular e busca no Google.
            Se o seu nome não aparece — aparece o do seu concorrente.
            Ele recebe a mensagem. Você nem fica sabendo que o cliente existiu.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto mb-10">
          <div className="grid grid-cols-2">
            <div className="bg-red-50 p-4 text-center border-b border-red-100">
              <p className="font-black text-red-600 text-sm uppercase tracking-wide">Sem site profissional</p>
            </div>
            <div className="bg-green-50 p-4 text-center border-b border-green-100">
              <p className="font-black text-green-600 text-sm uppercase tracking-wide">Com site profissional</p>
            </div>
          </div>
          {comparacao.map((c, i) => (
            <div key={i} className={`grid grid-cols-2 ${i < comparacao.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="p-4 flex items-start gap-3 bg-red-50/40">
                <XCircle size={17} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm leading-snug">{c.ruim}</span>
              </div>
              <div className="p-4 flex items-start gap-3 bg-green-50/40">
                <CheckCircle size={17} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800 text-sm font-medium leading-snug">{c.bom}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-500 mb-2 text-base">
            Não é má sorte. É estrutura. E estrutura tem solução.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-bold text-base underline underline-offset-4"
          >
            <MessageCircle size={16} />
            Quero entender como resolver isso →
          </a>
        </div>

      </div>
    </section>
  )
}

export default Problema
