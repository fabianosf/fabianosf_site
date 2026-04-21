import { MessageCircle, Mail, Linkedin, CheckCircle } from 'lucide-react'

const Contact = () => {
  const whatsappUrl = `https://wa.me/5521994078286?text=${encodeURIComponent('Oi Fabiano! Gostaria de um orçamento para um site. Pode me ajudar?')}`

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-3xl">

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Fale comigo agora
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Me conta seu negócio.{' '}
            <span className="text-teal-600">Eu te mostro como trazer clientes.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Não precisa saber nada de site, SEO ou tráfego.
            Me fala o que você vende e quem é seu cliente —
            eu te mostro o caminho mais rápido pra encher o WhatsApp de pedido.
          </p>
        </div>

        {/* WhatsApp — CTA principal */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-10 text-white text-center mb-8 shadow-xl shadow-green-500/20">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-green-100 text-sm font-semibold">Online agora — resposta em até 15 minutos</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black mb-3">WhatsApp é mais rápido que qualquer formulário</h3>
          <p className="text-green-100 mb-2 leading-relaxed">
            Me chama agora. Em 5 minutos de conversa você já sabe o que precisa,
            quanto custa e em quanto tempo fica pronto.
          </p>
          <p className="text-green-200/70 text-sm mb-8 italic">
            Sem proposta de 10 páginas. Sem reunião de alinhamento. Direto ao ponto.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-green-600 rounded-xl font-black text-xl hover:bg-green-50 transition-colors shadow-xl w-full sm:w-auto"
          >
            <MessageCircle size={26} />
            CHAMAR O FABIANO NO WHATSAPP
          </a>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 text-sm text-green-200">
            <span className="flex items-center justify-center gap-1.5">
              <CheckCircle size={14} className="text-green-300" />
              Conversa gratuita
            </span>
            <span className="flex items-center justify-center gap-1.5">
              <CheckCircle size={14} className="text-green-300" />
              Sem compromisso
            </span>
            <span className="flex items-center justify-center gap-1.5">
              <CheckCircle size={14} className="text-green-300" />
              Responde em minutos
            </span>
          </div>
        </div>

        {/* Contatos secundários */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <p className="text-gray-500 text-sm text-center mb-5">Prefere outro canal?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:fabiano.freitas@gmail.com"
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group flex-1 sm:flex-none"
            >
              <div className="p-2.5 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-semibold text-gray-900 text-sm">fabiano.freitas@gmail.com</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/fabianosfreitas/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group flex-1 sm:flex-none"
            >
              <div className="p-2.5 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <Linkedin size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">LinkedIn</p>
                <p className="font-semibold text-gray-900 text-sm">/fabianosfreitas</p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact
