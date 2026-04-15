import useSEO from '../utils/useSEO'
import Hero from '../components/Hero'
import Beneficios from '../components/Beneficios'
import Servicos from '../components/Servicos'
import QuemSou from '../components/QuemSou'
import ComoFunciona from '../components/ComoFunciona'
import Projects from '../components/Projects'
import Precos from '../components/Precos'
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
      <Hero />
      <Servicos />
      <QuemSou />
      <Beneficios />
      <Projects />
      <ComoFunciona />
      <Precos />
      <CTAFinal />
      <Contact />
    </>
  )
}

export default Home
