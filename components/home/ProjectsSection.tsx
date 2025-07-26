'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useProjects } from '@/hooks/use-projects';

export function ProjectsSection() {
  const projects = useProjects().filter(
    (p) => p.status?.toLowerCase() === 'em andamento'
  );

  const mappedProjects = projects.slice(0, 3).map((p) => ({
    ...p,
    image: p.cover_image ? `/api/assets/${p.cover_image}` : undefined,
    participants:
      (p.kids || 0) + (p.young || 0) + (p.adult || 0) + (p.elderly || 0),
    duration: p.start_date
      ? formatDistanceToNow(new Date(p.start_date), {
          addSuffix: true,
          locale: ptBR,
        })
      : '',
    shortDescription:
      p.description.length > 99
        ? `${p.description.slice(0, 99)}...`
        : p.description,
  }));

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
          {mappedProjects.map((project, index) => (
            <div 
              key={project.title}
              className={`bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-video relative">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}
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
                  {project.shortDescription}
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