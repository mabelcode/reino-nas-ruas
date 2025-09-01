'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { EventModal } from '@/components/events/EventModal';

interface EventItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categories: string[];
  image: string;
  future: boolean;
  fullContent?: {
    description: string;
    details: {
      participants?: number;
      location?: string;
      duration?: string;
      organizer?: string;
    };
    images: string[];
    videoUrl?: string;
    highlights: string[];
    impact?: string;
  };
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados estáticos do evento baseados no print fornecido
  const events: EventItem[] = [
    {
      id: '1',
      title: 'Festival de Talentos 2024 - Um Sucesso Absoluto',
      excerpt: 'Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento...',
      date: '2024-11-29',
      category: 'COMMUNITY',
      categories: ['COMMUNITY', 'PROJECT'],
      image: '/assets/images/events/talent_festival/foto1.webp',
      future: false,
      fullContent: {
        description: 'Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento Evento',
        details: {
          participants: 100,
          location: 'Centro Cultural da Comunidade',
          duration: '5 horas',
          organizer: 'Associação Reino nas Ruas',
        },
        images: [
          '/assets/images/events/talent_festival/foto1.webp',
          '/assets/images/events/talent_festival/foto2.webp',
          '/assets/images/events/talent_festival/foto3.webp',
          '/assets/images/events/talent_festival/foto4.webp',
          '/assets/images/events/talent_festival/foto5.webp',
        ],
        videoUrl: 'https://www.youtube.com/watch?v=iBAC5Xl6OGE&embeds_referring_euri=https%3A%2F%2Freinonasruas.org.br%2F&source_ve_path=MjM4NTE',
        highlights: [
          'Apresentações de rap com letras autorais sobre superação e esperança',
          'Exposição de trabalhos artísticos criados nas oficinas de arte',
          'Participação especial de ex-alunos que hoje são referências na comunidade',
          'Demonstrações de Jiu-Jitsu com técnicas aprendidas durante o ano',
          'Depoimentos emocionantes de pais e responsáveis',
          'Arrecadação de fundos para novos projetos através de venda de produtos artesanais',
        ],
        impact: 'Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto Impacto',
      },
    },
  ];

  const categoryOptions = [
    { id: 'ACHIEVEMENTS', name: 'Conquistas' },
    { id: 'COMMUNITY', name: 'Comunidade' },
    { id: 'PROJECT', name: 'Projetos' },
    { id: 'PARTNERSHIPS', name: 'Parcerias' },
    { id: 'ALL', name: 'Todas' },
  ];

  const filteredEvents = events.filter((event) =>
    activeCategory === 'ALL' ? true : event.categories.includes(activeCategory)
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleReadMore = (event: EventItem) => {
    setSelectedItem(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <title>EVENTOS | Reino nas Ruas</title>
      <div className="pt-16 sm:pt-18 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-linear-to-r from-[var(--reino-green-c)] to-[var(--reino-green-e)] text-white">
          <div className="container-max">
            <div className="text-center">
              <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl mb-6">Eventos</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Confira nossos eventos mais recentes e saiba como participar das próximas ações da Reino nas Ruas.
              </p>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categoryOptions.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-[var(--reino-orange)] text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Grid de Eventos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((item, index) => (
                <article
                  key={item.id}
                  className={`bg-white rounded-3xl overflow-hidden shadow-lg card-hover animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video relative">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover" 
                    />
                    <div className="absolute top-4 left-4 space-x-2">
                      {item.categories.map((cat) => (
                        <span
                          key={cat}
                          className="px-3 py-1 bg-[var(--reino-orange)] text-white text-sm rounded-full capitalize"
                        >
                          {categoryOptions.find((c) => c.id === cat)?.name || cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[var(--reino-green-e)] mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(item.date)}
                      </div>
                    </div>

                    {item.fullContent && !item.future ? (
                      <button
                        onClick={() => handleReadMore(item)}
                        className="w-full bg-gray-100 text-[var(--reino-orange)] font-semibold py-3 rounded-xl hover:bg-[var(--reino-orange)] hover:text-white transition-all duration-300 flex items-center justify-center"
                      >
                        Ver Mais
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-100 text-gray-400 font-semibold py-3 rounded-xl cursor-not-allowed flex items-center justify-center"
                        title="Mais detalhes em breve"
                      >
                        Em breve
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        <EventModal
          key={selectedItem?.id || 'modal'}
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </>
  );
}