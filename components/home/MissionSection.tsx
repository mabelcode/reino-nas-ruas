'use client';

import { Target, Eye, Heart } from 'lucide-react';

export function MissionSection() {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Promover a transformação social de crianças e adolescentes em situação de vulnerabilidade através de atividades educativas, esportivas e culturais, desenvolvendo seu potencial e construindo um futuro melhor.",
      color: "text-[var(--reino-orange)]"
    },
    {
      icon: Eye,
      title: "Visão",
      description: "Ser reconhecida como uma organização de referência na promoção da inclusão social e desenvolvimento integral de jovens, criando uma sociedade mais justa e igualitária.",
      color: "text-[var(--reino-green-c)]"
    },
    {
      icon: Heart,
      title: "Valores",
      description: "Amor, respeito, inclusão, transparência, compromisso social e desenvolvimento humano. Acreditamos no poder transformador da educação e do esporte como ferramentas de mudança.",
      color: "text-[var(--reino-yellow)]"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
          {values.map((value, index) => (
            <div 
              key={value.title}
              className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 ${value.color} bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6`}>
                <value.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--reino-green-e)] mb-3 sm:mb-4">
                {value.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}