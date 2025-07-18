import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  testimony: string;
  name: string;
  age?: number;
  project?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  projectMap: Record<string, string>;
}

const getSlidesToShow = () => {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth < 640) return 1; // sm
  if (window.innerWidth < 1024) return 2; // md
  return 3; // lg+
};

export default function TestimonialsCarousel({ testimonials, projectMap }: TestimonialsCarouselProps) {
  // Não renderiza nada se não houver depoimentos
  if (!testimonials || testimonials.length === 0) return null;

  const [currentPage, setCurrentPage] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(testimonials.length / slidesToShow));

  const getPageTestimonials = () => {
    const start = currentPage * slidesToShow;
    return testimonials.slice(start, start + slidesToShow);
  };

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const goTo = (idx: number) => {
    setCurrentPage(Math.max(0, Math.min(idx, totalPages - 1)));
  };

  const next = () => goTo(currentPage + 1);
  const prev = () => goTo(currentPage - 1);

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prev();
    if (diff < -50) next();
    touchStartX.current = null;
  };

  // Se só existe um depoimento, não mostra setas nem dots
  const showNavigation = testimonials.length > slidesToShow;

  return (
    <div className="relative px-2 sm:px-6 lg:px-12" style={{ overflow: 'visible' }}>
      {/* Setas */}
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
      {/* Slides */}
      <div
        className="overflow-visible"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex justify-center gap-4 transition-all duration-500">
          {getPageTestimonials().map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-1 min-w-0 max-w-md"
              style={{ display: 'flex' }}
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg card-hover h-full flex flex-col justify-between animate-slide-up w-full" style={{ minHeight: 220 }}>
                <div>
                  <div className="text-4xl text-[var(--reino-orange)] mb-2 font-bold">“</div>
                  <div className="text-gray-600 leading-relaxed mb-4">
                    {testimonial.testimony}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-[var(--reino-green-e)]">
                    {testimonial.name}
                    {testimonial.age ? `, ${testimonial.age} anos` : ''}
                  </div>
                  <div className="text-sm text-[var(--reino-orange)]">
                    {testimonial.project ? projectMap[testimonial.project] : ''}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
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
  );
} 