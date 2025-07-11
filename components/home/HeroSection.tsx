'use client';

import Link from 'next/link';
import { ChevronRight, Users, Heart, Target } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/8613320/pexels-photo-8613320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Crianças sorrindo em atividades esportivas" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="heading-font text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 leading-tight">
            <span className="text-[var(--reino-yellow)] block sm:inline">Transformando</span> 
            <span className="block sm:inline"> Vidas</span>
            <br />
            <span className="text-[var(--reino-orange)] block sm:inline">Construindo</span> 
            <span className="block sm:inline"> Futuros</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto font-light leading-relaxed px-2">
            Promovemos transformação social através de educação, esporte e cultura para crianças e adolescentes em situação de vulnerabilidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <Link href="/donate" className="w-full sm:w-auto text-base sm:text-lg bg-[var(--reino-orange)] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[var(--reino-orange-hover)] transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center justify-center">
              Faça uma Doação
              <Heart className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link href="/about" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold bg-white/10 backdrop-blur-xs border-2 border-white text-white hover:bg-white hover:text-[var(--reino-orange)] transition-all duration-300 inline-flex items-center justify-center">
              Conheça Nossa História
              <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="animate-slide-up grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-16 px-2">
          <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-4 sm:p-6 text-center">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--reino-yellow)] mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-[var(--reino-yellow)]">500+</div>
            <div className="text-xs sm:text-sm text-gray-200">Crianças Atendidas</div>
          </div>
          <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-4 sm:p-6 text-center">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--reino-orange)] mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-[var(--reino-orange)]">15</div>
            <div className="text-xs sm:text-sm text-gray-200">Projetos Ativos</div>
          </div>
          <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-4 sm:p-6 text-center">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--reino-green-c)] mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-[var(--reino-green-c)]">8</div>
            <div className="text-xs sm:text-sm text-gray-200">Anos de Impacto</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2"></div>
        </div>
      </div>
    </section>
  );
}