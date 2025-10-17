import { describe, it, expect } from 'vitest'
import {
  validateName,
  validateEmail,
  validateMessage,
  validateForm,
  sanitizeInput,
  validateFirebaseConfig,
  validateEmailJSConfig
} from '../utils/validations'

describe('Validações do Formulário', () => {
  describe('validateName', () => {
    it('deve validar nome válido', () => {
      const result = validateName('Fabiano Freitas')
      expect(result.isValid).toBe(true)
      expect(result.message).toBe('')
    })

    it('deve rejeitar nome vazio', () => {
      const result = validateName('')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Nome é obrigatório')
    })

    it('deve rejeitar nome com apenas espaços', () => {
      const result = validateName('   ')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Nome é obrigatório')
    })

    it('deve rejeitar nome muito curto', () => {
      const result = validateName('F')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Nome deve ter pelo menos 2 caracteres')
    })

    it('deve rejeitar nome muito longo', () => {
      const longName = 'A'.repeat(51)
      const result = validateName(longName)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Nome deve ter no máximo 50 caracteres')
    })

    it('deve aceitar nomes com acentos', () => {
      const result = validateName('José da Silva')
      expect(result.isValid).toBe(true)
    })

    it('deve aceitar nomes com hífen', () => {
      const result = validateName('Maria-José')
      expect(result.isValid).toBe(true)
    })

    it('deve rejeitar nomes com números', () => {
      const result = validateName('João123')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Nome deve conter apenas letras, espaços, hífens e apostrofes')
    })

    it('deve rejeitar nomes com caracteres especiais', () => {
      const result = validateName('João@Silva')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Nome deve conter apenas letras, espaços, hífens e apostrofes')
    })
  })

  describe('validateEmail', () => {
    it('deve validar email válido', () => {
      const result = validateEmail('fabiano@exemplo.com')
      expect(result.isValid).toBe(true)
      expect(result.message).toBe('')
    })

    it('deve rejeitar email vazio', () => {
      const result = validateEmail('')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Email é obrigatório')
    })

    it('deve rejeitar email inválido', () => {
      const result = validateEmail('email-invalido')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Por favor, insira um email válido')
    })

    it('deve rejeitar email sem domínio', () => {
      const result = validateEmail('fabiano@')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Por favor, insira um email válido')
    })

    it('deve rejeitar email sem @', () => {
      const result = validateEmail('fabiano.exemplo.com')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Por favor, insira um email válido')
    })

    it('deve aceitar emails com subdomínios', () => {
      const result = validateEmail('fabiano@sub.exemplo.com')
      expect(result.isValid).toBe(true)
    })

    it('deve aceitar emails com números', () => {
      const result = validateEmail('fabiano123@exemplo.com')
      expect(result.isValid).toBe(true)
    })

    it('deve rejeitar email muito longo', () => {
      const longEmail = 'a'.repeat(250) + '@exemplo.com'
      const result = validateEmail(longEmail)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Email muito longo')
    })
  })

  describe('validateMessage', () => {
    it('deve validar mensagem válida', () => {
      const result = validateMessage('Olá, preciso de um site para minha empresa.')
      expect(result.isValid).toBe(true)
      expect(result.message).toBe('')
    })

    it('deve rejeitar mensagem vazia', () => {
      const result = validateMessage('')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Mensagem é obrigatória')
    })

    it('deve rejeitar mensagem muito curta', () => {
      const result = validateMessage('Oi')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Mensagem deve ter pelo menos 10 caracteres')
    })

    it('deve rejeitar mensagem muito longa', () => {
      const longMessage = 'A'.repeat(1001)
      const result = validateMessage(longMessage)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Mensagem deve ter no máximo 1000 caracteres')
    })

    it('deve rejeitar mensagem apenas com espaços', () => {
      const result = validateMessage('     ')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Mensagem deve ter no máximo 1000 caracteres')
    })

    it('deve rejeitar mensagem apenas com caracteres especiais', () => {
      const result = validateMessage('!@#$%^&*()')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Mensagem deve conter pelo menos uma letra ou número')
    })

    it('deve aceitar mensagem com números', () => {
      const result = validateMessage('Preciso de um site com 5 páginas.')
      expect(result.isValid).toBe(true)
    })

    it('deve aceitar mensagem com acentos', () => {
      const result = validateMessage('Preciso de uma solução para minha empresa.')
      expect(result.isValid).toBe(true)
    })
  })

  describe('validateForm', () => {
    it('deve validar formulário completo válido', () => {
      const formData = {
        name: 'Fabiano Freitas',
        email: 'fabiano@exemplo.com',
        message: 'Preciso de um site para minha empresa.'
      }
      const result = validateForm(formData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({
        name: '',
        email: '',
        message: ''
      })
    })

    it('deve rejeitar formulário com campos inválidos', () => {
      const formData = {
        name: 'F',
        email: 'email-invalido',
        message: 'Oi'
      }
      const result = validateForm(formData)
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBe('Nome deve ter pelo menos 2 caracteres')
      expect(result.errors.email).toBe('Por favor, insira um email válido')
      expect(result.errors.message).toBe('Mensagem deve ter pelo menos 10 caracteres')
    })

    it('deve rejeitar formulário com campos vazios', () => {
      const formData = {
        name: '',
        email: '',
        message: ''
      }
      const result = validateForm(formData)
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBe('Nome é obrigatório')
      expect(result.errors.email).toBe('Email é obrigatório')
      expect(result.errors.message).toBe('Mensagem é obrigatória')
    })
  })

  describe('sanitizeInput', () => {
    it('deve sanitizar entrada com tags HTML', () => {
      const input = '<script>alert("xss")</script>João'
      const result = sanitizeInput(input)
      expect(result).toBe('scriptalert("xss")/scriptJoão')
    })

    it('deve sanitizar entrada com javascript:', () => {
      const input = 'javascript:alert("xss")'
      const result = sanitizeInput(input)
      expect(result).toBe('alert("xss")')
    })

    it('deve sanitizar entrada com event handlers', () => {
      const input = 'onclick="alert()"João'
      const result = sanitizeInput(input)
      expect(result).toBe('alert()"João')
    })

    it('deve remover espaços em branco', () => {
      const input = '  João Silva  '
      const result = sanitizeInput(input)
      expect(result).toBe('João Silva')
    })

    it('deve limitar tamanho da entrada', () => {
      const longInput = 'A'.repeat(2000)
      const result = sanitizeInput(longInput)
      expect(result.length).toBe(1000)
    })

    it('deve retornar string vazia para entrada não string', () => {
      const result = sanitizeInput(123)
      expect(result).toBe('')
    })
  })

  describe('validateFirebaseConfig', () => {
    it('deve validar configuração válida do Firebase', () => {
      const result = validateFirebaseConfig()
      expect(result.isValid).toBe(true)
      expect(result.message).toBe('Configuração do Firebase válida')
    })
  })

  describe('validateEmailJSConfig', () => {
    it('deve validar configuração válida do EmailJS', () => {
      const result = validateEmailJSConfig()
      expect(result.isValid).toBe(true)
      expect(result.message).toBe('Configuração do EmailJS válida')
    })
  })
})
