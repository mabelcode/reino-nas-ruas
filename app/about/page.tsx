'use client';

import { Award, Users, Target, Star } from 'lucide-react';
import Image from 'next/image';
import { TeamPagination } from '@/components/home/TeamPagination';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  resume: string;
  cover: string;
}

export default function AboutPage() {
  // Dados estáticos baseados no print fornecido
  const aboutData = {
    history: "A Associação Reino nas Ruas nasceu em 2016 do sonho de Jesus Cristo, etc, etc etcetc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc etc. O que começou como um pequeno grupo de 10 crianças em uma quadra emprestada, hoje se transformou em uma organização que atende mais de 500 jovens em diversos projetos educacionais, esportivos e culturais.",
    mission: "Promover a transformação social de crianças e adolescentes em situação de vulnerabilidade através de atividades educativas, esportivas e culturais, desenvolvendo seu potencial humano e construindo um futuro melhor para todos.",
    vision: "Ser reconhecida como uma organização de referência na promoção da inclusão social e desenvolvimento integral de jovens, contribuindo para a construção de uma sociedade mais justa e igualitária.",
    values: "Amor, respeito, inclusão, transparência, compromisso social e desenvolvimento humano. Acreditamos no poder transformador da educação e do esporte como ferramentas de mudança social."
  };

  const stats = {
    foundedYear: 2018,
    totalPeople: 230,
    activeProjects: 5
  };

  const awards = [
    {
      id: "1",
      year: 2022,
      title: "Organização do Ano",
      subtitle: "Serviços Especiais na realização dos eventos do município",
      authority: "Prefeitura Municipal"
    },
    {
      id: "2", 
      year: 2022,
      title: "Melhor Projeto Esportivo",
      subtitle: "Centro de Ensino de Atletismo e Treinamento Esportivo",
      authority: "Secretaria de Esportes"
    },
    {
      id: "3",
      year: 2021,
      title: "Prêmio Transformação Social",
      subtitle: "Fundação Lola Aché",
      authority: "Secretaria de Desenvolvimento Social"
    }
  ];

  const team: TeamMember[] = [
    {
      id: "1",
      name: "Bruna",
      role: "Função Funcao",
      resume: "Bruna Bruna Bruna Bruna Bruna Bruna Bruna Bruna",
      cover: "/assets/images/about/bruna.webp"
    },
    {
      id: "2", 
      name: "Heloisa",
      role: "Funcao",
      resume: "Heloisa Heloisa Heloisa Heloisa Heloisa Heloisa Heloisa",
      cover: "/assets/images/about/heloisa.webp"
    },
    {
      id: "3",
      name: "Jéssica", 
      role: "Função",
      resume: "Jéssica Jéssica Jéssica Jéssica Jéssica Jéssica Jéssica",
      cover: "/assets/images/about/jessica.webp"
    },
    {
      id: "4",
      name: "Mariana",
      role: "Funcao",
      resume: "Mariana Mariana Mariana Mariana Mariana Mariana Mariana",
      cover: "/assets/images/about/mariana.webp"
    },
    {
      id: "5",
      name: "Thiago",
      role: "Funcao Funcao",
      resume: "Thiago Thiago Thiago Thiago Thiago Thiago Thiago Thiago",
      cover: "/assets/images/about/thiago.webp"
    }
  ];

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
                <Image
                  src="/assets/images/about/team.webp"
                  alt="Início da Reino nas Ruas"
                  className="rounded-3xl shadow-lg"
                  width={800}
                  height={600}
                />
              </div>
              <div className="animate-slide-in-right">
                <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-6">
                  Como Tudo Começou
                </h2>
                <div className="text-gray-600 mb-6 leading-relaxed">
                  {aboutData.history}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--reino-orange)]">{stats.foundedYear}</div>
                    <div className="text-sm text-gray-600">Fundação</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--reino-green-c)]">{stats.totalPeople}</div>
                    <div className="text-sm text-gray-600">Pessoas impactadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--reino-yellow)]">{stats.activeProjects}</div>
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
                <div className="text-gray-600 leading-relaxed">
                  {aboutData.mission}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg card-hover text-center">
                <Star className="w-12 h-12 text-[var(--reino-green-c)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[var(--reino-green-e)] mb-4">Visão</h3>
                <div className="text-gray-600 leading-relaxed">
                  {aboutData.vision}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg card-hover text-center">
                <Users className="w-12 h-12 text-[var(--reino-yellow)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[var(--reino-green-e)] mb-4">Valores</h3>
                <div className="text-gray-600 leading-relaxed">
                  {aboutData.values}
                </div>
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

            <TeamPagination team={team} />
          </div>
        </section>
      </div>
    </>
  );
}