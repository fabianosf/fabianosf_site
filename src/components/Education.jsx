import React from 'react'
import { GraduationCap, Award, BookOpen } from 'lucide-react'

const Education = () => {
  const education = [
    {
      type: 'Pós-graduação',
      title: 'Desenvolvimento Orientado a Objetos em Java',
      institution: 'Instituição de Ensino',
      year: '2020',
      icon: <GraduationCap size={28} />,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      type: 'Graduação',
      title: 'Rede de Computadores',
      institution: 'UNESA',
      year: '2018',
      icon: <GraduationCap size={28} />,
      color: 'from-teal-500 to-blue-500',
    },
  ]

  const certifications = [
    { name: 'MCP – Windows 2000 Professional', issuer: 'Microsoft' },
    { name: 'Python para Análise de Dados', issuer: 'Plataforma Online' },
    { name: 'Django Web Framework', issuer: 'Plataforma Online' },
    { name: 'Machine Learning', issuer: 'Plataforma Online' },
    { name: 'Power BI - Business Intelligence', issuer: 'Plataforma Online' },
    { name: 'Spring Boot & Microserviços', issuer: 'Plataforma Online' },
    { name: 'Docker & Containerização', issuer: 'Plataforma Online' },
    { name: 'Git & GitHub', issuer: 'Plataforma Online' },
  ]

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Formação <span className="text-teal-600">&</span> Certificações
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Educação acadêmica e certificações profissionais que fundamentam minha expertise
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Education */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-500 text-white rounded-xl">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Educação Acadêmica</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${edu.color} text-white mb-4`}>
                    {edu.icon}
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold mb-3 ml-3">
                    {edu.type}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{edu.title}</h4>
                  <p className="text-gray-600 mb-1">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl">
                <Award size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Certificações & Cursos</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex-shrink-0 mt-1">
                    <BookOpen size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{cert.name}</h4>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education

