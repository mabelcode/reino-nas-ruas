'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Eye, Play, Users, MapPin, Clock } from 'lucide-react';

interface MediaItem {
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

interface MediaModalProps {
  item: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MediaModal({ item, isOpen, onClose }: MediaModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
      setShowVideo(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !item || !item.fullContent) return null;

  const { fullContent } = item;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === fullContent.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? fullContent.images.length - 1 : prev - 1
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs">
      <div className="relative w-full h-full max-w-6xl mx-4 my-4 bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-[var(--reino-orange)] text-white text-sm rounded-full capitalize">
                {item.category}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(item.date)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="w-4 h-4 mr-1" />
                {item.views}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto pb-20">
          <div className="p-4 lg:p-8">
            {/* Title */}
            <h1 className="heading-font text-2xl sm:text-3xl lg:text-4xl text-[var(--reino-green-e)] mb-4 lg:mb-6">
              {item.title}
            </h1>

            {/* Event Details */}
            {fullContent.details && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
                {fullContent.details.participants && (
                  <div className="bg-gray-50 rounded-xl p-3 lg:p-4 text-center">
                    <Users className="w-5 h-5 lg:w-6 lg:h-6 text-[var(--reino-orange)] mx-auto mb-2" />
                    <div className="text-lg lg:text-xl font-bold text-[var(--reino-green-e)]">
                      {fullContent.details.participants}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">Participantes</div>
                  </div>
                )}
                {fullContent.details.location && (
                  <div className="bg-gray-50 rounded-xl p-3 lg:p-4 text-center">
                    <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-[var(--reino-green-c)] mx-auto mb-2" />
                    <div className="text-sm lg:text-base font-semibold text-[var(--reino-green-e)] mb-1">
                      Local
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">{fullContent.details.location}</div>
                  </div>
                )}
                {fullContent.details.duration && (
                  <div className="bg-gray-50 rounded-xl p-3 lg:p-4 text-center">
                    <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-[var(--reino-yellow)] mx-auto mb-2" />
                    <div className="text-sm lg:text-base font-semibold text-[var(--reino-green-e)] mb-1">
                      Duração
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">{fullContent.details.duration}</div>
                  </div>
                )}
                {fullContent.details.organizer && (
                  <div className="bg-gray-50 rounded-xl p-3 lg:p-4 text-center">
                    <div className="text-sm lg:text-base font-semibold text-[var(--reino-green-e)] mb-1">
                      Organização
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">{fullContent.details.organizer}</div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mb-6 lg:mb-8">
              <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                {fullContent.description}
              </p>
            </div>

            {/* Highlights */}
            {fullContent.highlights.length > 0 && (
              <div className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold text-[var(--reino-green-e)] mb-4">
                  Destaques do Evento
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                  {fullContent.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3 bg-gray-50 rounded-xl p-3 lg:p-4">
                      <div className="w-2 h-2 bg-[var(--reino-orange)] rounded-full mt-2 shrink-0"></div>
                      <p className="text-sm lg:text-base text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Impact */}
            {fullContent.impact && (
              <div className="bg-linear-to-r from-[var(--reino-orange)] to-[var(--reino-yellow)] text-white rounded-2xl p-4 lg:p-6 mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold mb-3">
                  Impacto Social
                </h2>
                <p className="text-sm lg:text-base leading-relaxed">
                  {fullContent.impact}
                </p>
              </div>
            )}

            {/* Image Gallery */}
            {fullContent.images.length > 0 && (
              <div className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold text-[var(--reino-green-e)] mb-4">
                  Galeria de Fotos ({fullContent.images.length})
                </h2>
                
                {/* Main Image */}
                <div className="relative aspect-video lg:aspect-16/10 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img 
                    src={fullContent.images[currentImageIndex]} 
                    alt={`Foto ${currentImageIndex + 1} do evento`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {fullContent.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-2 lg:bottom-4 right-2 lg:right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {fullContent.images.length}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {fullContent.images.length > 1 && (
                  <div className="flex space-x-2 lg:space-x-3 overflow-x-auto pb-2">
                    {fullContent.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex 
                            ? 'border-[var(--reino-orange)] scale-105' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Video Section */}
            {fullContent.videoUrl && (
              <div className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold text-[var(--reino-green-e)] mb-4">
                  Vídeo do Evento
                </h2>
                {!showVideo ? (
                  <div 
                    className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => setShowVideo(true)}
                  >
                    <img 
                      src={fullContent.images[0]} 
                      alt="Video thumbnail"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[var(--reino-orange)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 lg:w-10 lg:h-10 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <iframe
                      src={getYouTubeEmbedUrl(fullContent.videoUrl)}
                      title="Video do evento"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}