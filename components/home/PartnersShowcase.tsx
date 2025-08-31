'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';

export function PartnersShowcase() {
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => { 
    touchStartX.current = e.touches[0]?.clientX || 0; 
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = (e.changedTouches[0]?.clientX || 0) - touchStartX.current;
    touchStartX.current = null;
  };

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
        
        <div className="flex justify-center">
          <div className="bg-white rounded-xl p-4 sm:p-6 text-center border border-gray-100 animate-slide-up hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
              <Image
                src="/assets/images/logos/mabel-code-logo.png"
                alt="Logo Mabel Code"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-[var(--reino-green-e)] mb-1">
              Mabel Code
            </h4>
            <span className="inline-block px-2 py-1 bg-[var(--reino-yellow)] text-[var(--reino-green-e)] text-xs rounded-full font-medium">
              Parceiro Estratégico
            </span>
          </div>
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