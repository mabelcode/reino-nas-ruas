'use client';

import Image from 'next/image';
import { Calendar, MapPin, Clock } from 'lucide-react';

export function EventsSection() {
  const events = [
    {
      title: 'Festival de Talentos 2024 - Um Sucesso Absoluto',
      date: '29 de novembro',
      time: '5 horas',
      location: 'Centro Cultural da Comunidade',
      description: 'Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Eve...',
      image: '/assets/images/events/talent_festival/foto1.webp'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[var(--reino-green-e)] mb-4">
            Próximos Eventos
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Participe dos nossos eventos e faça parte da transformação social que estamos construindo juntos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event, index) => (
            <div 
              key={event.title}
              className={`bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-video relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <div className="bg-[var(--reino-orange)] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    Eventos
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--reino-green-e)] mb-2 sm:mb-3">
                  {event.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[var(--reino-orange)] shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[var(--reino-orange)] shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[var(--reino-orange)] shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}