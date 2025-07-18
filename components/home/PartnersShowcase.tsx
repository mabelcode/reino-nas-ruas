'use client';

import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

function getSlidesToShow() {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  website: string;
  logo: string;
}

export function PartnersShowcase() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const res = await fetch('/api/home/partners');
        if (!res.ok) throw new Error('Failed to fetch partners');
        const data = await res.json();
        setPartners(data.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <div>Carregando parceiros...</div>;
  if (error) return <div>Erro ao carregar parceiros: {error}</div>;
  if (!partners || partners.length === 0) return null;

  const totalPages = Math.max(1, Math.ceil(partners.length / slidesToShow));
  const getPagePartners = () => {
    const start = currentPage * slidesToShow;
    return partners.slice(start, start + slidesToShow);
  };
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;
  const goTo = (idx: number) => setCurrentPage(Math.max(0, Math.min(idx, totalPages - 1)));
  const next = () => goTo(currentPage + 1);
  const prev = () => goTo(currentPage - 1);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prev();
    if (diff < -50) next();
    touchStartX.current = null;
  };
  const showNavigation = partners.length > slidesToShow;

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="heading-font text-xl sm:text-2xl md:text-3xl text-[var(--reino-green-e)] mb-3">
            Nossos Parceiros e Mantenedores
          </h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Empresas que acreditam em nossa missão e nos apoiam na transformação de vidas.
          </p>
        </div>
        <div className="relative px-2 sm:px-6 lg:px-12" style={{ overflow: 'visible' }}>
          {showNavigation && (
            <>
              <button
                aria-label="Anterior"
                onClick={prev}
                disabled={!canGoPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition disabled:opacity-30 disabled:pointer-events-none"
                style={{ marginLeft: '-24px' }}
              >
                <ChevronLeft className="w-6 h-6 text-[var(--reino-orange)]" />
              </button>
              <button
                aria-label="Próximo"
                onClick={next}
                disabled={!canGoNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition disabled:opacity-30 disabled:pointer-events-none"
                style={{ marginRight: '-24px' }}
              >
                <ChevronRight className="w-6 h-6 text-[var(--reino-orange)]" />
              </button>
            </>
          )}
          <div
            className="overflow-visible"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex justify-center gap-4 transition-all duration-500">
              {getPagePartners().map((partner: Partner, index: number) => (
                <a
                  key={partner.id || partner.name}
                  href={
                    partner.website?.startsWith('http://') || partner.website?.startsWith('https://')
                      ? partner.website
                      : `https://${partner.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 animate-slide-up flex-1 min-w-0 max-w-xs"
                  style={{ display: 'flex', flexDirection: 'column', animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                    <Image
                      src={`/api/assets/${partner.logo}`}
                      alt={`Logo ${partner.name}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-[var(--reino-green-e)] mb-1 group-hover:text-[var(--reino-orange)] transition-colors duration-300">
                    {partner.name}
                  </h4>
                  <span className="inline-block px-2 py-1 bg-[var(--reino-yellow)] text-[var(--reino-green-e)] text-xs rounded-full font-medium">
                    {partner.category}
                  </span>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--reino-orange)] mx-auto" />
                  </div>
                </a>
              ))}
            </div>
          </div>
          {showNavigation && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Ir para o slide ${idx + 1}`}
                  className={`w-3 h-3 rounded-full border-2 border-[var(--reino-orange)] transition ${currentPage === idx ? 'bg-[var(--reino-orange)]' : 'bg-white'}`}
                  onClick={() => goTo(idx)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="text-center mt-6 sm:mt-8">
          <a
            href="/contact"
            className="inline-flex items-center text-[var(--reino-orange)] hover:text-[var(--reino-orange-hover)] font-medium text-sm sm:text-base transition-colors duration-300 group"
          >
            Quer se tornar nosso parceiro?
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}