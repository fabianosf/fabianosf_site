import { MessageCircle, Send, Monitor, ArrowRight } from 'lucide-react'
import { wa } from '../config/whatsapp'

const ComoFunciona = () => {
  const whatsappUrl = wa()

  const passos = [
    {
      numero: '01',
      icon: <MessageCircle size={32} />,
      titulo: 'Me chama no WhatsApp',
      descricao: 'Você manda mensagem, me conta o nome do negócio, o que você faz e quem é seu cliente. Isso leva menos de 5 minutos. Respondo em até 15 minutos.',
      cor: 'from-green-400 to-green-600',
    },
    {
      numero: '02',
      icon: <Send size={32} />,
      titulo: 'Você me envia as informações',
      descricao: 'Logo, endereço, telefone, fotos (se tiver) e o que quer mostrar no site. Pode mandar tudo pelo WhatsApp mesmo. Sem formulário, sem reunião.',
      cor: 'from-teal-400 to-teal-600',
    },
    {
      numero: '03',
      icon: <Monitor size={32} />,
      titulo: 'Seu site entra no ar em até 3 dias',
      descricao: 'Você recebe o link pronto, responsivo no celular, com botão de WhatsApp ativo. A hospedagem do primeiro ano já está inclusa e paga.',
      cor: 'from-blue-400 to-blue-600',
    },
  ]

  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Do contato à entrega em 3 dias
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Como funciona —{' '}
            <span className="text-teal-600">simples assim.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sem reunião de kickoff. Sem cronograma de 3 meses. Sem aprovação de comitê.
            Em 3 passos diretos, seu site está no ar e captando cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {passos.map((passo, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              {/* Seta entre passos (desktop) */}
              {i < passos.length - 1 && (
                <div className="hidden lg:flex absolute top-10 -right-3 z-10 text-gray-300">
                  <ArrowRight size={20} />
                </div>
              )}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${passo.cor} text-white flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {passo.icon}
              </div>
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                Passo {passo.numero}
              </span>
              {/* H3 */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{passo.titulo}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{passo.descricao}</p>
            </div>
          ))}
        </div>

        {/* CTA intermediário */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 sm:p-10 text-white text-center max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            R$ 300. 3 dias. Seu site no ar.
          </h3>
          <p className="text-teal-100 mb-2 text-lg">
            Me chama agora no WhatsApp.
            Em 5 minutos você já sabe o que vai receber, como funciona e quando fica pronto.
          </p>
          <p className="text-teal-200/70 text-sm mb-6">
            Sem pressão. Sem proposta. Sem compromisso de contratar.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-700 rounded-xl font-black text-lg hover:bg-teal-50 transition-colors shadow-xl"
          >
            <MessageCircle size={24} />
            QUERO MEU SITE POR R$ 300
          </a>
        </div>
      </div>
    </section>
  )
}

export default ComoFunciona
