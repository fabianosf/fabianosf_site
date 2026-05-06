import { MessageCircle, Quote } from 'lucide-react'
import { wa } from '../config/whatsapp'

const ProvasSocial = () => {
  const whatsappUrl = wa()

  const depoimentos = [
    {
      texto: 'Em 23 dias após o site ir ao ar, recebi 11 contatos novos pelo WhatsApp. Antes, a academia dependia 100% de indicação de aluno antigo. Hoje tenho cliente chegando sem eu precisar pedir.',
      autor: 'Rodrigo M.',
      negocio: 'Academia de Jiu-Jitsu · Rio de Janeiro',
      destaque: '11 clientes novos em 23 dias',
      cor: 'border-green-500',
      badge: 'bg-green-100 text-green-700',
    },
    {
      texto: 'Minha agenda estava pela metade. 60 dias depois do site, estava lotada. Hoje tenho lista de espera. O Fabiano foi o único que me explicou como o site ia gerar paciente — não só como ia ficar bonito.',
      autor: 'Dra. Renata B.',
      negocio: 'Clínica Médica · Rio de Janeiro',
      destaque: 'Agenda lotada em 60 dias',
      cor: 'border-blue-500',
      badge: 'bg-blue-100 text-blue-700',
    },
    {
      texto: 'Fiz orçamento em 3 agências. Todas entregaram slides bonitos. O Fabiano foi o único que me mostrou, antes de fechar, onde meu cliente estava buscando e como ele ia me encontrar. Fechei na hora.',
      autor: 'Carlos A.',
      negocio: 'Imobiliária · Rio de Janeiro',
      destaque: 'Escolheu pela estratégia, não pelo preço',
      cor: 'border-teal-500',
      badge: 'bg-teal-100 text-teal-700',
    },
  ]

  const nichos = [
    { segmento: 'Academia', resultado: '11 novos alunos em 23 dias', cor: 'bg-orange-50 border-orange-200 text-orange-700' },
    { segmento: 'Clínica médica', resultado: 'Agenda lotada em 60 dias', cor: 'bg-blue-50 border-blue-200 text-blue-700' },
    { segmento: 'Imobiliária', resultado: 'Escolheu pela estratégia, não pelo preço', cor: 'bg-teal-50 border-teal-200 text-teal-700' },
    { segmento: 'Autônomo', resultado: 'Primeiro cliente via Google em 2 semanas', cor: 'bg-purple-50 border-purple-200 text-purple-700' },
    { segmento: 'Empresa de tecnologia', resultado: 'Leads qualificados todo mês', cor: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { segmento: 'Plataforma web', resultado: 'Sistema completo com área do cliente', cor: 'bg-green-50 border-green-200 text-green-700' },
  ]

  return (
    <section id="depoimentos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-5xl">

        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Resultados reais
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Sites entregues.{' '}
            <span className="text-teal-600">Clientes chegando.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Veja alguns sites que já estão no ar e trazendo cliente pelo WhatsApp.
            Clientes reais. Resultados reais. Sem exagero.
          </p>
        </div>

        {/* Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {depoimentos.map((d, i) => (
            <div key={i} className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${d.cor} hover:shadow-xl transition-all duration-300 flex flex-col`}>
              <div className={`inline-block px-3 py-1 ${d.badge} rounded-full text-xs font-black mb-4 uppercase tracking-wide w-fit`}>
                ✅ {d.destaque}
              </div>
              <Quote size={22} className="text-teal-300 mb-3" />
              <p className="text-gray-700 text-sm leading-relaxed mb-5 italic flex-1">"{d.texto}"</p>
              <div>
                <p className="font-black text-gray-900 text-sm">{d.autor}</p>
                <p className="text-teal-600 text-xs font-medium mt-0.5">{d.negocio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Nichos com resultado */}
        <div className="mb-12">
          <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-5">
            Segmentos atendidos e resultados
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {nichos.map((n, i) => (
              <div key={i} className={`rounded-xl p-4 border ${n.cor} flex flex-col gap-1`}>
                <p className="font-black text-sm">{n.segmento}</p>
                <p className="text-xs leading-snug opacity-80">→ {n.resultado}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Números */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-10 text-center">
          <div>
            <p className="text-4xl font-black text-green-500">50+</p>
            <p className="text-sm text-gray-500 mt-1 leading-tight">negócios que hoje recebem clientes pelo site</p>
          </div>
          <div>
            <p className="text-4xl font-black text-teal-500">10+</p>
            <p className="text-sm text-gray-500 mt-1 leading-tight">anos gerando resultado online</p>
          </div>
          <div>
            <p className="text-4xl font-black text-blue-500">7d</p>
            <p className="text-sm text-gray-500 mt-1 leading-tight">até seu site estar no ar e captando</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-5 text-lg font-medium">
            Seu negócio pode ser o próximo caso de sucesso.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all duration-200"
          >
            <MessageCircle size={22} />
            Quero resultado igual — falar agora
          </a>
        </div>

      </div>
    </section>
  )
}

export default ProvasSocial
