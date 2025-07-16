'use client';

import { Target, Eye, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface About {
  mission: string;
  vision: string;
  values: string;
}

export function MissionSection() {
  const [about, setAbout] = useState<About | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch('/api/about');
        if (res.ok) {
          const data = await res.json();
          setAbout(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchAbout();
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[var(--reino-green-e)] mb-4">
            Nossa Essência
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Conheça os pilares que fundamentam nosso trabalho e nos guiam na missão de transformar vidas através do amor e da dedicação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
            style={{ animationDelay: '0s' }}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 text-[var(--reino-orange)] bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <Target className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--reino-green-e)] mb-3 sm:mb-4">
              Missão
            </h3>
            {about && (
              <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {about.mission}
              </div>
            )}
          </div>

          <div
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 text-[var(--reino-green-c)] bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <Eye className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--reino-green-e)] mb-3 sm:mb-4">
              Visão
            </h3>
            {about && (
              <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {about.vision}
              </div>
            )}
          </div>

          <div
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 text-[var(--reino-yellow)] bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--reino-green-e)] mb-3 sm:mb-4">
              Valores
            </h3>
            {about && (
              <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {about.values}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}