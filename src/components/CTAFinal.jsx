import { MessageCircle, XCircle, CheckCircle } from 'lucide-react'

const CTAFinal = () => {
  const whatsappUrl = `https://wa.me/5521994078286?text=${encodeURIComponent('Quero mais clientes para meu negócio! Pode me ajudar com site, tráfego pago ou SEO?')}`

  const comparacao = [
    { ruim: 'Depender só de indicação', bom: 'WhatsApp tocando de cliente novo todo dia' },
    { ruim: 'Invisível no Google', bom: 'Aparecer na hora que o cliente busca' },
    { ruim: 'Gastar com anúncio sem retorno', bom: 'Tráfego pago gerenciado por especialista' },
    { ruim: 'Parecer amador', bom: 'Site profissional que fecha negócio' },
    { ruim: 'Perder para o concorrente', bom: 'Ser a primeira escolha do cliente' },
  ]

  return (
    <section id="cta-final" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-5xl">

        {/* Tabela de comparação */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            A diferença na prática
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Seu negócio hoje x seu negócio com presença digital de verdade
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Não é dramático. É a realidade de quem depende de indicação vs. quem aparece no Google, roda anúncio e tem site que converte.
          </p>
        </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto">
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
                <div className="p-4 flex items-center gap-3 bg-red-50/50">
                  <XCircle size={18} className="text-red-400 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{c.ruim}</span>
                </div>
                <div className="p-4 flex items-center gap-3 bg-green-50/50">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-800 text-sm font-medium">{c.bom}</span>
                </div>
              </div>
            ))}
          </div>

        {/* Bloco CTA principal */}
        <div className="bg-gradient-to-br from-gray-900 to-teal-900 rounded-3xl p-10 sm:p-14 text-white text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* H2 — urgência com especificidade */}
            <h2 className="text-4xl sm:text-5xl font-black mb-5 leading-tight">
              Quantos clientes você perdeu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                só hoje
              </span>
              {' '}para quem aparece no Google?
            </h2>

            <p className="text-xl text-gray-200 mb-3 max-w-2xl mx-auto leading-relaxed">
              Alguém buscou seu serviço agora. Encontrou um concorrente. Mandou mensagem. <strong className="text-white">Esse cliente era seu</strong> — e você nem ficou sabendo que ele existia.
            </p>

            <p className="text-gray-400 mb-2 max-w-xl mx-auto text-base">
              Me chama agora. Em 5 minutos de conversa eu te mostro onde seu cliente está buscando, por que não está te encontrando e o que fazer pra mudar isso.
            </p>

            <p className="text-gray-500 mb-8 max-w-xl mx-auto text-sm italic">
              Diagnóstico gratuito. Sem pressão. Sem proposta na sua cara.
            </p>

            {/* CTA principal */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-xl shadow-2xl shadow-green-500/30 transform hover:scale-105 transition-all duration-200 mb-6"
            >
              <MessageCircle size={28} />
              QUERO MEU DIAGNÓSTICO GRATUITO AGORA
            </a>

            {/* Garantias de baixo risco */}
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
                Site no ar em 7 dias se fechar
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CTAFinal
