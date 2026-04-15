import { useEffect } from 'react'

/**
 * Hook para atualizar dinamicamente meta tags SEO por página.
 * @param {Object} seo - { title, description, canonical }
 */
const useSEO = ({ title, description, canonical }) => {
  useEffect(() => {
    // Title
    document.title = title

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)

    // OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)

    // OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)

    // Twitter title
    let twTitle = document.querySelector('meta[name="twitter:title"]')
    if (twTitle) twTitle.setAttribute('content', title)

    // Twitter description
    let twDesc = document.querySelector('meta[name="twitter:description"]')
    if (twDesc) twDesc.setAttribute('content', description)

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (link) link.setAttribute('href', canonical)
    }

    // Cleanup: restore default on unmount
    return () => {
      document.title = 'Criação de Sites Profissionais | Fabiano Freitas'
      if (metaDesc) metaDesc.setAttribute('content', 'Criação de sites profissionais que geram clientes no WhatsApp. Sites para academias, clínicas, empresas e autônomos. A partir de R$800. Fale agora!')
      if (link => link) {
        let lnk = document.querySelector('link[rel="canonical"]')
        if (lnk) lnk.setAttribute('href', 'https://fabianosf.com')
      }
    }
  }, [title, description, canonical])
}

export default useSEO
