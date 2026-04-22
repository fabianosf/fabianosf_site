import { MessageCircle, Monitor, TrendingUp, Package } from 'lucide-react'
import { wa, MSG } from '../config/whatsapp'

const Servicos = () => {
  const servicos = [
    {
      icon: <Monitor size={36} />,
      titulo: 'Site que gera contato — não site bonito que ninguém encontra',
      descricao: 'Uma página clara, rápida e profissional sobre o seu negócio, com botão direto para o WhatsApp. Seu cliente chega pelo Google (ou pelo anúncio), lê sobre você, confia e manda mensagem. Simples assim.',
      cor: 'from-teal-400 to-teal-600',
      bg: 'bg-teal-50',
      destaques: [
        'Design profissional adaptado ao seu segmento',
        'Rápido no celular',
        'Botão WhatsApp estratégico',
        'Aparece no Google (SEO)',
        'Pronto em até 7 dias',
      ],
      msg: MSG.servicos.site,
    },
    {
      icon: <TrendingUp size={36} />,
      titulo: 'Anúncios que levam o cliente certo direto ao seu WhatsApp',
      descricao: 'Gerencio seus anúncios no Facebook, Instagram e Google. Você define quanto quer gastar. Eu garanto que o dinheiro vai para quem realmente tem interesse no que você vende — não para clique aleatório.',
      cor: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      destaques: [
        'Criação e gestão de campanhas',
        'Facebook, Instagram e Google',
        'Segmentação do público certo',
        'Relatório mensal de resultados',
        'Otimização contínua',
      ],
      msg: MSG.servicos.trafego,
    },
    {
      icon: <Package size={36} />,
      titulo: 'A combinação que enche o WhatsApp de cliente todo dia',
      descricao: 'Site profissional + anúncios gerenciados. Enquanto o SEO atrai cliente de graça a longo prazo, os anúncios já começam a gerar contato na primeira semana. Os dois trabalham ao mesmo tempo — resultado desde o dia 1.',
      cor: 'from-green-400 to-teal-600',
      bg: 'bg-green-50',
      destaques: [
        'Tudo do site profissional',
        'Tudo do tráfego pago',
        'Resultado na primeira semana',
        'SEO crescendo a longo prazo',
        'Suporte direto via WhatsApp',
      ],
      msg: MSG.servicos.pacote,
    },
  ]

  return (
    <section id="servicos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">

        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            O que eu faço
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Crio o caminho que leva o cliente{' '}
            <span className="text-teal-600">do Google direto ao seu WhatsApp.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sem complicação técnica. Sem contrato de 3 meses para assinar.
            Sem apresentação de slides. Você me conta o negócio — eu entrego o resultado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {servicos.map((s, i) => (
            <div
              key={i}
              className={`${s.bg} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-black/5`}
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${s.cor} text-white mb-5 w-fit shadow-lg`}>
                {s.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 leading-snug">{s.titulo}</h3>
              <p className="text-gray-600 leading-relaxed mb-5 flex-1 text-sm">{s.descricao}</p>
              <ul className="space-y-2 mb-6">
                {s.destaques.map((d, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${s.cor} flex-shrink-0`}></span>
                    {d}
                  </li>
                ))}
              </ul>
              <a
                href={wa(s.msg)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${s.cor} hover:opacity-90 transition-opacity`}
              >
                <MessageCircle size={16} />
                Quero saber mais
              </a>
            </div>
          ))}
        </div>

        <div className="bg-teal-700 rounded-2xl p-8 text-white text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-black mb-3">
            Sem linguagem técnica, sem complicação
          </h3>
          <p className="text-teal-100 leading-relaxed">
            Você não precisa entender nada de tecnologia. Me conta o que você precisa —
            e eu cuido de tudo para trazer clientes reais para o seu negócio.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Servicos
