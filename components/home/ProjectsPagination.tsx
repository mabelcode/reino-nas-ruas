'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Users, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface Program {
  id: string;
  title: string;
  description: string;
  details: string[];
  participants: number;
  duration: string;
  image?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ProjectsPaginationProps {
  programs: Program[];
}

export function ProjectsPagination({ programs }: ProjectsPaginationProps) {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(programs.length / pageSize);
  const pagePrograms = useMemo(() => programs.slice(currentPage * pageSize, (currentPage + 1) * pageSize), [currentPage, programs]);
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
  }, [programs, pageSize]);

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
                    src={`/api/assets/${program.image}`}
                    alt={program.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
} 