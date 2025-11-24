import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '../config/emailjs'
import { validateForm, sanitizeInput, sanitizeForSubmission } from '../utils/validations'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const sanitizedValue = sanitizeInput(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: sanitizedValue,
    })
    
    // Limpar erro de validação quando usuário digita
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: ''
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Sanitizar dados para envio
    const sanitizedData = {
      name: sanitizeForSubmission(formData.name),
      email: sanitizeForSubmission(formData.email),
      message: sanitizeForSubmission(formData.message)
    }

    // Validar formulário antes de enviar
    const validation = validateForm(sanitizedData)
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      setIsSubmitting(false)
      return
    }

    let firebaseSuccess = false
    let emailSuccess = false

    try {
      // 1. Tentar salvar no Firebase Firestore
      try {
        await addDoc(collection(db, 'contacts'), {
          name: sanitizedData.name,
          email: sanitizedData.email,
          message: sanitizedData.message,
          timestamp: serverTimestamp(),
          status: 'new'
        })
        firebaseSuccess = true
        console.log('✅ Dados salvos no Firebase')
      } catch (firebaseError) {
        console.warn('⚠️ Erro no Firebase:', firebaseError)
        // Continua mesmo se Firebase falhar
      }

      // 2. Tentar enviar email via EmailJS
      try {
        await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          {
            from_name: sanitizedData.name,
            from_email: sanitizedData.email,
            message: sanitizedData.message,
            to_email: 'fabiano.freitas@gmail.com'
          },
          emailjsConfig.publicKey
        )
        emailSuccess = true
        console.log('✅ Email enviado via EmailJS')
      } catch (emailError) {
        console.warn('⚠️ Erro no EmailJS:', emailError)
        // Continua mesmo se EmailJS falhar
      }

      // Se pelo menos um funcionou, mostra sucesso
      if (firebaseSuccess || emailSuccess) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setValidationErrors({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
      
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('❌ Erro geral:', error)
      setSubmitStatus('error')
      
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'fabiano.freitas@gmail.com',
      href: 'mailto:fabiano.freitas@gmail.com',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: '/fabianosfreitas',
      href: 'https://www.linkedin.com/in/fabianosfreitas/',
      color: 'from-blue-600 to-blue-700',
    },
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      value: '/fabianosf',
      href: 'https://github.com/fabianosf',
      color: 'from-gray-700 to-gray-900',
    },

    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '(21) 99407-8286',
      href: 'https://api.whatsapp.com/send/?phone=5521994078286&text=Ol%C3%A1%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+conversar.&type=phone_number&app_absent=0',
      color: 'from-green-700 to-green-900',
    },   

  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Entre em <span className="text-teal-600">Contato</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estou disponível para novos projetos e oportunidades. Vamos conversar!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Envie uma Mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none ${
                    validationErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Seu nome completo"
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="seu.email@exemplo.com"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none resize-none ${
                    validationErrors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Conte-me sobre seu projeto ou oportunidade..."
                ></textarea>
                {validationErrors.message && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.message}</p>
                )}
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                  ✓ Mensagem enviada com sucesso! Retornarei em breve.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                  ✗ Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente pelo email.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Enviando...</>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${info.color} text-white group-hover:scale-110 transition-transform`}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{info.label}</p>
                      <p className="font-semibold text-gray-900">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Vamos trabalhar juntos?</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades 
                para fazer parte de suas visões.
              </p>
              <div className="flex gap-4">
                <a
                  href="mailto:fabiano.freitas@gmail.com"
                  className="flex-1 text-center px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-500 transition-colors"
                >
                  Enviar Email
                </a>
                <a
                  href="https://www.linkedin.com/in/fabianosfreitas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors"
                >
                  LinkedIn
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

