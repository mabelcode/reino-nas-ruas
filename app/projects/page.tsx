'use client';

import Image from 'next/image';
import { Users, Calendar, Star, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useProjects } from '@/hooks/use-projects';
import { useTestimonials } from '@/hooks/use-testimonials';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import { useState, useMemo, useEffect, useRef } from 'react';

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
    image: p.cover_image ? `/api/assets/${p.cover_image}` : undefined,
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

            {/* Paginação dos programas */}
            {(() => {
              const pageSize = 4;
              const [currentPage, setCurrentPage] = useState(0);
              const totalPages = Math.ceil(programs.length / pageSize);
              const pagePrograms = useMemo(() => programs.slice(currentPage * pageSize, (currentPage + 1) * pageSize), [programs, currentPage]);
              const hasNavigatedToHash = useRef(false);

              // Função para rolar até o início da seção de programas
              function scrollToPrograms() {
                if (typeof window !== 'undefined') {
                  const el = document.getElementById('programs');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }

              function goToPage(page: number, scrollToId?: string) {
                setCurrentPage(page);
                setTimeout(() => {
                  if (scrollToId) {
                    const el = document.getElementById(scrollToId);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      return;
                    }
                  }
                  scrollToPrograms();
                }, 10);
              }

              // Suporte a hash na URL para navegação direta ao projeto
              useEffect(() => {
                if (typeof window === 'undefined' || hasNavigatedToHash.current) return;
                const hash = window.location.hash.replace('#', '');
                if (hash) {
                  const idx = programs.findIndex(p => p.id === hash);
                  if (idx !== -1) {
                    const page = Math.floor(idx / pageSize);
                    setCurrentPage(page);
                    setTimeout(() => {
                      const el = document.getElementById(hash);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                    hasNavigatedToHash.current = true;
                  }
                }
              }, [programs]);

              return (
                <>
                  <div className="space-y-16">
                    {pagePrograms.map((program, index) => (
                      <div
                        key={program.title}
                        id={program.id}
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
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
                          {program.image ? (
                            <div className="aspect-video relative">
                              <Image
                                src={program.image}
                                alt={program.title}
                                fill
                                className="rounded-3xl shadow-lg object-cover w-full"
                              />
                            </div>
                          ) : (
                            <div className="aspect-video rounded-3xl shadow-lg bg-gray-200" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Navegação de páginas - apenas < e > */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2 items-center">
                      <button
                        onClick={() => goToPage(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0}
                        aria-label="Página anterior"
                        className={`group w-auto h-8 flex items-center justify-center rounded-full text-[var(--reino-green-e)] transition bg-transparent hover:bg-[var(--reino-orange)]/10 hover:text-[var(--reino-orange)] focus:outline-none focus:ring-2 focus:ring-[var(--reino-orange)] px-2 ${currentPage === 0 ? 'invisible' : ''}`}
                        style={{ border: 'none', boxShadow: 'none', minWidth: 32, height: 32, padding: 0 }}
                      >
                        <ChevronLeft className="w-6 h-6 mr-1" />
                        <span className="text-xs font-medium hidden sm:inline">Ver anteriores</span>
                      </button>
                      {currentPage < totalPages - 1 && (
                        <button
                          onClick={() => goToPage(Math.min(totalPages - 1, currentPage + 1))}
                          aria-label="Próxima página"
                          className="group w-auto h-8 flex items-center justify-center rounded-full text-[var(--reino-green-e)] transition bg-transparent hover:bg-[var(--reino-orange)]/10 hover:text-[var(--reino-orange)] focus:outline-none focus:ring-2 focus:ring-[var(--reino-orange)] px-2"
                          style={{ border: 'none', boxShadow: 'none', minWidth: 32, height: 32, padding: 0 }}
                        >
                          <span className="text-xs font-medium hidden sm:inline">Ver mais</span>
                          <ChevronRight className="w-6 h-6 ml-1" />
                        </button>
                      )}
                    </div>
                  )}
                </>
              );
            })()}
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
