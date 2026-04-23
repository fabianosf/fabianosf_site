export const NUMERO = '5521994078286'

export const wa = (msg) => `https://wa.me/${NUMERO}?text=${encodeURIComponent(msg)}`

export const MSG = {
  // ── Botão flutuante — muda conforme a rota ────────────────────────────────
  paginas: {
    '/':                   `Oi Fabiano! Vi seu site e quero saber como você pode me ajudar a receber mais clientes.`,
    '/servicos':           `Oi Fabiano! Vi a página de serviços e quero entender o que faz sentido para o meu negócio.`,
    '/precos':             `Oi Fabiano! Vi a página de preços e quero entender qual plano é certo para mim.`,
    '/criacao-de-sites':   `Oi Fabiano! Vi a página de criação de sites e quero um orçamento.`,
    '/site-para-academia': `Oi Fabiano! Quero um site profissional para minha academia.`,
    '/site-para-clinica':  `Oi Fabiano! Quero um site profissional para minha clínica.`,
    geral:                 `Oi Fabiano! Quero um site profissional. Pode me ajudar?`,
  },

  // ── Componentes ────────────────────────────────────────────────────────────
  header:       `Oi Fabiano! Quero um site profissional. Pode me ajudar?`,
  footer:       `Oi Fabiano! Quero um site profissional. Pode me ajudar?`,
  hero:         `Oi Fabiano! Vi seu site e quero entender como você pode me ajudar a receber mais clientes.`,
  problema:     `Oi Fabiano! Quero entender como um site pode ajudar meu negócio a receber mais clientes.`,
  comoFunciona: `Oi Fabiano! Quero um site profissional que traga clientes para meu negócio.`,
  beneficios:   `Oi Fabiano! Quero um site que traga mais clientes para o meu negócio!`,
  quemSou:      `Oi Fabiano! Vi seu site e quero saber mais sobre criação de sites.`,
  paraQuemE:    `Oi Fabiano! Quero entender se seu serviço é o certo para o meu negócio.`,
  provasSocial: `Oi Fabiano! Vi os resultados dos seus clientes e quero resultado igual para o meu negócio.`,
  video:        `Oi Fabiano! Vi seu vídeo no site e quero entender como isso pode funcionar para o meu negócio.`,
  faq:          `Oi Fabiano! Ainda tenho algumas dúvidas antes de decidir. Podemos conversar?`,
  ctaFinal:     `Oi Fabiano! Quero mais clientes para o meu negócio. Pode me ajudar?`,
  contato:      `Oi Fabiano! Gostaria de um orçamento para um site.`,
  projetos:     `Oi Fabiano! Vi seu portfólio e quero um site assim para o meu negócio!`,

  // ── Serviços específicos ───────────────────────────────────────────────────
  servicos: {
    site:    `Oi Fabiano! Quero um site profissional para meu negócio. Como funciona?`,
    trafego: `Oi Fabiano! Quero saber mais sobre tráfego pago (Facebook e Instagram) para meu negócio. Como funciona?`,
    pacote:  `Oi Fabiano! Tenho interesse no pacote site + tráfego pago. Como funciona?`,
  },

  // ── Planos de preço ────────────────────────────────────────────────────────
  planos: {
    captacao:        `Oi Fabiano! Tenho interesse na Página de Captação (R$800). Como funciona?`,
    profissional:    `Oi Fabiano! Tenho interesse no Site Profissional (R$1.500). Como funciona?`,
    clientesTodoDia: `Oi Fabiano! Tenho interesse no pacote Clientes Todo Dia (site + tráfego pago). Como funciona?`,
    duvida:          `Oi Fabiano! Preciso de ajuda para escolher o melhor plano para o meu negócio.`,
  },

  // ── Páginas dedicadas ──────────────────────────────────────────────────────
  criacaoSites: `Oi Fabiano! Vi a página de criação de sites e quero um orçamento.`,
  servicosPage: `Oi Fabiano! Vi a página de serviços e quero entender o que faz sentido para o meu negócio.`,
  precosPage:   `Oi Fabiano! Vi a página de preços e quero entender qual plano é certo para mim.`,
  academia:     `Oi Fabiano! Quero um site profissional para minha academia.`,
  clinica:      `Oi Fabiano! Quero um site profissional para minha clínica.`,
}
