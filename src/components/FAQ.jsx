import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { wa, MSG } from '../config/whatsapp'

const FAQ = () => {
  const [aberto, setAberto] = useState(null)

  const whatsappUrl = wa(MSG.faq)

  const perguntas = [
    {
      pergunta: 'R$800 não é caro para uma página só?',
      resposta: `Depende de como você calcula.\n\nSe seu negócio faturar R$3.000 a mais no mês porque um cliente chegou pelo site — o site pagou o custo dele em 8 dias.\n\nUm funcionário meio período custa mais de R$800 por mês. Um post impulsionado no Instagram some em 3 dias. Seu site trabalha 24 horas por dia, sem férias e sem 13º.\n\nO que é caro: ter um negócio que depende de indicação e não tem controle sobre quando o próximo cliente chega.`,
    },
    {
      pergunta: 'Preciso saber programação para manter o site?',
      resposta: `Não. Você não toca em nada técnico.\n\nSe precisar atualizar preço, foto ou texto, é só me chamar no WhatsApp. Para todos os planos, ofereço ajustes sem custo por um período depois da entrega. Para quem quer suporte contínuo, tenho um plano de manutenção mensal simples.\n\nSeu trabalho é atender cliente. Meu trabalho é garantir que o site continue funcionando.`,
    },
    {
      pergunta: 'Em quanto tempo vou começar a ver resultado?',
      resposta: `Depende do canal.\n\nCom anúncios (tráfego pago): clientes podem começar a chegar na primeira semana, enquanto as campanhas estiverem rodando.\n\nCom SEO (Google orgânico): de 30 a 90 dias para aparecer nas primeiras posições — mas depois é tráfego gratuito para sempre.\n\nCom os dois: resultado desde a semana 1 com escalada progressiva. O site é o ponto de chegada — o que leva o cliente até lá define a velocidade do resultado.`,
    },
    {
      pergunta: 'Por que trabalhar com você e não com uma agência?',
      resposta: `Agências grandes têm estrutura, apresentações bonitas e preços a partir de R$3.000 a R$8.000. Você fala com um gerente de conta que repassa para um designer, que repassa para um dev.\n\nQuando você me contrata, fala direto comigo — do briefing à entrega. Você não vai receber um site padronizado feito por estagiário. Vai receber um site feito por quem entende de resultado.\n\nE se algo não estiver funcionando, você me chama diretamente — não abre chamado no sistema.`,
    },
    {
      pergunta: 'Já tive site antes e não trouxe nenhum cliente. Por que seria diferente?',
      resposta: `Provavelmente porque o site anterior era só um cartão de visita digital.\n\nTer um site é diferente de ter um site que gera cliente. A diferença está em como ele foi construído: velocidade, SEO, botão de ação no lugar certo, copy que convence.\n\nUm site bonito que ninguém encontra no Google não gera nada. Um site rápido, com palavras-chave certas e botão de WhatsApp estratégico — gera.\n\nAntes de fechar, te mostro o diagnóstico do que estava errado no anterior. Grátis.`,
    },
    {
      pergunta: 'Posso parcelar o investimento?',
      resposta: `Sim. Todos os planos têm opção de parcelamento.\n\nPágina de Captação (R$800): em até 2x de R$400 sem juros.\nSite Profissional (R$1.500): em até 3x de R$500 sem juros.\nClientes Todo Dia (R$2.500+): parcelamento e condições a combinar conforme o escopo.\n\nMe chama no WhatsApp e a gente resolve — sem burocracia.`,
    },
  ]

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-3xl">

        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Dúvidas frequentes
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Dúvidas que aparecem sempre{' '}
            <span className="text-teal-600">— e as respostas diretas.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Se a sua dúvida não estiver aqui, é só me chamar no WhatsApp.
          </p>
        </div>

        <div className="space-y-3 mb-12">
          {perguntas.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:border-teal-300 transition-colors duration-200"
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-6 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setAberto(aberto === i ? null : i)}
                aria-expanded={aberto === i}
              >
                <span className="font-bold text-gray-900 text-base leading-snug pr-2">{item.pergunta}</span>
                <ChevronDown
                  size={20}
                  className={`text-teal-500 flex-shrink-0 transition-transform duration-300 ${aberto === i ? 'rotate-180' : ''}`}
                />
              </button>
              {aberto === i && (
                <div className="px-6 pb-6 bg-gray-50/50">
                  {item.resposta.split('\n\n').map((paragrafo, j) => (
                    <p key={j} className="text-gray-600 text-sm leading-relaxed mb-3 last:mb-0">
                      {paragrafo}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center bg-teal-50 rounded-2xl p-8 border border-teal-100">
          <p className="font-black text-gray-900 text-lg mb-2">Ainda tem dúvida?</p>
          <p className="text-gray-600 text-sm mb-6">
            Me chama no WhatsApp — respondo em até 15 minutos e te ajudo a decidir sem pressão.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-base shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all duration-200"
          >
            <MessageCircle size={20} />
            Tirar dúvida no WhatsApp — é grátis
          </a>
        </div>

      </div>
    </section>
  )
}

export default FAQ
