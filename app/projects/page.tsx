'use client';

import { Star, ClipboardList } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useProjects } from '@/hooks/use-projects';
import { useTestimonials } from '@/hooks/use-testimonials';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import { ProjectsPagination } from '@/components/home/ProjectsPagination';

export default function Projects() {
  const projects = useProjects();
  const testimonials = useTestimonials();

  const projectMap = projects.reduce<Record<string, string>>((acc, p) => {
    acc[p.id] = p.title;
    return acc;
  }, {});

  const programs = projects.map((p) => ({
    id: p.id,
    icon: p.highlighted ? Star : ClipboardList,
    title: p.title,
    description: p.description,
    details: p.keywords || [],
    participants: (p.kids || 0) + (p.young || 0) + (p.adult || 0) + (p.elderly || 0),
    duration: p.start_date
      ? formatDistanceToNow(new Date(p.start_date), {
        addSuffix: true,
        locale: ptBR,
      })
      : '',
    image: p.cover_image || undefined,
    status: p.status,
  }));


  return (
    <>
      <title>PROJETOS | Reino nas Ruas</title>
      <div className="min-h-screen pt-16 sm:pt-18 lg:pt-20">
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
        <section id="programs" className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
                Nossos Programas
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Cada programa é cuidadosamente desenvolvido para atender às necessidades específicas de nossos jovens.
              </p>
            </div>

            <ProjectsPagination programs={programs} />
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

            <TestimonialsCarousel testimonials={testimonials} projectMap={projectMap} />
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
    </>
  );
}
