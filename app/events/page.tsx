'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { EventModal } from '@/components/events/EventModal';
import { useEventsStore } from '@/stores/events-store';
import { useEvents } from '@/hooks/use-events';

interface EventItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categories: string[];
  image: string;
  views: number;
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

function transformEvent(api: any): EventItem {
  const plain = api.description ? api.description.replace(/<[^>]+>/g, '') : '';
  const today = new Date().toLocaleDateString('sv-SE', {
    timeZone: 'America/Sao_Paulo',
  });
  const future = new Date(api.date) > new Date(today);
  return {
    id: api.id,
    title: api.title,
    excerpt: plain.slice(0, 120) + (plain.length > 120 ? '...' : ''),
    date: api.date,
    category: api.filter_tags?.[0] || 'ALL',
    categories: api.filter_tags ?? [],
    image: api.cover_image ? `/api/assets/${api.cover_image}` : '',
    views: api.views || 0,
    future,
    fullContent: {
      description: api.description || '',
      details: {
        participants: api.participants,
        location: api.location,
        duration: api.duration,
        organizer: api.organizer,
      },
      images: api.gallery?.map((g: any) => `/api/assets/${g.directus_files_id}`) || [],
      videoUrl: api.video_url || undefined,
      highlights: api.highlights || [],
      impact: api.impact || '',
    },
  };
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { events, totalPages } = useEvents(currentPage - 1);
  const updateEvent = useEventsStore((state) => state.updateEvent);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const categoryOptions = [
    { id: 'ACHIEVEMENTS', name: 'Conquistas' },
    { id: 'COMMUNITY', name: 'Comunidade' },
    { id: 'PROJECT', name: 'Projetos' },
    { id: 'PARTNERSHIPS', name: 'Parcerias' },
    { id: 'ALL', name: 'Todas' },
  ];

  const filtered = events.filter((e) =>
    activeCategory === 'ALL' ? true : e.filter_tags?.includes(activeCategory),
  );

  const formattedEvents = filtered.map(transformEvent);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleReadMore = async (apiEvent: any) => {
    const current = transformEvent(apiEvent);
    try {
      const res = await fetch(`/api/events/${apiEvent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ views: (apiEvent.views || 0) + 1 }),
      });
      if (res.ok) {
        const data = await res.json();
        updateEvent(data.data);
        setSelectedItem(transformEvent(data.data));
      } else {
        setSelectedItem(current);
      }
    } catch {
      setSelectedItem(current);
    }
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
                  onClick={() => {
                    setActiveCategory(category.id);
                    setCurrentPage(1);
                  }}
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
              {formattedEvents.map((item, index) => (
                <article
                  key={item.id}
                  className={`bg-white rounded-3xl overflow-hidden shadow-lg card-hover animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video relative">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
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
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {item.views}
                      </div>
                    </div>

                    {item.fullContent && !item.future ? (
                      <button
                        onClick={() => handleReadMore(apiEventFrom(item))}
                        className="w-full bg-gray-100 text-[var(--reino-orange)] font-semibold py-3 rounded-xl hover:bg-[var(--reino-orange)] hover:text-white transition-all duration-300 flex items-center justify-center"
                      >
                        Ler Mais
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

            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                      currentPage === page
                        ? 'bg-[var(--reino-orange)] text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
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

function apiEventFrom(item: EventItem): any {
  return useEventsStore.getState().events.find((e) => e.id === item.id);
}
