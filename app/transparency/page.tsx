'use client';

import { useState } from 'react';
import { Download, BarChart3, FileText, TrendingUp, DollarSign, Users, Calendar, Eye } from 'lucide-react';
import { useProjectStats } from '@/hooks/use-project-stats';
import { useFinance } from '@/hooks/use-finance';

const categoryGroup: Record<string, 'projects' | 'infrastructure' | 'administration'> = {
  PROJECTS: 'projects',
  SPORTS_EQUIPMENT: 'projects',
  FOOD: 'projects',
  TRANSPORT: 'projects',
  EDUCATIONAL_MATERIALS: 'projects',
  UNIFORMS: 'projects',
  PROMOTION: 'projects',
  EQUIPMENT: 'infrastructure',
  MAINTENANCE_INFRASTRUCTURE: 'infrastructure',
  INFRASTRUCTURE: 'infrastructure',
  INSFRASTRUCTURE: 'infrastructure',
  PROFESSIONAL_FEES: 'administration',
  ADMINISTRATION: 'administration',
  OTHER_EXPENSES: 'administration',
};

export default function TransparencyPage() {
  const [selectedYear, setSelectedYear] = useState('');
  const [projPage, setProjPage] = useState(1);
  const [repPage, setRepPage] = useState(1);
  const [downloading, setDownloading] = useState(false);
  const { totalPeople } = useProjectStats();

  const {
    summary,
    years,
    distribution,
    projects,
    projectsPages,
    reports,
    reportsPages,
    loading,
  } = useFinance(selectedYear, projPage, repPage);

  useEffect(() => {
    if (!selectedYear && years.length) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  const financialData = {
    totalReceived: summary?.[selectedYear]?.total_received ?? 0,
    totalSpent: summary?.[selectedYear]?.total_spent ?? 0,
    projects: 0,
    infrastructure: 0,
    administration: 0,
    beneficiaries: totalPeople,
    events: 0,
  };

  for (const [cat, value] of Object.entries(distribution)) {
    const group = categoryGroup[cat as keyof typeof categoryGroup];
    if (group) {
      financialData[group] += value as number;
    }
  }

  const totalOut = financialData.projects + financialData.infrastructure + financialData.administration;
  const percProjects = totalOut ? (financialData.projects / totalOut) * 100 : 0;
  const percInfra = totalOut ? (financialData.infrastructure / totalOut) * 100 : 0;
  const percAdmin = totalOut ? (financialData.administration / totalOut) * 100 : 0;

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

  const handleDownload = async (report: { fileId: string; title: string }) => {
    setDownloading(true);
    try {
      const res = await fetch(`/api/financial-reports/${report.fileId}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${report.title}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <title>TRANSPARÊNCIA | Reino nas Ruas</title>
      <div className="pt-16 sm:pt-18 lg:pt-20">
        {downloading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl">Baixando...</div>
          </div>
        )}
        {/* Hero Section */}
        <section className="relative py-20 bg-linear-to-r from-[var(--reino-green-e)] to-[var(--reino-green-c)] text-white">
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
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-6">
                Dados Financeiros
              </h2>
              <div className="flex justify-center gap-4 mb-8">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedYear === year
                      ? 'bg-[var(--reino-orange)] text-white shadow-lg'
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
                <DollarSign className="w-10 h-10 text-[var(--reino-green-c)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--reino-green-e)] mb-1">
                  {formatCurrency(financialData.totalReceived)}
                </div>
                <div className="text-sm text-gray-600">Total Recebido</div>
              </div>

              <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
                <TrendingUp className="w-10 h-10 text-[var(--reino-orange)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--reino-green-e)] mb-1">
                  {formatCurrency(financialData.totalSpent)}
                </div>
                <div className="text-sm text-gray-600">Total Investido</div>
              </div>

              <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
                <Users className="w-10 h-10 text-[var(--reino-yellow)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--reino-green-e)] mb-1">
                  {financialData.beneficiaries}
                </div>
                <div className="text-sm text-gray-600">Beneficiários</div>
              </div>

              <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
                <Calendar className="w-10 h-10 text-[var(--reino-green-e)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--reino-green-e)] mb-1">
                  {financialData.events}
                </div>
                <div className="text-sm text-gray-600">Eventos Realizados</div>
              </div>
            </div>

            {/* Distribuição de Recursos */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[var(--reino-green-e)] mb-6 text-center">
                Distribuição de Recursos - {selectedYear}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-[var(--reino-orange)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{percProjects.toFixed(0)}%</span>
                  </div>
                  <h4 className="font-semibold text-[var(--reino-green-e)] mb-2">Projetos Diretos</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {formatCurrency(financialData.projects)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Atividades educativas, esportivas e culturais
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 bg-[var(--reino-green-c)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{percInfra.toFixed(0)}%</span>
                  </div>
                  <h4 className="font-semibold text-[var(--reino-green-e)] mb-2">Infraestrutura</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {formatCurrency(financialData.infrastructure)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Manutenção, equipamentos e materiais
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 bg-[var(--reino-yellow)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{percAdmin.toFixed(0)}%</span>
                  </div>
                  <h4 className="font-semibold text-[var(--reino-green-e)] mb-2">Administração</h4>
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
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
                Investimento por Projeto
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Veja como os recursos são distribuídos entre nossos diferentes projetos e programas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`bg-gray-50 rounded-3xl p-6 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[var(--reino-green-e)]">{project.title}</h3>
                    <span className="text-sm text-gray-600">{formatCurrency(project.received)}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Orçamento</span>
                      <span className="font-semibold">{formatCurrency(project.received)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Executado</span>
                      <span className="font-semibold">{formatCurrency(project.spent)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[var(--reino-orange)] h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${project.received ? (project.spent / project.received) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Execução</span>
                      <span className="font-semibold text-[var(--reino-orange)]">
                        {project.received ? ((project.spent / project.received) * 100).toFixed(1) : '0'}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => setProjPage((p) => Math.max(1, p - 1))}
                disabled={projPage === 1}
                className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setProjPage((p) => Math.min(projectsPages, p + 1))}
                disabled={projPage === projectsPages}
                className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </div>
        </section>

        {/* Relatórios para Download */}
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
                Relatórios Detalhados
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Baixe nossos relatórios completos para uma análise detalhada de nossas atividades e prestação de contas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report, index) => (
                <div
                  key={report.id}
                  className={`bg-white rounded-3xl p-6 shadow-lg card-hover animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <FileText className="w-10 h-10 text-[var(--reino-orange)] mr-3" />
                      <div>
                        <h3 className="text-lg font-bold text-[var(--reino-green-e)]">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.type}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{report.size}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{formatDate(report.date)}</span>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {report.downloads ?? 0} downloads
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(report)}
                    className="w-full bg-[var(--reino-orange)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--reino-orange-hover)] transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Baixar Relatório
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => setRepPage((p) => Math.max(1, p - 1))}
                disabled={repPage === 1}
                className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setRepPage((p) => Math.min(reportsPages, p + 1))}
                disabled={repPage === reportsPages}
                className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </div>
        </section>

        {/* Certificações */}
        <section className="section-padding bg-[var(--reino-green-e)] text-white">
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
                <div className="w-16 h-16 bg-[var(--reino-yellow)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-[var(--reino-green-e)]" />
                </div>
                <h3 className="text-xl font-bold mb-2">CNPJ Ativo</h3>
                <p className="text-gray-300 text-sm">
                  Organização devidamente registrada e em conformidade com a legislação brasileira.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center">
                <div className="w-16 h-16 bg-[var(--reino-orange)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Auditoria Externa</h3>
                <p className="text-gray-300 text-sm">
                  Contas auditadas anualmente por empresa independente especializada.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center">
                <div className="w-16 h-16 bg-[var(--reino-green-c)] rounded-full flex items-center justify-center mx-auto mb-4">
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
    </>
  );
}