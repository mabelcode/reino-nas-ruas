'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  resume: string;
  cover: string;
}

interface TeamPaginationProps {
  team: TeamMember[];
}

export function TeamPagination({ team }: TeamPaginationProps) {
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const sortedTeam = useMemo(() => [...team].sort((a, b) => a.name.localeCompare(b.name)), [team]);
  const totalPages = Math.ceil(sortedTeam.length / pageSize);
  const pageTeam = sortedTeam.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pageTeam.map((member) => (
          <div key={member.id} className="bg-white rounded-3xl overflow-hidden shadow-lg card-hover animate-slide-up">
            <div className="relative w-full" style={{ height: '340px' }}>
              <Image
                src={`/api/assets/${member.cover}`}
                alt={member.name}
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 640px) 100vw, 400px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[var(--reino-green-e)] mb-2">{member.name}</h3>
              <p className="text-[var(--reino-orange)] font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.resume}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Navegação de páginas */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded-full bg-[var(--reino-orange)] text-white font-bold disabled:opacity-40"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-8 h-8 rounded-full font-bold mx-1 ${currentPage === idx ? 'bg-[var(--reino-green-e)] text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 rounded-full bg-[var(--reino-orange)] text-white font-bold disabled:opacity-40"
          >
            Próxima
          </button>
        </div>
      )}
    </>
  );
} 