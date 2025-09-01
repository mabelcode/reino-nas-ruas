'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Users } from 'lucide-react';

export function ProjectsSection() {
  const projects = [
    {
      id: '1',
      title: 'Futebol do futuro',
      description: 'Futebol Futebol Futebol Futebol Futebol Futebol Futebol Futebol Futebol Futebol Futebol Futebol Ful.',
      image: '/assets/images/projects/futebol.webp',
      participants: 20,
      duration: 'há 5 meses',
      status: 'Em andamento'
    },
    {
      id: '2',
      title: 'Futuro Campeão - Jiu-Jitsu',
      description: 'Programa esportivo que desenvolve disciplina, autoestima e valores, através da prática do Jiu-Jitsu.',
      image: '/assets/images/projects/jiujitsu.webp',
      participants: 50,
      duration: 'há mais de 1 ano',
      status: 'Em andamento'
    },
    {
      id: '3',
      title: 'Mulheres Empreendedoras',
      description: 'Programa de empoderamento feminino com foco em capacitação profissional e empreendedorismo.',
      image: '/assets/images/projects/mulheres.webp',
      participants: 50,
      duration: 'há cerca de 2 anos',
      status: 'Em andamento'
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
              key={project.id}
              className={`bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-video relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
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
                
                <Link
                  href={`/projects#${project.id}`}
                  className="w-full bg-gray-100 text-[var(--reino-orange)] font-semibold py-2 sm:py-3 rounded-xl hover:bg-[var(--reino-orange)] hover:text-white transition-all duration-300 flex items-center justify-center text-sm sm:text-base"
                >
                  Saiba Mais
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/projects#programs" className="inline-flex items-center bg-[var(--reino-orange)] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[var(--reino-orange-hover)] transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base">
            Ver Todos os Projetos
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}