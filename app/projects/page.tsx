'use client';

import { Zap, Music, BookOpen, Users, Target, Calendar, MapPin } from 'lucide-react';

export default function WhatWeDoPage() {
  const programs = [
    {
      icon: Zap,
      title: "Futuro Campeão - Jiu-Jitsu",
      description: "Programa esportivo que desenvolve disciplina, autoestima e valores através da prática do Jiu-Jitsu.",
      details: [
        "Aulas 3x por semana",
        "Faixas etárias: 6 a 17 anos",
        "Filosofia e valores marciais",
        "Competições e eventos"
      ],
      participants: 60,
      duration: "12 meses",
      image: "https://images.pexels.com/photos/7045859/pexels-photo-7045859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      icon: Music,
      title: "Ritmo e Rima - RAP e Cultura",
      description: "Desenvolvimento da expressão artística e consciência social através da música e cultura hip-hop.",
      details: [
        "Oficinas de rap e beatbox",
        "Produção musical",
        "Apresentações públicas",
        "Letras com consciência social"
      ],
      participants: 35,
      duration: "10 meses",
      image: "https://images.pexels.com/photos/7034369/pexels-photo-7034369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      icon: BookOpen,
      title: "Educação Transformadora",
      description: "Programa de reforço escolar e desenvolvimento educacional personalizado.",
      details: [
        "Acompanhamento pedagógico",
        "Reforço em matemática e português",
        "Desenvolvimento da leitura",
        "Preparação para vestibulares"
      ],
      participants: 80,
      duration: "12 meses",
      image: "https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      icon: Users,
      title: "Mulheres Empreendedoras",
      description: "Programa de empoderamento feminino com foco em capacitação profissional e empreendedorismo.",
      details: [
        "Cursos de capacitação profissional",
        "Workshops de empreendedorismo",
        "Mentoria empresarial",
        "Microcrédito e apoio financeiro"
      ],
      participants: 25,
      duration: "8 meses",
      image: "https://images.pexels.com/photos/7551677/pexels-photo-7551677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  const testimonials = [
    {
      name: "Ana, 16 anos",
      text: "O projeto mudou minha vida. Aprendi disciplina no Jiu-Jitsu e hoje sou faixa azul. Meus pais ficam orgulhosos!",
      program: "Futuro Campeão"
    },
    {
      name: "Carlos, 14 anos",
      text: "Através do rap, consegui expressar meus sentimentos e ajudar outros jovens da comunidade.",
      program: "Ritmo e Rima"
    },
    {
      name: "Maria, mãe de participante",
      text: "Minha filha melhorou muito na escola depois que começou a participar do reforço. Obrigada Reino nas Ruas!",
      program: "Educação Transformadora"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-r from-[var(--reino-orange)] to-[var(--reino-yellow)] text-white">
        <div className="container-max">
          <div className="text-center">
            <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl mb-6">
              O que Fazemos
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Nossos programas transformam vidas através da educação, esporte e cultura. Conheça como estamos construindo um futuro melhor para nossa comunidade.
            </p>
          </div>
        </div>
      </section>

      {/* Programas */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
              Nossos Programas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada programa é cuidadosamente desenvolvido para atender às necessidades específicas de nossos jovens.
            </p>
          </div>

          <div className="space-y-16">
            {programs.map((program, index) => (
              <div 
                key={program.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} animate-slide-in-left`}>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-[var(--reino-orange)] rounded-full flex items-center justify-center mr-4">
                      <program.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--reino-green-e)]">{program.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {program.participants} participantes
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {program.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {program.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-[var(--reino-orange)] rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} animate-slide-in-right`}>
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="rounded-3xl shadow-lg w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
              Histórias de Transformação
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja como nossos programas têm impactado positivamente a vida de jovens e famílias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className={`bg-white rounded-3xl p-6 shadow-lg card-hover animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-4">
                  <div className="text-4xl text-[var(--reino-orange)] mb-2">&quot;</div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {testimonial.text}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-[var(--reino-green-e)]">{testimonial.name}</div>
                  <div className="text-sm text-[var(--reino-orange)]">{testimonial.program}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-[var(--reino-green-e)] text-white">
        <div className="container-max text-center">
          <h2 className="heading-font text-3xl sm:text-4xl mb-6">
            Seja Parte da Transformação
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a nós e ajude a criar mais histórias de sucesso. Sua participação pode fazer toda a diferença!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const event = new CustomEvent('openVolunteerModal');
                window.dispatchEvent(event);
              }}
              className="bg-[var(--reino-orange)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[var(--reino-orange-hover)] transition-all duration-300 hover:scale-105"
            >
              Seja Voluntário
            </button>
            <a 
              href="/donate" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--reino-green-e)] transition-all duration-300 hover:scale-105"
            >
              Fazer Doação
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}