import React from 'react'
import { Database, Code, BarChart3, Server, GitBranch, Box } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Análise de Dados',
      icon: <BarChart3 size={32} />,
      color: 'from-blue-500 to-blue-600',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'Pandas', level: 90 },
        { name: 'SQL', level: 90 },
        { name: 'Power BI', level: 85 },
        { name: 'ETL', level: 85 },
        { name: 'Machine Learning', level: 75 },
      ],
    },
    {
      title: 'Desenvolvimento Web',
      icon: <Code size={32} />,
      color: 'from-teal-500 to-teal-600',
      skills: [
        { name: 'Django', level: 90 },
        { name: 'Django REST', level: 85 },
        { name: 'ReactJS', level: 75 },
        { name: 'HTML', level: 80 },
        { name: 'CSS', level: 75 },
      ],
    },
    {
      title: 'Banco de Dados',
      icon: <Database size={32} />,
      color: 'from-orange-500 to-orange-600',
      skills: [
        { name: 'MySQL', level: 90 },
        { name: 'Oracle', level: 85 },
        { name: 'SQL Server', level: 85 },
        { name: 'PostgreSQL', level: 80 },
      ],
    },
    {
      title: 'Outras Ferramentas',
      icon: <Server size={32} />,
      color: 'from-green-500 to-green-600',
      skills: [
        { name: 'Docker', level: 80 },
        { name: 'Git', level: 90 },
        { name: 'PowerShell', level: 85 },
        { name: 'VSCode', level: 75 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Habilidades <span className="text-teal-600">&</span> Competências
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conjunto de tecnologias e ferramentas que domino para entregar soluções de alta qualidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-teal-600 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

