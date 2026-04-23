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
      document.title = 'Site Profissional por R$300 em até 3 dias | Fabiano Freitas'
      if (metaDesc) metaDesc.setAttribute('content', 'Site ou landing page profissional por R$300. Entrega em até 3 dias, 1 ano de hospedagem grátis. Negócios locais no Rio de Janeiro.')
      if (link => link) {
        let lnk = document.querySelector('link[rel="canonical"]')
        if (lnk) lnk.setAttribute('href', 'https://fabianosf.com')
      }
    }
  }, [title, description, canonical])
}

export default useSEO
