import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import WhatsAppButton from '../components/WhatsAppButton'

describe('Componente WhatsAppButton', () => {
  it('deve renderizar o botão do WhatsApp', () => {
    render(<WhatsAppButton />)
    
    const whatsappButton = screen.getByRole('link')
    expect(whatsappButton).toBeInTheDocument()
  })

  it('deve ter o link correto do WhatsApp', () => {
    render(<WhatsAppButton />)
    
    const whatsappButton = screen.getByRole('link')
    expect(whatsappButton).toHaveAttribute('href', expect.stringContaining('wa.me/5521994078286'))
  })

  it('deve ter mensagem pré-escrita', () => {
    render(<WhatsAppButton />)
    
    const whatsappButton = screen.getByRole('link')
    const href = whatsappButton.getAttribute('href')
    expect(href).toContain('text=')
    expect(href).toContain(encodeURIComponent('Olá! Vi seu portfólio e gostaria de conversar.'))
  })

  it('deve abrir em nova aba', () => {
    render(<WhatsAppButton />)
    
    const whatsappButton = screen.getByRole('link')
    expect(whatsappButton).toHaveAttribute('target', '_blank')
    expect(whatsappButton).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('deve ter ícone do WhatsApp', () => {
    render(<WhatsAppButton />)
    
    // O ícone MessageCircle deve estar presente
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('deve ter classes CSS corretas', () => {
    render(<WhatsAppButton />)
    
    const whatsappButton = screen.getByRole('link')
    expect(whatsappButton).toHaveClass('fixed')
    expect(whatsappButton).toHaveClass('bottom-6')
    expect(whatsappButton).toHaveClass('right-6')
    expect(whatsappButton).toHaveClass('bg-green-500')
  })

  it('deve ter texto que aparece no hover', () => {
    render(<WhatsAppButton />)
    
    // O texto "Fale no WhatsApp" deve estar presente
    expect(screen.getByText('Fale no WhatsApp')).toBeInTheDocument()
  })

  it('deve ter z-index alto para ficar flutuante', () => {
    render(<WhatsAppButton />)
    
    const whatsappButton = screen.getByRole('link')
    expect(whatsappButton).toHaveClass('z-50')
  })

  it('deve ter animação de pulso', () => {
    render(<WhatsAppButton />)
    
    // Verificar se há elemento com animação de pulso
    const pulseElement = document.querySelector('.animate-ping')
    expect(pulseElement).toBeInTheDocument()
  })

  it('deve ser acessível', () => {
    render(<WhatsAppButton />)
    
    const whatsappButton = screen.getByRole('link')
    expect(whatsappButton).toHaveAttribute('href')
    expect(whatsappButton).toHaveAttribute('target', '_blank')
  })
})
