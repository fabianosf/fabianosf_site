import { MessageCircle, Search, Monitor, TrendingUp, ArrowRight } from 'lucide-react'

const ComoFunciona = () => {
  const whatsappUrl = `https://wa.me/5521994078286?text=${encodeURIComponent('Olá! Quero um site profissional que traga clientes. Pode me ajudar?')}`

  const passos = [
    {
      numero: '01',
      icon: <MessageCircle size={32} />,
      titulo: 'Me chama no WhatsApp agora',
      descricao: 'Sem formulário. Sem espera de 3 dias úteis. Respondo em até 15 minutos e já começo a entender o que seu negócio precisa pra crescer.',
      cor: 'from-green-400 to-green-600',
    },
    {
      numero: '02',
      icon: <Search size={32} />,
      titulo: 'Diagnóstico gratuito do seu negócio',
      descricao: 'Você me conta sobre seu negócio, seu cliente ideal e o que está travando o crescimento. Em 15 minutos de conversa, já te mostro o que está faltando e o que vai resolver.',
      cor: 'from-teal-400 to-teal-600',
    },
    {
      numero: '03',
      icon: <Monitor size={32} />,
      titulo: 'Seu site pronto em até 7 dias',
      descricao: 'Enquanto você trabalha no que sabe fazer, eu crio seu site, configuro o SEO, ativo o botão de WhatsApp e deixo tudo pronto pra receber cliente.',
      cor: 'from-blue-400 to-blue-600',
    },
    {
      numero: '04',
      icon: <TrendingUp size={32} />,
      titulo: 'Abre o WhatsApp e encontra cliente',
      descricao: 'Seu site entra no ar, começa a aparecer no Google e os clientes chegam direto no seu WhatsApp. Você faz o que sabe fazer. Eu fico de olho nos resultados.',
      cor: 'from-purple-400 to-purple-600',
    },
  ]

  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Da conversa ao cliente em 7 dias
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Você manda mensagem hoje.{' '}
            <span className="text-teal-600">Na semana que vem, tem cliente.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sem reunião de kickoff. Sem cronograma de 3 meses. Sem aprovação de comitê.
            Em 4 passos diretos, seu negócio começa a receber clientes pelo WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
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
            Diagnóstico gratuito — sem enrolação
          </h3>
          <p className="text-teal-100 mb-2 text-lg">
            Me conta seu negócio em 5 minutos.
            Eu te falo o que precisa ser feito, quanto custa e quanto tempo leva.
          </p>
          <p className="text-teal-200/70 text-sm mb-6">
            Sem pressão. Sem proposta de 20 páginas. Sem compromisso de contratar.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-700 rounded-xl font-black text-lg hover:bg-teal-50 transition-colors shadow-xl"
          >
            <MessageCircle size={24} />
            Quero meu diagnóstico gratuito
          </a>
        </div>
      </div>
    </section>
  )
}

export default ComoFunciona
