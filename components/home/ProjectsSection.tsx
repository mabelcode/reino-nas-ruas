'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Users, Star } from 'lucide-react';

export function ProjectsSection() {
  const projects = [
    {
      title: "Projeto Raízes",
      description: "Fortalecimento da identidade cultural e autoestima através de atividades artísticas e culturais, conectando os jovens com suas origens.",
      participants: 45,
      duration: "6 meses",
      status: "Ativo",
      image: "https://images.pexels.com/photos/8613224/pexels-photo-8613224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Futuro Campeão",
      description: "Desenvolvimento de habilidades esportivas e valores através do Jiu-Jitsu, promovendo disciplina e respeito entre os participantes.",
      participants: 60,
      duration: "12 meses",
      status: "Ativo",
      image: "https://images.pexels.com/photos/7045859/pexels-photo-7045859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Mulheres Empreendedoras",
      description: "Capacitação profissional e desenvolvimento de habilidades empreendedoras para mulheres da comunidade, incluindo cursos e mentoria.",
      participants: 25,
      duration: "8 meses",
      status: "Ativo",
      image: "https://images.pexels.com/photos/7551677/pexels-photo-7551677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[var(--reino-green-e)] mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Conheça nossos principais projetos que estão transformando vidas e construindo futuros mais brilhantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className={`bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-video relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <span className="px-2 sm:px-3 py-1 bg-[var(--reino-green-c)] text-white text-xs sm:text-sm rounded-full">
                    {project.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--reino-green-e)] mb-2 sm:mb-3">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  <div className="flex items-center">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {project.participants} participantes
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {project.duration}
                  </div>
                </div>
                
                <button className="w-full bg-gray-100 text-[var(--reino-orange)] font-semibold py-2 sm:py-3 rounded-xl hover:bg-[var(--reino-orange)] hover:text-white transition-all duration-300 flex items-center justify-center text-sm sm:text-base">
                  Saiba Mais
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/projects" className="inline-flex items-center bg-[var(--reino-orange)] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[var(--reino-orange-hover)] transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base">
            Ver Todos os Projetos
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}