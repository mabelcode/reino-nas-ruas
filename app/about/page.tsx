'use client';

import { Award, Users, Target, Calendar, Star } from 'lucide-react';
import { useInfo } from '@/hooks/use-info';

export default function AboutPage() {
  const info = useInfo();
  const team = [
    {
      name: "Maria Santos",
      role: "Fundadora e Diretora",
      bio: `Assistente social com 15 anos de experiência em projetos sociais. Fundou a Reino nas Ruas em ${info.founded_year} com o sonho de transformar vidas.`,
      image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "João Silva",
      role: "Coordenador Esportivo",
      bio: "Faixa preta de Jiu-Jitsu e educador físico. Responsável por coordenar todas as atividades esportivas da organização.",
      image: "https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Ana Costa",
      role: "Coordenadora Pedagógica",
      bio: "Pedagoga especializada em educação social. Desenvolve e acompanha todos os programas educacionais da Reino nas Ruas.",
      image: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  const awards = [
    {
      year: "2023",
      title: "Prêmio Transformação Social",
      organization: "Prefeitura de São Paulo",
      description: "Reconhecimento pelo impacto social na comunidade"
    },
    {
      year: "2022",
      title: "Melhor Projeto Esportivo",
      organization: "Governo do Estado de SP",
      description: "Destaque na categoria esporte e inclusão social"
    },
    {
      year: "2021",
      title: "Organização do Ano",
      organization: "Conselho Municipal dos Direitos da Criança",
      description: "Premiação por excelência no atendimento"
    }
  ];

  return (
    <div className="pt-20">
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
              <img 
                src="https://images.pexels.com/photos/8613320/pexels-photo-8613320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Início da Reino nas Ruas" 
                className="rounded-3xl shadow-lg"
              />
            </div>
            <div className="animate-slide-in-right">
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-6">
                Como Tudo Começou
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A Associação Reino nas Ruas nasceu em {info.founded_year} do sonho de Maria Santos, uma assistente social que trabalhava em comunidades vulneráveis de São Paulo. Ela percebeu que muitas crianças e adolescentes precisavam de um espaço seguro para se desenvolver e descobrir seus talentos.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                O que começou como um pequeno grupo de 10 crianças em uma quadra emprestada, hoje se transformou em uma organização que atende mais de 500 jovens em diversos projetos educacionais, esportivos e culturais.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--reino-orange)]">{info.founded_year}</div>
                  <div className="text-sm text-gray-600">Fundação</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--reino-green-c)]">500+</div>
                  <div className="text-sm text-gray-600">Jovens atendidos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--reino-yellow)]">15</div>
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
              <p className="text-gray-600 leading-relaxed">
                Promover a transformação social de crianças e adolescentes em situação de vulnerabilidade através de atividades educativas, esportivas e culturais, desenvolvendo seu potencial humano e construindo um futuro melhor para todos.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg card-hover text-center">
              <Star className="w-12 h-12 text-[var(--reino-green-c)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[var(--reino-green-e)] mb-4">Visão</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser reconhecida como uma organização de referência na promoção da inclusão social e desenvolvimento integral de jovens, contribuindo para a construção de uma sociedade mais justa e igualitária.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg card-hover text-center">
              <Users className="w-12 h-12 text-[var(--reino-yellow)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[var(--reino-green-e)] mb-4">Valores</h3>
              <p className="text-gray-600 leading-relaxed">
                Amor, respeito, inclusão, transparência, compromisso social e desenvolvimento humano. Acreditamos no poder transformador da educação e do esporte como ferramentas de mudança social.
              </p>
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
                key={award.title}
                className={`bg-linear-to-br from-[var(--reino-orange)] to-[var(--reino-yellow)] text-white rounded-3xl p-6 card-hover animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Award className="w-12 h-12 mb-4" />
                <div className="text-lg font-bold mb-2">{award.year}</div>
                <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                <p className="text-sm opacity-90 mb-2">{award.organization}</p>
                <p className="text-sm opacity-80">{award.description}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={member.name}
                className={`bg-white rounded-3xl overflow-hidden shadow-lg card-hover animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-square relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--reino-green-e)] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[var(--reino-orange)] font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}