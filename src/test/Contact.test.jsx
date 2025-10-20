import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../components/Contact'

// Mock das dependências
vi.mock('../config/firebase', () => ({
  db: {}
}))

vi.mock('../config/emailjs', () => ({
  emailjsConfig: {
    serviceId: 'service_test',
    templateId: 'template_test',
    publicKey: 'public_key_test'
  }
}))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => ({})),
  addDoc: vi.fn(() => Promise.resolve({ id: 'test-id' })),
  serverTimestamp: vi.fn(() => new Date())
}))

vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(() => Promise.resolve({ status: 200, text: 'OK' }))
  }
}))

describe('Componente Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar o formulário de contato', () => {
    render(<Contact />)
    
    expect(screen.getByText('Entre em Contato')).toBeInTheDocument()
    expect(screen.getByText('Envie uma Mensagem')).toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Mensagem')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar mensagem/i })).toBeInTheDocument()
  })

  it('deve mostrar informações de contato', () => {
    render(<Contact />)
    
    expect(screen.getByText('fabiano.freitas@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('/fabiano-freitas')).toBeInTheDocument()
    expect(screen.getByText('Informações de Contato')).toBeInTheDocument()
  })

  it('deve permitir preencher o formulário', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const nameInput = screen.getByLabelText('Nome')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Mensagem')
    
    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@exemplo.com')
    await user.type(messageInput, 'Preciso de um site para minha empresa.')
    
    expect(nameInput).toHaveValue('João Silva')
    expect(emailInput).toHaveValue('joao@exemplo.com')
    expect(messageInput).toHaveValue('Preciso de um site para minha empresa.')
  })

  it('deve validar campos obrigatórios', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    await user.click(submitButton)
    
    // Verificar se os campos são obrigatórios (HTML5 validation)
    const nameInput = screen.getByLabelText('Nome')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Mensagem')
    
    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(messageInput).toBeRequired()
  })

  it('deve validar formato de email', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const emailInput = screen.getByLabelText('Email')
    await user.type(emailInput, 'email-invalido')
    
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('deve mostrar botão de envio desabilitado durante o envio', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const nameInput = screen.getByLabelText('Nome')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Mensagem')
    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    
    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@exemplo.com')
    await user.type(messageInput, 'Preciso de um site para minha empresa.')
    
    await user.click(submitButton)
    
    // O botão deve estar desabilitado durante o envio
    expect(submitButton).toBeDisabled()
  })

  it('deve limpar o formulário após envio bem-sucedido', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const nameInput = screen.getByLabelText('Nome')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Mensagem')
    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    
    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@exemplo.com')
    await user.type(messageInput, 'Preciso de um site para minha empresa.')
    
    await user.click(submitButton)
    
    // Aguardar o envio ser processado
    await waitFor(() => {
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(messageInput).toHaveValue('')
    }, { timeout: 3000 })
  })

  it('deve mostrar mensagem de sucesso após envio', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const nameInput = screen.getByLabelText('Nome')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Mensagem')
    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    
    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@exemplo.com')
    await user.type(messageInput, 'Preciso de um site para minha empresa.')
    
    await user.click(submitButton)
    
    // Aguardar mensagem de sucesso
    await waitFor(() => {
      expect(screen.getByText(/mensagem enviada com sucesso/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('deve ter acessibilidade adequada', () => {
    render(<Contact />)
    
    // Verificar labels associados aos inputs
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Mensagem')).toBeInTheDocument()
    
    // Verificar se o botão tem texto descritivo
    expect(screen.getByRole('button', { name: /enviar mensagem/i })).toBeInTheDocument()
  })

  it('deve ter links de contato funcionais', () => {
    render(<Contact />)
    
    const emailLink = screen.getByRole('link', { name: /email/i })
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    const githubLink = screen.getByRole('link', { name: /github/i })
    
    expect(emailLink).toHaveAttribute('href', 'mailto:fabiano.freitas@gmail.com')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/fabianosfreitas/')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/fabianosf')
  })

  it('deve ter botões de ação secundários', () => {
    render(<Contact />)
    
    expect(screen.getByRole('button', { name: /enviar email/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /linkedin/i })).toBeInTheDocument()
  })
})
