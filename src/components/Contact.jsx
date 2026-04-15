import { useState } from 'react'
import { Mail, Phone, Send, MessageCircle, Linkedin } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '../config/emailjs'
import { validateForm, sanitizeInput, sanitizeForSubmission } from '../utils/validations'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [validationErrors, setValidationErrors] = useState({ name: '', email: '', message: '' })

  const whatsappUrl = `https://wa.me/5521994078286?text=${encodeURIComponent('Olá! Gostaria de um orçamento para um site. Pode me ajudar?')}`

  const handleChange = (e) => {
    const sanitizedValue = sanitizeInput(e.target.value)
    setFormData({ ...formData, [e.target.name]: sanitizedValue })
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const sanitizedData = {
      name: sanitizeForSubmission(formData.name),
      email: sanitizeForSubmission(formData.email),
      message: sanitizeForSubmission(formData.message),
    }

    const validation = validateForm(sanitizedData)
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      setIsSubmitting(false)
      return
    }

    let firebaseSuccess = false
    let emailSuccess = false

    try {
      try {
        await addDoc(collection(db, 'contacts'), {
          ...sanitizedData,
          phone: sanitizeForSubmission(formData.phone),
          timestamp: serverTimestamp(),
          status: 'new',
        })
        firebaseSuccess = true
      } catch (err) {
        console.warn('Firebase error:', err)
      }

      try {
        await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          {
            from_name: sanitizedData.name,
            from_email: sanitizedData.email,
            message: sanitizedData.message,
            to_email: 'fabiano.freitas@gmail.com',
          },
          emailjsConfig.publicKey
        )
        emailSuccess = true
      } catch (err) {
        console.warn('EmailJS error:', err)
      }

      if (firebaseSuccess || emailSuccess) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        setValidationErrors({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Erro geral:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Primeiro passo — grátis e sem compromisso
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Me conta seu negócio.{' '}
            <span className="text-teal-600">Eu te mostro como trazer clientes.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Não precisa saber nada de site, SEO ou tráfego. Me fala o que você vende e quem é seu cliente — eu te mostro o caminho mais rápido pra encher o WhatsApp de pedido.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário */}
          <div className="bg-gradient-to-br from-gray-50 to-teal-50/30 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Formulário de contato</h3>
            <p className="text-gray-500 text-sm mb-6">Prefere o WhatsApp? Role para baixo — é mais rápido.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-sm">Seu nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none bg-white ${validationErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Como posso te chamar?"
                />
                {validationErrors.name && <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">Seu email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none bg-white ${validationErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="seu@email.com"
                />
                {validationErrors.email && <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2 text-sm">WhatsApp <span className="text-gray-400 font-normal">(opcional — mas respondo mais rápido por lá)</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none bg-white"
                  placeholder="(21) 99999-9999"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-sm">O que você vende e quem é seu cliente?</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none resize-none bg-white ${validationErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Ex: tenho uma clínica de estética em Niterói, atendo mulheres de 25 a 45 anos, quero mais agendamentos pelo WhatsApp."
                />
                {validationErrors.message && <p className="mt-1 text-sm text-red-600">{validationErrors.message}</p>}
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-xl text-sm font-medium">
                  ✓ Recebi! Vou responder em até 1 hora (em horário comercial).
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-700 rounded-xl text-sm">
                  ✗ Falha no envio. Me chama direto no WhatsApp — é mais rápido.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-bold hover:from-teal-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : <><Send size={18} />Enviar — respondo hoje</>}
              </button>
            </form>
          </div>

          {/* Contatos diretos */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-green-100 text-sm font-semibold">Online agora — resposta em até 15 minutos</span>
              </div>
              <h3 className="text-2xl font-black mb-2">WhatsApp é mais rápido que qualquer formulário</h3>
              <p className="text-green-100 mb-4 text-sm leading-relaxed">
                Me chama agora. Em 5 minutos de conversa você já sabe o que precisa, quanto custa e em quanto tempo fica pronto.
              </p>
              <p className="text-green-200/70 text-xs mb-6 italic">
                Sem proposta de 10 páginas. Sem reunião de alinhamento. Direto ao ponto.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-black text-lg hover:bg-green-50 transition-colors shadow-lg w-full justify-center"
              >
                <MessageCircle size={24} />
                CHAMAR NO WHATSAPP AGORA
              </a>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-5">Outros canais</h3>
              <div className="space-y-4">
                <a href="mailto:fabiano.freitas@gmail.com" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">fabiano.freitas@gmail.com</p>
                  </div>
                </a>

                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                  <div className="p-3 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">WhatsApp</p>
                    <p className="font-semibold text-gray-900">(21) 99407-8286</p>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/fabianosfreitas/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">LinkedIn</p>
                    <p className="font-semibold text-gray-900">/fabianosfreitas</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
