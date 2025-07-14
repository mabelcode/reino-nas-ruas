'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function PartnersShowcase() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const res = await fetch('/api/home/partners');
        if (!res.ok) throw new Error('Failed to fetch partners');
        const data = await res.json();
        setPartners(data.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

  if (loading) return <div>Carregando parceiros...</div>;
  if (error) return <div>Erro ao carregar parceiros: {error}</div>;

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="heading-font text-xl sm:text-2xl md:text-3xl text-[var(--reino-green-e)] mb-3">
            Nossos Parceiros e Mantenedores
          </h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Empresas que acreditam em nossa missão e nos apoiam na transformação de vidas.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {partners.map((partner: any, index: number) => (
            <a
              key={partner.id || partner.name}
              href={
                partner.website?.startsWith('http://') || partner.website?.startsWith('https://')
                  ? partner.website
                  : `https://${partner.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                <Image
                  src={`/api/assets/${partner.logo}`}
                  alt={`Logo ${partner.name}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-[var(--reino-green-e)] mb-1 group-hover:text-[var(--reino-orange)] transition-colors duration-300">
                {partner.name}
              </h4>
              <span className="inline-block px-2 py-1 bg-[var(--reino-yellow)] text-[var(--reino-green-e)] text-xs rounded-full font-medium">
                {partner.category}
              </span>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--reino-orange)] mx-auto" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <a
            href="/contact"
            className="inline-flex items-center text-[var(--reino-orange)] hover:text-[var(--reino-orange-hover)] font-medium text-sm sm:text-base transition-colors duration-300 group"
          >
            Quer se tornar nosso parceiro?
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}