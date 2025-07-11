'use client';

import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export function DonationCTA() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FE6100] to-[#FFDB42] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="animate-fade-in">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-white" />
            <h2 className="heading-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
              Faça Parte da Transformação
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-4xl mx-auto px-4 leading-relaxed">
              Sua doação tem o poder de transformar vidas. Com apenas R$ 30, você pode proporcionar um mês de atividades educativas e esportivas para uma criança. Juntos, podemos construir um futuro melhor!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-4">
              <Link href="/donate" className="w-full sm:w-auto bg-white text-[#FE6100] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg text-base sm:text-lg inline-flex items-center justify-center">
                Doar Agora via PIX
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <button 
                onClick={() => {
                  const event = new CustomEvent('openVolunteerModal');
                  window.dispatchEvent(event);
                }}
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-[#FE6100] transition-all duration-300 hover:scale-105 text-base sm:text-lg"
              >
                Seja Voluntário
              </button>
            </div>
            
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto px-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold mb-1">R$ 30</div>
                <div className="text-xs sm:text-sm opacity-90">1 mês de atividades</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold mb-1">R$ 100</div>
                <div className="text-xs sm:text-sm opacity-90">Material esportivo</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold mb-1">R$ 500</div>
                <div className="text-xs sm:text-sm opacity-90">Evento para 50 crianças</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}