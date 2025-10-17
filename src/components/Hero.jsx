import React from 'react'
import { Github, Linkedin, Mail, Download } from 'lucide-react'

const Hero = () => {
  return (
    <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Photo */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-blue-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="/images/20161127_153951.jpg"
                  alt="Fabiano Sousa de Freitas"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/0f766e/ffffff?text=F'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-7/12 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              <span className="text-teal-600">Fabiano Freitas</span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-6 font-medium">
              Analista de Dados & Desenvolvedor Web
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Analista de Dados e Desenvolvedor Web apaixonado por tecnologia e inovação. Tenho experiência sólida com 
              <span className="font-semibold text-teal-600"> Python</span>,
              <span className="font-semibold text-teal-600"> Django</span> e
              <span className="font-semibold text-teal-600"> Power BI</span>, atuando em análise de dados, automação de processos de ETL 
              e criação de soluções inteligentes que apoiam decisões estratégicas. 
              Busco transformar dados em valor e resultados reais para empresas.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Mail size={20} />
                Entre em Contato
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-teal-600 border-2 border-teal-600 rounded-lg font-semibold hover:bg-teal-50 transform hover:scale-105 transition-all duration-200 shadow-md"
              >
                <Download size={20} />
                Ver Projetos
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="mailto:fabiano.freitas@gmail.com"
                className="p-3 bg-white rounded-full text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://linkedin.com/in/fabiano-freitas"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/fabiano-freitas"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

