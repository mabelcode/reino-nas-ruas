'use client';

import { Users, Calendar, Trophy, Heart } from 'lucide-react';
import { useInfo } from '@/hooks/use-info';
import { useProjectStats } from '@/hooks/use-project-stats';

export function StatsSection() {
  const info = useInfo();
  const { totalKids, activeProjects } = useProjectStats();
  const impactYears = new Date().getFullYear() - (info.founded_year ?? new Date().getFullYear());
  const stats = [
    {
      icon: Users,
      number: String(totalKids),
      label: 'Crianças e Adolescentes Atendidos',
      color: 'text-[var(--reino-orange)]'
    },
    {
      icon: Calendar,
      number: String(impactYears),
      label: "Anos de Atividade",
      color: "text-[var(--reino-green-c)]"
    },
    {
      icon: Trophy,
      number: String(activeProjects),
      label: "Projetos Ativos",
      color: "text-[var(--reino-yellow)]"
    },
    {
      icon: Heart,
      number: "100%",
      label: "Amor e Dedicação",
      color: "text-[var(--reino-green-e)]"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--reino-green-e)] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
            Nosso Impacto
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Números que refletem nosso compromisso com a transformação social e o desenvolvimento de nossas crianças e adolescentes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`text-center animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-300 px-2">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}