'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { EventModal } from '@/components/events/EventModal';

interface EventItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  views: number;
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
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const categories = [
    { id: 'comunidade', name: 'Comunidade' },
    { id: 'conquistas', name: 'Conquistas' },
    { id: 'eventos', name: 'Eventos' },
    { id: 'projetos', name: 'Projetos' },
    { id: 'all', name: 'Todas' }
  ];

  const newsItems: EventItem[] = [
    {
      id: 1,
      title: "Festival de Talentos 2024 - Um Sucesso Absoluto",
      excerpt: "Mais de 200 pessoas prestigiaram as apresentações dos jovens talentos da Reino nas Ruas no Festival de Talentos 2024.",
      date: "2024-12-01",
      category: "eventos",
      image: "https://images.pexels.com/photos/7034369/pexels-photo-7034369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      views: 1247,
      fullContent: {
        description: "O Festival de Talentos 2024 da Associação Reino nas Ruas foi um marco na história da organização. Realizado no Centro Cultural da comunidade, o evento reuniu mais de 200 pessoas entre familiares, amigos, parceiros e membros da comunidade local para prestigiar as apresentações artísticas dos jovens participantes de nossos projetos. Durante três horas de espetáculo, pudemos testemunhar o resultado de meses de dedicação, ensaios e desenvolvimento pessoal de cada criança e adolescente. O evento não foi apenas uma apresentação artística, mas uma verdadeira celebração da transformação social que acontece diariamente em nossa organização.",
        details: {
          participants: 85,
          location: "Centro Cultural da Comunidade",
          duration: "3 horas",
          organizer: "Associação Reino nas Ruas"
        },
        images: [
          "https://images.pexels.com/photos/7034369/pexels-photo-7034369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/8613224/pexels-photo-8613224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/7551677/pexels-photo-7551677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/8613320/pexels-photo-8613320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/7045859/pexels-photo-7045859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        highlights: [
          "Apresentações de rap com letras autorais sobre superação e esperança",
          "Demonstrações de Jiu-Jitsu com técnicas aprendidas durante o ano",
          "Exposição de trabalhos artísticos criados nas oficinas de arte",
          "Depoimentos emocionantes de pais e responsáveis",
          "Participação especial de ex-alunos que hoje são referências na comunidade",
          "Arrecadação de fundos para novos projetos através de venda de produtos artesanais"
        ],
        impact: "O Festival de Talentos 2024 demonstrou o poder transformador de nossos projetos. Vimos jovens que chegaram tímidos e inseguros se apresentarem com confiança e orgulho. Famílias se emocionaram ao ver o crescimento de seus filhos, e a comunidade se uniu em torno de um objetivo comum: apoiar o desenvolvimento integral de nossas crianças e adolescentes. O evento arrecadou R$ 3.500 em doações espontâneas, que serão investidos na compra de novos equipamentos esportivos e materiais didáticos."
      }
    },
    {
      id: 2,
      title: "Novos Uniformes para o Projeto Futuro Campeão",
      excerpt: "Graças às doações recebidas, todos os alunos do projeto de Jiu-Jitsu receberam novos uniformes (kimonos) para treinar.",
      date: "2024-11-25",
      category: "projetos",
      image: "https://images.pexels.com/photos/7045859/pexels-photo-7045859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      views: 892
    },
    {
      id: 3,
      title: "Prêmio Transformação Social 2024",
      excerpt: "A Reino nas Ruas foi reconhecida pela Prefeitura de São Paulo com o Prêmio Transformação Social 2024.",
      date: "2024-11-20",
      category: "conquistas",
      image: "https://images.pexels.com/photos/8613320/pexels-photo-8613320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      views: 1532
    },
    {
      id: 4,
      title: "Formatura do Curso de Empreendedorismo Feminino",
      excerpt: "25 mulheres concluíram o curso de capacitação profissional e empreendedorismo, prontas para transformar suas vidas.",
      date: "2024-11-15",
      category: "projetos",
      image: "https://images.pexels.com/photos/7551677/pexels-photo-7551677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      views: 743
    },
    {
      id: 5,
      title: "Parceria com Escolas da Região",
      excerpt: "Firmamos parceria com 5 escolas da região para expandir nosso programa de reforço escolar e atingir mais crianças.",
      date: "2024-11-10",
      category: "comunidade",
      image: "https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      views: 654
    },
    {
      id: 6,
      title: "Campanha de Natal 2024",
      excerpt: "Nossa campanha de Natal arrecadou mais de 500 brinquedos e cestas básicas para as famílias assistidas.",
      date: "2024-11-05",
      category: "eventos",
      image: "https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      views: 1123
    },
    {
      id: 7,
      title: "Evento Teste Modal Completo",
      excerpt: "Resumo do evento teste para modal.",
      date: "2024-11-30",
      category: "eventos",
      image: "https://images.pexels.com/photos/7034369/pexels-photo-7034369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      views: 321,
      fullContent: {
        description: "Descrição completa do evento teste para modal. Aqui você pode ver todos os campos renderizados corretamente.",
        details: {
          participants: 42,
          location: "Auditório Central",
          duration: "2 horas",
          organizer: "ONG Reino nas Ruas"
        },
        images: [
          "https://images.pexels.com/photos/7034369/pexels-photo-7034369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/8613224/pexels-photo-8613224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        highlights: [
          "Abertura com apresentação musical",
          "Palestra sobre impacto social",
          "Oficina de arte para crianças"
        ],
        impact: "O evento proporcionou integração entre as famílias e arrecadou doações para novos projetos."
      }
    }
  ];

  const filteredNews = activeCategory === 'all'
    ? newsItems
    : newsItems.filter(item => item.category === activeCategory);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleReadMore = (item: EventItem) => {
    console.log('Evento selecionado:', item);
    if (!item.fullContent) return;
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-r from-[var(--reino-green-c)] to-[var(--reino-green-e)] text-white">
        <div className="container-max">
          <div className="text-center">
            <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl mb-6">
              Eventos
            </h1>
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
            {categories.map((category) => (
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
            {paginatedNews.map((item, index) => (
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
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--reino-orange)] text-white text-sm rounded-full capitalize">
                      {categories.find(cat => cat.id === item.category)?.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--reino-green-e)] mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
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
                  
                  {item.fullContent ? (
                    <button 
                      onClick={() => handleReadMore(item)}
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
  );
}