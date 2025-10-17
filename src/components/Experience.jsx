import React from 'react'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      company: 'Engeconsult',
      role: 'Analista de Dados',
      period: '2024 - Atual',
      location: 'Brasil',
      description: 'Extração e tratamento de dados, criação de dashboards em Power BI, automação de processos de ETL.',
      highlights: [
        'Desenvolvimento de dashboards interativos em Power BI',
        'Automação de processos de ETL com Python',
        'Análise de grandes volumes de dados',
        'Suporte à tomada de decisões estratégicas',
      ],
      color: 'from-teal-500 to-blue-500',
    },
    {
      company: '3Con',
      role: 'Analista de Produção',
      period: '2020 - 2024',
      location: 'Brasil',
      description: 'Manutenção de bancos SQL e Oracle, automação em PowerShell, uso de ITSM e PowerCenter.',
      highlights: [
        'Manutenção e otimização de bancos de dados SQL e Oracle',
        'Automação de tarefas com PowerShell',
        'Gestão de processos com ITSM',
        'Implementação de ETL com PowerCenter',
      ],
      color: 'from-blue-500 to-indigo-500',
    },
    {
      company: 'Globo',
      role: 'Programador',
      period: '2019',
      location: 'Rio de Janeiro, Brasil',
      description: 'Suporte a banco de dados e servidores de streaming; desenvolvimento com Java (Spring Boot) e Angular.',
      highlights: [
        'Desenvolvimento de aplicações com Java Spring Boot',
        'Frontend com Angular',
        'Suporte a bancos de dados',
        'Manutenção de servidores de streaming',
      ],
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Experiência <span className="text-teal-600">Profissional</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trajetória profissional com foco em análise de dados e desenvolvimento de soluções tecnológicas
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-400 to-blue-400"></div>

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto md:text-left'
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 border-4 border-white shadow-lg"></div>

                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${exp.color} text-white font-semibold mb-4`}>
                    <Briefcase size={20} className="inline mr-2" />
                    {exp.role}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.company}</h3>

                  <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>

                  <ul className="space-y-2 text-left">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <span className="text-teal-500 mt-1">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience

