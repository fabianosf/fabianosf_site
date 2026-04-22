export const NUMERO = '5521994078286'

// Prefixo reconhecido pelo Evolution API como trigger do site.
// Configure no Evolution: disparar apenas quando a mensagem contém "[site]"
const T = '[site]'

export const wa = (msg) => `https://wa.me/${NUMERO}?text=${encodeURIComponent(msg)}`

export const MSG = {
  // ── Botão flutuante — muda conforme a rota ────────────────────────────────
  paginas: {
    '/':                   `${T} Oi Fabiano! Vi seu site e quero saber como você pode me ajudar a receber mais clientes.`,
    '/servicos':           `${T} Oi Fabiano! Vi a página de serviços e quero entender o que faz sentido para o meu negócio.`,
    '/precos':             `${T} Oi Fabiano! Vi a página de preços e quero entender qual plano é certo para mim.`,
    '/criacao-de-sites':   `${T} Oi Fabiano! Vi a página de criação de sites e quero um orçamento.`,
    '/site-para-academia': `${T} Oi Fabiano! Quero um site profissional para minha academia.`,
    '/site-para-clinica':  `${T} Oi Fabiano! Quero um site profissional para minha clínica.`,
    geral:                 `${T} Oi Fabiano! Quero um site profissional. Pode me ajudar?`,
  },

  // ── Componentes ────────────────────────────────────────────────────────────
  header:       `${T} Oi Fabiano! Quero um site profissional. Pode me ajudar?`,
  footer:       `${T} Oi Fabiano! Quero um site profissional. Pode me ajudar?`,
  hero:         `${T} Oi Fabiano! Vi seu site e quero entender como você pode me ajudar a receber mais clientes.`,
  problema:     `${T} Oi Fabiano! Quero entender como um site pode ajudar meu negócio a receber mais clientes.`,
  comoFunciona: `${T} Oi Fabiano! Quero um site profissional que traga clientes para meu negócio.`,
  beneficios:   `${T} Oi Fabiano! Quero um site que traga mais clientes para o meu negócio!`,
  quemSou:      `${T} Oi Fabiano! Vi seu site e quero saber mais sobre criação de sites.`,
  paraQuemE:    `${T} Oi Fabiano! Quero entender se seu serviço é o certo para o meu negócio.`,
  provasSocial: `${T} Oi Fabiano! Vi os resultados dos seus clientes e quero resultado igual para o meu negócio.`,
  video:        `${T} Oi Fabiano! Vi seu vídeo no site e quero entender como isso pode funcionar para o meu negócio.`,
  faq:          `${T} Oi Fabiano! Ainda tenho algumas dúvidas antes de decidir. Podemos conversar?`,
  ctaFinal:     `${T} Oi Fabiano! Quero mais clientes para o meu negócio. Pode me ajudar?`,
  contato:      `${T} Oi Fabiano! Gostaria de um orçamento para um site.`,
  projetos:     `${T} Oi Fabiano! Vi seu portfólio e quero um site assim para o meu negócio!`,

  // ── Serviços específicos ───────────────────────────────────────────────────
  servicos: {
    site:    `${T} Oi Fabiano! Quero um site profissional para meu negócio. Como funciona?`,
    trafego: `${T} Oi Fabiano! Quero saber mais sobre tráfego pago (Facebook e Instagram) para meu negócio. Como funciona?`,
    pacote:  `${T} Oi Fabiano! Tenho interesse no pacote site + tráfego pago. Como funciona?`,
  },

  // ── Planos de preço ────────────────────────────────────────────────────────
  planos: {
    captacao:        `${T} Oi Fabiano! Tenho interesse na Página de Captação (R$800). Como funciona?`,
    profissional:    `${T} Oi Fabiano! Tenho interesse no Site Profissional (R$1.500). Como funciona?`,
    clientesTodoDia: `${T} Oi Fabiano! Tenho interesse no pacote Clientes Todo Dia (site + tráfego pago). Como funciona?`,
    duvida:          `${T} Oi Fabiano! Preciso de ajuda para escolher o melhor plano para o meu negócio.`,
  },

  // ── Páginas dedicadas ──────────────────────────────────────────────────────
  criacaoSites: `${T} Oi Fabiano! Vi a página de criação de sites e quero um orçamento.`,
  servicosPage: `${T} Oi Fabiano! Vi a página de serviços e quero entender o que faz sentido para o meu negócio.`,
  precosPage:   `${T} Oi Fabiano! Vi a página de preços e quero entender qual plano é certo para mim.`,
  academia:     `${T} Oi Fabiano! Quero um site profissional para minha academia.`,
  clinica:      `${T} Oi Fabiano! Quero um site profissional para minha clínica.`,
}
