import { describe, it, expect } from 'vitest'
import {
  validateName,
  validateEmail,
  validateMessage,
  validateForm,
  sanitizeInput
} from '../utils/validations'

describe('Validações do Formulário - Versão Simplificada', () => {
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

    it('deve rejeitar nome muito curto', () => {
      const result = validateName('F')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Nome deve ter pelo menos 2 caracteres')
    })

    it('deve aceitar nomes com acentos', () => {
      const result = validateName('José da Silva')
      expect(result.isValid).toBe(true)
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
    })
  })

  describe('sanitizeInput', () => {
    it('deve sanitizar entrada com tags HTML', () => {
      const input = '<script>alert("xss")</script>João'
      const result = sanitizeInput(input)
      expect(result).toBe('scriptalert("xss")/scriptJoão')
    })

    it('deve remover espaços em branco', () => {
      const input = '  João Silva  '
      const result = sanitizeInput(input)
      expect(result).toBe('João Silva')
    })

    it('deve retornar string vazia para entrada não string', () => {
      const result = sanitizeInput(123)
      expect(result).toBe('')
    })
  })
})
