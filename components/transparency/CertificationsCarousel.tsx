'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FileText, CalendarClock, Handshake, FileBarChart, HeartHandshake, Award, UsersRound, SearchCheck } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const certifications: Certification[] = [
  {
    id: '1',
    title: 'CNPJ Ativo',
    description: 'Organização devidamente registrada e em conformidade com a legislação brasileira.',
    icon: <FileText className="w-8 h-8" />,
    bgColor: 'bg-[var(--reino-yellow)]',
    iconColor: 'text-[var(--reino-green-e)]'
  },
  {
    id: '2',
    title: 'Mais de 5 anos de atuação',
    description: 'Trabalhando com dedicação e amor desde 2019. Impacto constante e reconhecido.',
    icon: <CalendarClock className="w-8 h-8" />,
    bgColor: 'bg-[var(--reino-green-c)]',
    iconColor: 'text-white'
  },
  {
    id: '3',
    title: 'Parcerias com instituições',
    description: 'Atuamos com igrejas, escolas, empresas e voluntários da região.',
    icon: <Handshake className="w-8 h-8" />,
    bgColor: 'bg-[var(--reino-orange)]',
    iconColor: 'text-white'
  },
  {
    id: '4',
    title: 'Prestação de contas anual',
    description: 'Relatórios financeiros e de impacto abertos à comunidade.',
    icon: <FileBarChart className="w-8 h-8" />,
    bgColor: 'bg-[var(--reino-yellow)]',
    iconColor: 'text-[var(--reino-green-e)]'
  },
  {
    id: '5',
    title: 'Equipe totalmente voluntária',
    description: 'Cada ação é fruto da doação de tempo e talento dos nossos voluntários.',
    icon: <HeartHandshake className="w-8 h-8" />,
    bgColor: 'bg-[var(--reino-green-c)]',
    iconColor: 'text-white'
  },
  {
    id: '6',
    title: 'Apoio da comunidade local',
    description: 'Elogios e reconhecimento constantes de moradores e líderes locais.',
    icon: <Award className="w-8 h-8" />,
    bgColor: 'bg-[var(--reino-orange)]',
    iconColor: 'text-white'
  },
  {
    id: '7',
    title: '+500 pessoas impactadas',
    description: 'Crianças, famílias e comunidades alcançadas com amor e dignidade.',
    icon: <UsersRound className="w-8 h-8" />,
    bgColor: 'bg-[var(--reino-green-c)]',
    iconColor: 'text-white'
  },
  {
    id: '8',
    title: 'Presença em plataformas sociais',
    description: 'Projetos publicados em sites como Atados, Prosas e outros.',
    icon: <SearchCheck className="w-8 h-8" />,
    bgColor: 'bg-[var(--reino-yellow)]',
    iconColor: 'text-[var(--reino-green-e)]'
  }
];

export function CertificationsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalCertifications = certifications.length;

  // Função para determinar quantos slides mostrar baseado no tamanho da tela
  const getSlidesToShow = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width < 768) return 1; // mobile
    if (width < 1024) return 2; // tablet
    return 3; // desktop
  };

  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    setSlidesToShow(getSlidesToShow());
  }, []);

  // Atualizar slidesToShow quando a tela for redimensionada
  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Função para obter os índices dos cards visíveis
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < slidesToShow; i++) {
      const index = (currentIndex + i) % totalCertifications;
      indices.push(index);
    }
    return indices;
  };

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCertifications);
    setIsAutoPlaying(false);
    // Reinicia o autoplay após interação manual
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, [totalCertifications]);

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCertifications) % totalCertifications);
    setIsAutoPlaying(false);
    // Reinicia o autoplay após interação manual
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Reinicia o autoplay após interação manual
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX || 0;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = (e.changedTouches[0]?.clientX || 0) - touchStartX.current;
    if (diff > 50) prev();
    if (diff < -50) next();
    touchStartX.current = null;
  };

  // Autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setTimeout(() => {
        next();
      }, 4000); // 4 segundos por card
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying, next]);

  // Pausa o autoplay quando o mouse está sobre o carrossel
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const visibleIndices = getVisibleIndices();

  return (
    <div
      className="relative px-2 sm:px-6 lg:px-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {/* Carrossel */}
      <div
        className="overflow-visible"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex justify-center items-center gap-4 sm:gap-6 transition-all duration-500">
          {visibleIndices.map((index, position) => {
            const certification = certifications[index];
            if (!certification) return null;
            const isCenter = slidesToShow === 3 ? position === 1 : position === 0; // Card central ou único

            // Função para navegar ao clicar nos cards laterais
            const handleCardClick = () => {
              if (!isCenter) {
                // Se clicou no card da esquerda, vai para o anterior
                if (slidesToShow === 3 && position === 0) {
                  prev();
                }
                // Se clicou no card da direita, vai para o próximo
                else if (slidesToShow === 3 && position === 2) {
                  next();
                }
                // Se clicou em qualquer card lateral (tablet/mobile)
                else {
                  goTo(index);
                }
              }
            };

            return (
              <div
                key={`${certification.id}-${index}`}
                className={`transition-all duration-500 ${isCenter
                    ? 'scale-110 z-20 transform -translate-y-2 sm:-translate-y-4'
                    : 'scale-90 z-10 opacity-70 cursor-pointer hover:scale-95 hover:opacity-90'
                  }`}
                style={{
                  transform: isCenter
                    ? `scale(1.1) translateY(${slidesToShow === 1 ? '0' : '-8px'})`
                    : 'scale(0.9)',
                  filter: isCenter ? 'none' : 'brightness(0.8)',
                }}
                onClick={handleCardClick}
              >
                <div className={`bg-white/10 backdrop-blur-sm rounded-3xl p-4 sm:p-6 text-center card-hover min-w-[250px] sm:min-w-[280px] max-w-[320px] h-[180px] sm:h-[200px] flex flex-col justify-between ${!isCenter ? 'hover:bg-white/15 hover:shadow-lg' : ''
                  }`}>
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${certification.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 ${certification.iconColor}`}>
                    {certification.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{certification.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {certification.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-6 sm:mt-8 gap-1 sm:gap-2">
        {Array.from({ length: totalCertifications }).map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-current={currentIndex === idx ? 'true' : 'false'}
            aria-label={`Ir para certificação ${idx + 1}`}
            className={`w-1 h-1 sm:w-3 sm:h-3 rounded-full border border-white transition-all duration-300 ${currentIndex === idx
                ? 'bg-white scale-100 sm:scale-125'
                : 'bg-transparent hover:bg-white/50'
              }`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
    </div>
  );
} 