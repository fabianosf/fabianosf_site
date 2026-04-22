import useSEO from '../utils/useSEO'
import Hero from '../components/Hero'
import Problema from '../components/Problema'
import ProvasSocial from '../components/ProvasSocial'
import Servicos from '../components/Servicos'
import Beneficios from '../components/Beneficios'
import ComoFunciona from '../components/ComoFunciona'
import VideoApresentacao from '../components/VideoApresentacao'
import ParaQuemE from '../components/ParaQuemE'
import Projects from '../components/Projects'
import QuemSou from '../components/QuemSou'
import Precos from '../components/Precos'
import FAQ from '../components/FAQ'
import CTAFinal from '../components/CTAFinal'
import Contact from '../components/Contact'

const Home = () => {
  useSEO({
    title: 'Criação de Sites Profissionais | Fabiano Freitas',
    description: 'Criação de sites profissionais que geram clientes no WhatsApp. Sites para academias, clínicas, empresas e autônomos. A partir de R$800. Fale agora!',
    canonical: 'https://fabianosf.com/',
  })

  return (
    <>
      {/* 1. Hero */}
      <Hero />
      {/* 2. Problema — dor antes da solução */}
      <Problema />
      {/* 3. Prova Social — logo após a dor, visitante vê resultado antes da solução */}
      <ProvasSocial />
      {/* 4. Solução — o que eu faço */}
      <Servicos />
      {/* 5. Benefícios — o que muda na prática */}
      <Beneficios />
      {/* 6. Como Funciona — 4 passos */}
      <ComoFunciona />
      {/* 7. Vídeo — humanização no momento certo: racional ok, falta confiança */}
      <VideoApresentacao />
      {/* 8. Para Quem É — confirmação de segmento */}
      <ParaQuemE />
      {/* 9. Portfólio */}
      <Projects />
      {/* 10. Quem Sou — autoridade após a prova */}
      <QuemSou />
      {/* 11. Preços */}
      <Precos />
      {/* 12. FAQ — remove objeções logo após preço */}
      <FAQ />
      {/* 13. CTA Final */}
      <CTAFinal />
      {/* 14. Contato */}
      <Contact />
    </>
  )
}

export default Home
