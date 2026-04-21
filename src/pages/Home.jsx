import useSEO from '../utils/useSEO'
import Hero from '../components/Hero'
import Problema from '../components/Problema'
import Servicos from '../components/Servicos'
import Beneficios from '../components/Beneficios'
import ComoFunciona from '../components/ComoFunciona'
import VideoApresentacao from '../components/VideoApresentacao'
import ParaQuemE from '../components/ParaQuemE'
import ProvasSocial from '../components/ProvasSocial'
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
      {/* 1. Hero — resultado + quem sou em uma linha */}
      <Hero />
      {/* 2. Problema — identificação com a dor antes da solução */}
      <Problema />
      {/* 3. Solução — o que eu faço e como funciona */}
      <Servicos />
      {/* 4. Benefícios — o que muda na prática */}
      <Beneficios />
      {/* 5. Como Funciona — 4 passos, baixa fricção */}
      <ComoFunciona />
      {/* 6. Vídeo — humanização e confiança no momento certo */}
      <VideoApresentacao />
      {/* 7. Para Quem É — confirmação de segmento */}
      <ParaQuemE />
      {/* 8. Prova Social — depoimentos em destaque próprio */}
      <ProvasSocial />
      {/* 9. Portfólio — sites reais com links funcionais */}
      <Projects />
      {/* 10. Quem Sou — autoridade após a prova */}
      <QuemSou />
      {/* 11. Preços — oferta clara com ancoragem de valor */}
      <Precos />
      {/* 12. FAQ — remove objeções logo após o preço */}
      <FAQ />
      {/* 13. CTA Final — urgência e ação */}
      <CTAFinal />
      {/* 14. Contato — WhatsApp como principal */}
      <Contact />
    </>
  )
}

export default Home
