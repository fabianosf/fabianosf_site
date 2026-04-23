import { Globe, Wifi, Smartphone, MessageCircle, Search, RefreshCw, Check } from 'lucide-react'
import { wa, MSG } from '../config/whatsapp'

const Beneficios = () => {
  const whatsappUrl = wa(MSG.beneficios)

  const itens = [
    {
      icon: <Globe size={28} />,
      titulo: 'Site ou landing page completa',
      descricao: 'Uma página profissional sobre o seu negócio, com design adaptado ao seu segmento e tudo que o cliente precisa ver para entrar em contato.',
      cor: 'from-teal-400 to-teal-600',
      bg: 'bg-teal-50',
    },
    {
      icon: <Wifi size={28} />,
      titulo: '1 ano de hospedagem grátis inclusa',
      descricao: 'O site já sai do ar com hospedagem paga pelo primeiro ano. Você não paga nada a mais agora. Depois do primeiro ano, custa em média R$ 50/ano.',
      cor: 'from-green-400 to-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: <Smartphone size={28} />,
      titulo: 'Responsivo — funciona no celular',
      descricao: 'Mais de 80% dos seus clientes vão acessar pelo celular. O site é desenvolvido para funcionar perfeitamente em qualquer tamanho de tela.',
      cor: 'from-blue-400 to-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: <MessageCircle size={28} />,
      titulo: 'Botão de WhatsApp integrado',
      descricao: 'O cliente leu, gostou e quer falar com você. Um clique — o WhatsApp já abre com uma mensagem pronta. Sem perder contato no caminho.',
      cor: 'from-green-500 to-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      icon: <Search size={28} />,
      titulo: 'SEO básico — aparece no Google',
      descricao: 'O site é configurado com título, descrição e palavras-chave do seu negócio para aparecer nas buscas do Google na sua cidade.',
      cor: 'from-orange-400 to-orange-600',
      bg: 'bg-orange-50',
    },
    {
      icon: <RefreshCw size={28} />,
      titulo: 'Até 2 rodadas de ajuste após a entrega',
      descricao: 'Recebeu o site e quer ajustar alguma coisa? Texto, foto, cor. Você tem até 2 rodadas de revisão sem custo adicional.',
      cor: 'from-purple-400 to-purple-600',
      bg: 'bg-purple-50',
    },
  ]

  return (
    <section id="incluso" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Tudo por R$ 300 — sem surpresa no final
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
            O que você recebe{' '}
            <span className="text-teal-600">por R$ 300.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sem taxa de setup, sem mensalidade, sem letra miúda.
            Você sabe exatamente o que vai receber antes de fechar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto mb-10">
          {itens.map((item, i) => (
            <div
              key={i}
              className={`${item.bg} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.cor} text-white mb-5 shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3">{item.titulo}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{item.descricao}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-2xl mx-auto mb-10 text-center">
          <p className="text-gray-500 text-sm">
            <span className="font-bold text-gray-700">Nota sobre domínio:</span> O endereço do site (.com.br) não está incluso.
            Custa em média R$ 40/ano e eu te ajudo a contratar — é simples.
          </p>
        </div>

        <div className="text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all"
          >
            <MessageCircle size={22} />
            QUERO MEU SITE POR R$ 300
          </a>
          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-4 text-sm text-gray-500">
            <span className="flex items-center justify-center gap-1.5">
              <Check size={14} className="text-green-500" />
              R$ 300 à vista
            </span>
            <span className="flex items-center justify-center gap-1.5">
              <Check size={14} className="text-green-500" />
              Entrega em até 3 dias
            </span>
            <span className="flex items-center justify-center gap-1.5">
              <Check size={14} className="text-green-500" />
              1 ano de hospedagem grátis
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Beneficios
