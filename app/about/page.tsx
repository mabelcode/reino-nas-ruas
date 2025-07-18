'use client';

import { Award, Users, Target, Star } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useInfo } from '@/hooks/use-info';
import { useProjectStats } from '@/hooks/use-project-stats';

interface AboutData {
  history: string;
  mission: string;
  vision: string;
  values: string;
  about_image?: string;
}

interface Acknowledgment {
  id: string;
  year: number;
  title: string;
  subtitle?: string;
  authority?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  resume: string;
  cover: string;
}

export default function AboutPage() {
  const info = useInfo();
  const { totalPeople, activeProjects } = useProjectStats();

  const [about, setAbout] = useState<AboutData | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [awards, setAwards] = useState<Acknowledgment[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const aboutRes = await fetch('/api/about');
        if (aboutRes.ok) {
          const data = await aboutRes.json();
          setAbout(data.data);
        }

        const ackRes = await fetch('/api/acknowledgments');
        if (ackRes.ok) {
          const data = await ackRes.json();
          setAwards(data.data || []);
        }

        const teamRes = await fetch('/api/team');
        if (teamRes.ok) {
          const data = await teamRes.json();
          setTeam(data.data || []);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <title>SOBRE | Reino nas Ruas</title>
      <div className="pt-16 sm:pt-18 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-linear-to-r from-[var(--reino-green-e)] to-[var(--reino-green-c)] text-white">
          <div className="container-max">
            <div className="text-center">
              <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl mb-6">
                Nossa História
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Conheça a trajetória da Associação Reino nas Ruas e as pessoas que fazem a diferença na vida de centenas de crianças e adolescentes.
              </p>
            </div>
          </div>
        </section>

        {/* História */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                {about?.about_image && (
                  <Image
                    src={`/api/assets/${about.about_image}`}
                    alt="Início da Reino nas Ruas"
                    className="rounded-3xl shadow-lg"
                    width={800}
                    height={600}
                  />
                )}
              </div>
              <div className="animate-slide-in-right">
                <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-6">
                  Como Tudo Começou
                </h2>
                {about && (
                  <div className="text-gray-600 mb-6 leading-relaxed">
                    {about.history}
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--reino-orange)]">{info.founded_year}</div>
                    <div className="text-sm text-gray-600">Fundação</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--reino-green-c)]">{totalPeople}</div>
                    <div className="text-sm text-gray-600">Pessoas impactadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--reino-yellow)]">{activeProjects}</div>
                    <div className="text-sm text-gray-600">Projetos ativos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missão, Visão e Valores */}
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
                Nossos Pilares
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Os valores que nos guiam na missão de transformar vidas e construir futuros.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg card-hover text-center">
                <Target className="w-12 h-12 text-[var(--reino-orange)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[var(--reino-green-e)] mb-4">Missão</h3>
                {about && (
                  <div className="text-gray-600 leading-relaxed">
                    {about.mission}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg card-hover text-center">
                <Star className="w-12 h-12 text-[var(--reino-green-c)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[var(--reino-green-e)] mb-4">Visão</h3>
                {about && (
                  <div className="text-gray-600 leading-relaxed">
                    {about.vision}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg card-hover text-center">
                <Users className="w-12 h-12 text-[var(--reino-yellow)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[var(--reino-green-e)] mb-4">Valores</h3>
                {about && (
                  <div className="text-gray-600 leading-relaxed">
                    {about.values}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Reconhecimentos */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
                Reconhecimentos
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nosso trabalho tem sido reconhecido por diversas instituições e organizações.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <div
                  key={award.id}
                  className={`bg-linear-to-br from-[var(--reino-orange)] to-[var(--reino-yellow)] text-white rounded-3xl p-6 card-hover animate-slide-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Award className="w-12 h-12 mb-4" />
                  <div className="text-lg font-bold mb-2">{award.year}</div>
                  <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                  <p className="text-sm opacity-90 mb-2">{award.authority}</p>
                  <p className="text-sm opacity-80">{award.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nossa Equipe */}
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
                Nossa Equipe
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conheça as pessoas dedicadas que fazem a diferença na vida de nossas crianças e adolescentes.
              </p>
            </div>

            {/* Paginação da equipe */}
            {(() => {
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
            })()}
          </div>
        </section>
      </div>
    </>
  );
}