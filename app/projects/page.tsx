'use client';

import { Star, ClipboardList } from 'lucide-react';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import { ProjectsPagination } from '@/components/home/ProjectsPagination';

export default function Projects() {
  // Dados estáticos dos depoimentos baseados no print fornecido
  const testimonials = [
    {
      id: '1',
      name: 'Carlos, 14 anos',
      testimony: 'Através do rap, consegui expressar meus sentimentos e ajudar outros jovens da comunidade.',
      project: '4'
    },
    {
      id: '2', 
      name: 'Maria, 45 anos',
      testimony: 'Minha filha melhorou muito na escola depois que começou a participar do reforço. Obrigada Reino nas Ruas!',
      project: '5'
    },
    {
      id: '3',
      name: 'Dona Ivone, 52 anos',
      testimony: 'Voltei a estudar depois de 20 anos. Meus filhos ficaram tão felizes que começaram a me ajudar com os deveres.',
      project: '5'
    }
  ];

  // Dados estáticos dos projetos baseados no print fornecido
  const projects = [
    {
      id: '1',
      title: 'Futebol do futuro',
      description: 'Programa esportivo que promove integração social, disciplina e saúde através da prática do futebol, desenvolvendo valores como trabalho em equipe e fair play.',
      keywords: ['Esporte', 'Futebol', 'Futuro', 'Saúde'],
      participants: 40,
      duration: 'há 6 meses',
      image: '/assets/images/projects/futebol.webp',
      status: 'Em andamento',
      highlighted: true
    },
    {
      id: '2', 
      title: 'Futuro Campeão - Jiu-Jitsu',
      description: 'Programa esportivo que desenvolve disciplina, autoestima e valores através da prática do Jiu-Jitsu.',
      keywords: ['Aulas 3x Por Semana', 'Competições E Eventos', 'Faixas Etárias: 6 a 17 Anos', 'Filosofia E Valores Marciais'],
      participants: 60,
      duration: 'há mais de 1 ano',
      image: '/assets/images/projects/jiujitsu.webp',
      status: 'Em andamento',
      highlighted: true
    },
    {
      id: '3',
      title: 'Mulheres Empreendedoras', 
      description: 'Programa de empoderamento feminino com foco em capacitação profissional e empreendedorismo.',
      keywords: ['Cursos De Capacitação Profissional', 'Mentoria Empresarial', 'Microcrédito E Apoio Financeiro', 'Workshops De Empreendedorismo'],
      participants: 50,
      duration: 'há cerca de 2 anos',
      image: '/assets/images/projects/mulheres.webp',
      status: 'Em andamento',
      highlighted: true
    },
    {
      id: '4',
      title: 'Ritmo e Rima - RAP e Cultura',
      description: 'Desenvolvimento da expressão artística e consciência social através da música e cultura hip-hop.',
      keywords: ['Apresentações Públicas', 'Letras Com Consciência Social', 'Oficinas De Rap E Beatbox', 'Produção Musical'],
      participants: 30,
      duration: 'há 7 meses',
      image: '/assets/images/projects/rap.webp',
      status: 'Em andamento',
      highlighted: false
    },
    {
      id: '5',
      title: 'Educação Transformadora',
      description: 'Programa de reforço escolar e desenvolvimento educacional personalizado.',
      keywords: ['Acompanhamento Pedagógico', 'Desenvolvimento Da Leitura', 'Preparação Para Vestibulares', 'Reforço Em Matemática E Português'],
      participants: 50,
      duration: 'há mais de 1 ano',
      image: '/assets/images/projects/educacao.webp',
      status: 'Em andamento',
      highlighted: true
    }
  ];

  const projectMap = projects.reduce<Record<string, string>>((acc, p) => {
    acc[p.id] = p.title;
    return acc;
  }, {});

  const programs = projects.map((p) => ({
    id: p.id,
    icon: p.highlighted ? Star : ClipboardList,
    title: p.title,
    description: p.description,
    details: p.keywords || [],
    participants: p.participants,
    duration: p.duration,
    image: p.image,
    status: p.status,
  }));


  return (
    <>
      <title>PROJETOS | Reino nas Ruas</title>
      <div className="min-h-screen pt-16 sm:pt-18 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-linear-to-r from-[var(--reino-orange)] to-[var(--reino-yellow)] text-white">
          <div className="container-max">
            <div className="text-center">
              <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl mb-6">
                O que Fazemos
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Nossos programas transformam vidas através da educação, esporte e cultura. Conheça como estamos construindo um futuro melhor para nossa comunidade.
              </p>
            </div>
          </div>
        </section>

        {/* Programas */}
        <section id="programs" className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
                Nossos Programas
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Cada programa é cuidadosamente desenvolvido para atender às necessidades específicas de nossos jovens.
              </p>
            </div>

            <ProjectsPagination programs={programs} />
          </div>
        </section>

        {/* Depoimentos */}
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
                Histórias de Transformação
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Veja como nossos programas têm impactado positivamente a vida de jovens e famílias.
              </p>
            </div>

            <TestimonialsCarousel testimonials={testimonials} projectMap={projectMap} />
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-[var(--reino-green-e)] text-white">
          <div className="container-max text-center">
            <h2 className="heading-font text-3xl sm:text-4xl mb-6">
              Seja Parte da Transformação
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a nós e ajude a criar mais histórias de sucesso. Sua participação pode fazer toda a diferença!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const event = new CustomEvent('openVolunteerModal');
                  window.dispatchEvent(event);
                }}
                className="bg-[var(--reino-orange)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[var(--reino-orange-hover)] transition-all duration-300 hover:scale-105"
              >
                Seja Voluntário
              </button>
              <a
                href="/donate"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--reino-green-e)] transition-all duration-300 hover:scale-105"
              >
                Fazer Doação
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
