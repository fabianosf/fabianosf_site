import React from 'react'
import { Github, ExternalLink, Code2, BarChart, Database, Bot } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'Desenvolvimento Web com Django e ReactJS',
      description: 'Desenvolvimento completo de aplicação web moderna e responsiva, integrando backend robusto em Django com frontend dinâmico em ReactJS. Solução personalizada que une performance, segurança e experiência do usuário excepcional para atender às necessidades específicas do seu negócio.',
      technologies: ['Django', 'ReactJS', 'PostgreSQL', 'REST API'],
      icon: <Code2 size={32} />,
      color: 'from-teal-400 to-blue-500',
      github: '#',
      demo: '#',
    },
    {
      title: 'API REST com Django',
      description: 'API RESTful completa para gestão de dados, com autenticação JWT, documentação Swagger e testes automatizados.',
      technologies: ['Django', 'Django REST', 'PostgreSQL', 'Docker'],
      icon: <Code2 size={32} />,
      color: 'from-green-400 to-teal-500',
      github: '#',
      demo: '#',
    },
    {
      title: 'Análise de Dados',
      description: 'Projeto completo de análise de dados incluindo limpeza e tratamento de informações, extração, transformação e carga de dados (ETL) de múltiplas fontes, proporcionando insights valiosos para tomada de decisão.',
      technologies: ['Python', 'Pandas', 'SQL'],
      icon: <Database size={32} />,
      color: 'from-blue-400 to-indigo-500',
      github: '#',
      demo: '#',
    },
    {
      title: 'Machine Learning',
      description: 'Desenvolvimento preditivo para análise de tendências e previsão de resultados utilizando algoritmos de ML.',
      technologies: ['Python', 'Scikit-learn', 'Jupyter'],
      icon: <Bot size={32} />,
      color: 'from-purple-400 to-pink-500',
      github: '#',
      demo: '#',
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Projetos <span className="text-teal-600">&</span> Portfólio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Seleção de projetos que demonstram minhas habilidades em análise de dados e desenvolvimento
          </p>
          <a
            href="https://github.com/fabianosf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors"
          >
            <Github size={24} />
            Ver todos os projetos no GitHub
            <ExternalLink size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
              
              <div className="p-8">
                <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${project.color} text-white mb-4`}>
                  {project.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    <Github size={18} />
                    Código
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                  >
                    <ExternalLink size={18} />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

