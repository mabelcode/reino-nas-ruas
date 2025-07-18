'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  FileText,
  CalendarClock,
  Handshake,
  FileBarChart,
  HeartHandshake,
  Award,
  UsersRound,
  SearchCheck,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';

interface RecognitionCard {
  icon: LucideIcon;
  iconBg: string;
  iconColor?: string;
  title: string;
  description: string;
}

const recognitions: RecognitionCard[] = [
  {
    icon: FileText,
    iconBg: 'bg-[var(--reino-yellow)]',
    iconColor: 'text-[var(--reino-green-e)]',
    title: 'CNPJ Ativo',
    description:
      'Organiza\u00e7\u00e3o devidamente registrada e em conformidade com a legisla\u00e7\u00e3o brasileira.',
  },
  {
    icon: CalendarClock,
    iconBg: 'bg-[var(--reino-green-c)]',
    iconColor: 'text-white',
    title: 'Mais de X anos de atua\u00e7\u00e3o',
    description:
      'Trabalhando com dedica\u00e7\u00e3o e amor desde [ano]. Impacto constante e reconhecido.',
  },
  {
    icon: Handshake,
    iconBg: 'bg-[var(--reino-orange)]',
    iconColor: 'text-white',
    title: 'Parcerias com institui\u00e7\u00f5es',
    description: 'Atuamos com igrejas, escolas, empresas e volunt\u00e1rios da regi\u00e3o.',
  },
  {
    icon: FileBarChart,
    iconBg: 'bg-[var(--reino-yellow)]',
    iconColor: 'text-[var(--reino-green-e)]',
    title: 'Presta\u00e7\u00e3o de contas anual',
    description: 'Relat\u00f3rios financeiros e de impacto abertos \u00e0 comunidade.',
  },
  {
    icon: HeartHandshake,
    iconBg: 'bg-[var(--reino-green-c)]',
    iconColor: 'text-white',
    title: 'Equipe totalmente volunt\u00e1ria',
    description:
      'Cada a\u00e7\u00e3o \u00e9 fruto da doa\u00e7\u00e3o de tempo e talento dos nossos volunt\u00e1rios.',
  },
  {
    icon: Award,
    iconBg: 'bg-[var(--reino-orange)]',
    iconColor: 'text-white',
    title: 'Apoio da comunidade local',
    description: 'Elogios e reconhecimento constantes de moradores e l\u00edderes locais.',
  },
  {
    icon: UsersRound,
    iconBg: 'bg-[var(--reino-green-c)]',
    iconColor: 'text-white',
    title: '+X pessoas impactadas',
    description: 'Crian\u00e7as, fam\u00edlias e comunidades alcan\u00e7adas com amor e dignidade.',
  },
  {
    icon: SearchCheck,
    iconBg: 'bg-[var(--reino-yellow)]',
    iconColor: 'text-[var(--reino-green-e)]',
    title: 'Presen\u00e7a em plataformas sociais',
    description: 'Projetos publicados em sites como Atados, Prosas e outros.',
  },
];

function getSlidesToShow() {
  if (typeof window === 'undefined') return 1;
  return window.innerWidth < 640 ? 1 : 3;
}

export default function RecognitionsCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(recognitions.length / slidesToShow));

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalPages]);

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const getPageItems = () => {
    const start = currentPage * slidesToShow;
    return recognitions.slice(start, start + slidesToShow);
  };

  const goTo = (idx: number) => setCurrentPage(Math.max(0, Math.min(idx, totalPages - 1)));
  const next = () => goTo(currentPage + 1);
  const prev = () => goTo(currentPage - 1);

  const onTouchStart = (e: React.TouchEvent) => {
    stopAutoPlay();
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prev();
    if (diff < -50) next();
    touchStartX.current = null;
  };

  const showNavigation = recognitions.length > slidesToShow;

  return (
    <div className="relative px-2 sm:px-6 lg:px-12" style={{ overflow: 'visible' }}>
      {showNavigation && (
        <>
          <button
            aria-label="Anterior"
            onClick={() => {
              stopAutoPlay();
              prev();
            }}
            disabled={currentPage === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition disabled:opacity-30 disabled:pointer-events-none"
            style={{ marginLeft: '-24px' }}
          >
            <ChevronLeft className="w-6 h-6 text-[var(--reino-orange)]" />
          </button>
          <button
            aria-label="Pr\u00f3ximo"
            onClick={() => {
              stopAutoPlay();
              next();
            }}
            disabled={currentPage === totalPages - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition disabled:opacity-30 disabled:pointer-events-none"
            style={{ marginRight: '-24px' }}
          >
            <ChevronRight className="w-6 h-6 text-[var(--reino-orange)]" />
          </button>
        </>
      )}
      <div className="overflow-visible" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="flex justify-center gap-4 transition-all duration-500">
          {getPageItems().map((item, index) => {
            const isCenter = slidesToShow === 3 ? index === 1 : true;
            return (
              <div
                key={item.title}
                className={`flex-1 min-w-0 max-w-xs transition-transform ${isCenter ? 'scale-100 z-10' : 'scale-90 opacity-80'}`}
                style={{ display: 'flex' }}
              >
                <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center card-hover w-full">
                  <div className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`w-8 h-8 ${item.iconColor || ''}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
