'use client';

import { useState } from 'react';
import { Download, BarChart3, FileText, TrendingUp, DollarSign, Users, Calendar, Eye } from 'lucide-react';

export default function TransparencyPage() {
  const [selectedYear, setSelectedYear] = useState('2024');

  const years = ['2024', '2023', '2022', '2021'];

  const financialData = {
    totalReceived: 450000,
    totalSpent: 425000,
    projects: 315000,
    infrastructure: 85000,
    administration: 25000,
    beneficiaries: 512,
    events: 24
  };

  const reports = [
    {
      title: "Relatório Anual 2024",
      type: "Relatório Completo",
      date: "2024-12-01",
      size: "2.5 MB",
      downloads: 847
    },
    {
      title: "Prestação de Contas - Novembro 2024",
      type: "Relatório Mensal",
      date: "2024-11-30",
      size: "1.2 MB",
      downloads: 423
    },
    {
      title: "Prestação de Contas - Outubro 2024",
      type: "Relatório Mensal",
      date: "2024-10-31",
      size: "1.1 MB",
      downloads: 356
    },
    {
      title: "Prestação de Contas - Setembro 2024",
      type: "Relatório Mensal",
      date: "2024-09-30",
      size: "1.3 MB",
      downloads: 289
    }
  ];

  const projects = [
    {
      name: "Futuro Campeão",
      budget: 120000,
      spent: 118500,
      beneficiaries: 60,
      progress: 98.8
    },
    {
      name: "Educação Transformadora",
      budget: 95000,
      spent: 89200,
      beneficiaries: 80,
      progress: 93.9
    },
    {
      name: "Mulheres Empreendedoras",
      budget: 65000,
      spent: 62300,
      beneficiaries: 25,
      progress: 95.8
    },
    {
      name: "Ritmo e Rima",
      budget: 35000,
      spent: 33800,
      beneficiaries: 35,
      progress: 96.6
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-r from-[#385723] to-[#40AD52] text-white">
        <div className="container-max">
          <div className="text-center">
            <BarChart3 className="w-20 h-20 mx-auto mb-6" />
            <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl mb-6">
              Transparência
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Prestamos contas de cada real recebido. Veja como seus recursos são utilizados para transformar vidas.
            </p>
          </div>
        </div>
      </section>

      {/* Seletor de Ano */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="heading-font text-3xl sm:text-4xl text-[#385723] mb-6">
              Dados Financeiros
            </h2>
            <div className="flex justify-center gap-4 mb-8">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedYear === year
                      ? 'bg-[#FE6100] text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Resumo Financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
              <DollarSign className="w-10 h-10 text-[#40AD52] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#385723] mb-1">
                {formatCurrency(financialData.totalReceived)}
              </div>
              <div className="text-sm text-gray-600">Total Recebido</div>
            </div>

            <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
              <TrendingUp className="w-10 h-10 text-[#FE6100] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#385723] mb-1">
                {formatCurrency(financialData.totalSpent)}
              </div>
              <div className="text-sm text-gray-600">Total Investido</div>
            </div>

            <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
              <Users className="w-10 h-10 text-[#FFDB42] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#385723] mb-1">
                {financialData.beneficiaries}
              </div>
              <div className="text-sm text-gray-600">Beneficiários</div>
            </div>

            <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
              <Calendar className="w-10 h-10 text-[#385723] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#385723] mb-1">
                {financialData.events}
              </div>
              <div className="text-sm text-gray-600">Eventos Realizados</div>
            </div>
          </div>

          {/* Distribuição de Recursos */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#385723] mb-6 text-center">
              Distribuição de Recursos - {selectedYear}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-[#FE6100] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">74%</span>
                </div>
                <h4 className="font-semibold text-[#385723] mb-2">Projetos Diretos</h4>
                <p className="text-gray-600 text-sm mb-2">
                  {formatCurrency(financialData.projects)}
                </p>
                <p className="text-xs text-gray-500">
                  Atividades educativas, esportivas e culturais
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-[#40AD52] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">20%</span>
                </div>
                <h4 className="font-semibold text-[#385723] mb-2">Infraestrutura</h4>
                <p className="text-gray-600 text-sm mb-2">
                  {formatCurrency(financialData.infrastructure)}
                </p>
                <p className="text-xs text-gray-500">
                  Manutenção, equipamentos e materiais
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-[#FFDB42] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">6%</span>
                </div>
                <h4 className="font-semibold text-[#385723] mb-2">Administração</h4>
                <p className="text-gray-600 text-sm mb-2">
                  {formatCurrency(financialData.administration)}
                </p>
                <p className="text-xs text-gray-500">
                  Gestão e operação da organização
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detalhamento por Projeto */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="heading-font text-3xl sm:text-4xl text-[#385723] mb-4">
              Investimento por Projeto
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja como os recursos são distribuídos entre nossos diferentes projetos e programas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.name}
                className={`bg-gray-50 rounded-3xl p-6 animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#385723]">{project.name}</h3>
                  <span className="text-sm text-gray-600">{project.beneficiaries} beneficiários</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Orçamento</span>
                    <span className="font-semibold">{formatCurrency(project.budget)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Executado</span>
                    <span className="font-semibold">{formatCurrency(project.spent)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#FE6100] h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Execução</span>
                    <span className="font-semibold text-[#FE6100]">{project.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relatórios para Download */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="heading-font text-3xl sm:text-4xl text-[#385723] mb-4">
              Relatórios Detalhados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Baixe nossos relatórios completos para uma análise detalhada de nossas atividades e prestação de contas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <div 
                key={report.title}
                className={`bg-white rounded-3xl p-6 shadow-lg card-hover animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="w-10 h-10 text-[#FE6100] mr-3" />
                    <div>
                      <h3 className="text-lg font-bold text-[#385723]">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.type}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{report.size}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{formatDate(report.date)}</span>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {report.downloads} downloads
                  </div>
                </div>
                
                <button className="w-full bg-[#FE6100] text-white py-3 rounded-xl font-semibold hover:bg-[#e55500] transition-colors flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Baixar Relatório
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificações */}
      <section className="section-padding bg-[#385723] text-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="heading-font text-3xl sm:text-4xl mb-6">
              Certificações e Reconhecimentos
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Nossa transparência e eficiência são reconhecidas por diversos órgãos e instituições.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-[#FFDB42] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#385723]" />
              </div>
              <h3 className="text-xl font-bold mb-2">CNPJ Ativo</h3>
              <p className="text-gray-300 text-sm">
                Organização devidamente registrada e em conformidade com a legislação brasileira.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-[#FE6100] rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Auditoria Externa</h3>
              <p className="text-gray-300 text-sm">
                Contas auditadas anualmente por empresa independente especializada.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-[#40AD52] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Selo de Transparência</h3>
              <p className="text-gray-300 text-sm">
                Reconhecimento por boas práticas de governança e prestação de contas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}