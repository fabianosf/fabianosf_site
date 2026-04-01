// Utilitários de validação para o formulário de contato

/**
 * Valida se um nome é válido
 * @param {string} name - Nome a ser validado
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return {
      isValid: false,
      message: 'Nome é obrigatório'
    }
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      message: 'Nome deve ter pelo menos 2 caracteres'
    }
  }

  if (name.trim().length > 50) {
    return {
      isValid: false,
      message: 'Nome deve ter no máximo 50 caracteres'
    }
  }

  // Verificar se contém apenas letras, espaços e alguns caracteres especiais
  const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/
  if (!nameRegex.test(name.trim())) {
    return {
      isValid: false,
      message: 'Nome deve conter apenas letras, espaços, hífens e apostrofes'
    }
  }

  return {
    isValid: true,
    message: ''
  }
}

/**
 * Valida se um email é válido
 * @param {string} email - Email a ser validado
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      message: 'Email é obrigatório'
    }
  }

  // Regex para validação de email robusta
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  if (!emailRegex.test(email.trim())) {
    return {
      isValid: false,
      message: 'Por favor, insira um email válido'
    }
  }

  if (email.trim().length > 254) {
    return {
      isValid: false,
      message: 'Email muito longo'
    }
  }

  return {
    isValid: true,
    message: ''
  }
}

/**
 * Valida se uma mensagem é válida
 * @param {string} message - Mensagem a ser validada
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateMessage = (message) => {
  if (!message || message.trim() === '') {
    return {
      isValid: false,
      message: 'Mensagem é obrigatória'
    }
  }

  if (message.trim().length < 10) {
    return {
      isValid: false,
      message: 'Mensagem deve ter pelo menos 10 caracteres'
    }
  }

  if (message.trim().length > 1000) {
    return {
      isValid: false,
      message: 'Mensagem deve ter no máximo 1000 caracteres'
    }
  }

  // Verificar se não contém apenas espaços ou caracteres especiais
  const hasValidContent = /[a-zA-ZÀ-ÿ0-9]/.test(message.trim())
  if (!hasValidContent) {
    return {
      isValid: false,
      message: 'Mensagem deve conter pelo menos uma letra ou número'
    }
  }

  return {
    isValid: true,
    message: ''
  }
}

/**
 * Valida todos os campos do formulário
 * @param {object} formData - Dados do formulário { name, email, message }
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateForm = (formData) => {
  const nameValidation = validateName(formData.name)
  const emailValidation = validateEmail(formData.email)
  const messageValidation = validateMessage(formData.message)

  const errors = {
    name: nameValidation.message,
    email: emailValidation.message,
    message: messageValidation.message
  }

  const isValid = nameValidation.isValid && emailValidation.isValid && messageValidation.isValid

  return {
    isValid,
    errors
  }
}

/**
 * Sanitiza entrada de texto para prevenir XSS (versão leve para digitação)
 * @param {string} input - Texto a ser sanitizado
 * @returns {string} - Texto sanitizado
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return ''
  
  // Para campos de entrada, apenas removemos caracteres perigosos
  // sem interferir na digitação normal (espaços, etc.)
  return input
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000) // Limita tamanho
}

/**
 * Sanitiza entrada de texto para envio (versão completa)
 * @param {string} input - Texto a ser sanitizado
 * @returns {string} - Texto sanitizado
 */
export const sanitizeForSubmission = (input) => {
  if (typeof input !== 'string') return ''
  
  return input
    .trim() // Remove espaços no início e fim
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000) // Limita tamanho
}

/**
 * Valida configurações do Firebase
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateFirebaseConfig = () => {
  try {
    const config = {
      apiKey: "AIzaSyBXHUAnCUY_cW_1X9qUzR9gpnQRTE7Vbn4",
      authDomain: "fabianosf-6f6c5.firebaseapp.com",
      projectId: "fabianosf-6f6c5",
      storageBucket: "fabianosf-6f6c5.firebasestorage.app",
      messagingSenderId: "995484382681",
      appId: "1:995484382681:web:e8170f18cbf3c79d0f95c8"
    }

    // Verificar se todas as chaves necessárias estão presentes
    const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId']
    const missingKeys = requiredKeys.filter(key => !config[key] || config[key].trim() === '')

    if (missingKeys.length > 0) {
      return {
        isValid: false,
        message: `Configuração do Firebase incompleta. Chaves faltando: ${missingKeys.join(', ')}`
      }
    }

    // Verificar formato do API Key
    if (!config.apiKey.startsWith('AIza')) {
      return {
        isValid: false,
        message: 'API Key do Firebase inválida'
      }
    }

    // Verificar formato do Project ID
    if (!config.projectId.includes('-')) {
      return {
        isValid: false,
        message: 'Project ID do Firebase inválido'
      }
    }

    return {
      isValid: true,
      message: 'Configuração do Firebase válida'
    }
  } catch (error) {
    return {
      isValid: false,
      message: `Erro ao validar Firebase: ${error.message}`
    }
  }
}

/**
 * Valida configurações do EmailJS
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateEmailJSConfig = () => {
  try {
    const config = {
      serviceId: 'service_8kms2pk',
      templateId: 'template_wp89mdr',
      publicKey: 'yR1a_1j8Ts3lurpag'
    }

    // Verificar se todas as chaves necessárias estão presentes
    const requiredKeys = ['serviceId', 'templateId', 'publicKey']
    const missingKeys = requiredKeys.filter(key => !config[key] || config[key].trim() === '')

    if (missingKeys.length > 0) {
      return {
        isValid: false,
        message: `Configuração do EmailJS incompleta. Chaves faltando: ${missingKeys.join(', ')}`
      }
    }

    // Verificar formato do Service ID
    if (!config.serviceId.startsWith('service_')) {
      return {
        isValid: false,
        message: 'Service ID do EmailJS inválido'
      }
    }

    // Verificar formato do Template ID
    if (!config.templateId.startsWith('template_')) {
      return {
        isValid: false,
        message: 'Template ID do EmailJS inválido'
      }
    }

    // Verificar se Public Key não está vazia
    if (config.publicKey.length < 10) {
      return {
        isValid: false,
        message: 'Public Key do EmailJS inválida'
      }
    }

    return {
      isValid: true,
      message: 'Configuração do EmailJS válida'
    }
  } catch (error) {
    return {
      isValid: false,
      message: `Erro ao validar EmailJS: ${error.message}`
    }
  }
}
