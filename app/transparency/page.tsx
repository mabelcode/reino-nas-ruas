'use client';

import { useEffect, useState } from 'react';
import {
  Download,
  BarChart3,
  FileText,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Loader2,
  CalendarClock,
  Handshake,
  FileBarChart,
  HeartHandshake,
  Award,
  UsersRound,
  SearchCheck,
} from 'lucide-react';
import { useFinancialYears } from '@/hooks/use-financial-year';
import { useFinancialReports } from '@/hooks/use-financial-reports';

export default function TransparencyPage() {
  const financialYears = useFinancialYears();
  const { reports, loading: reportsLoading } = useFinancialReports();
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const yearOptions = financialYears
    .map((y) => y.year.toString())
    .sort((a, b) => parseInt(b) - parseInt(a)); // Ordenar por ano decrescente
  const [selectedYear, setSelectedYear] = useState(yearOptions[0] ?? '');

  // Configuração da paginação
  const itemsPerPage = 4;
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = reports.slice(startIndex, endIndex);

  useEffect(() => {
    if (!selectedYear && yearOptions.length) {
      setSelectedYear(yearOptions[0]);
    }
  }, [yearOptions, selectedYear]);

  // Resetar página quando os relatórios mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [reports.length]);

  const selectedData = financialYears.find(
    (fy) => fy.year.toString() === selectedYear,
  );
  const financialData = selectedData ?? financialYears[0];

  // Calcular percentuais baseados no total investido
  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const projectsPercentage = calculatePercentage(financialData.projetcs, financialData.amount_invested);
  const infrastructurePercentage = calculatePercentage(financialData.infrastructure, financialData.amount_invested);
  const administrationPercentage = calculatePercentage(financialData.administration, financialData.amount_invested);

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

  const formatFileSize = (bytes: string) => {
    const size = parseInt(bytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDownload = async (fileId: string, title: string) => {
    try {
      setIsDownloading(fileId);
      setGlobalLoading(true);

      const response = await fetch(`/api/assets/${fileId}`);
      
      if (!response.ok) {
        throw new Error('Falha ao baixar arquivo');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
      alert('Erro ao baixar o arquivo. Tente novamente.');
    } finally {
      setIsDownloading(null);
      setGlobalLoading(false);
    }
  };

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case 'MONTHLY':
        return 'Relatório Mensal';
      case 'ANNUAL':
        return 'Relatório Anual';
      case 'QUARTERLY':
        return 'Relatório Trimestral';
      default:
        return 'Relatório';
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave para o topo da seção de relatórios
    const reportsSection = document.getElementById('reports-section');
    if (reportsSection) {
      reportsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <title>TRANSPARÊNCIA | Reino nas Ruas</title>
      <div className="pt-16 sm:pt-18 lg:pt-20">
        {/* Loading Overlay */}
        {globalLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--reino-orange)] mb-4" />
              <p className="text-gray-600">Baixando arquivo...</p>
            </div>
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
                {yearOptions.map((year) => (
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
                  {formatCurrency(financialData.amount_received)}
                </div>
                <div className="text-sm text-gray-600">Total Recebido</div>
              </div>

              <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
                <TrendingUp className="w-10 h-10 text-[var(--reino-orange)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--reino-green-e)] mb-1">
                  {formatCurrency(financialData.amount_invested)}
                </div>
                <div className="text-sm text-gray-600">Total Investido</div>
              </div>

              <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
                <Users className="w-10 h-10 text-[var(--reino-yellow)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--reino-green-e)] mb-1">
                  {financialData.amount_beneficiaries}+
                </div>
                <div className="text-sm text-gray-600">Beneficiários</div>
              </div>

              <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
                <Calendar className="w-10 h-10 text-[var(--reino-green-e)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--reino-green-e)] mb-1">
                  {financialData.amount_events}
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
                    <span className="text-white font-bold text-lg">{projectsPercentage}%</span>
                  </div>
                  <h4 className="font-semibold text-[var(--reino-green-e)] mb-2">Projetos Diretos</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {formatCurrency(financialData.projetcs)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Atividades educativas, esportivas e culturais
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 bg-[var(--reino-green-c)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{infrastructurePercentage}%</span>
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
                    <span className="text-white font-bold text-lg">{administrationPercentage}%</span>
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

        {/* Relatórios para Download */}
        <section id="reports-section" className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
                Relatórios Detalhados
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Baixe nossos relatórios completos para uma análise detalhada de nossas atividades e prestação de contas.
              </p>
            </div>

            {reportsLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--reino-orange)]" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {currentReports.map((report, index) => (
                    <div
                      key={report.id}
                      className={`bg-gray-50 rounded-3xl p-6 shadow-lg card-hover animate-slide-up`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <FileText className="w-10 h-10 text-[var(--reino-orange)] mr-3" />
                          <div>
                            <h3 className="text-lg font-bold text-[var(--reino-green-e)]">{report.title}</h3>
                            <p className="text-sm text-gray-600">{getReportTypeLabel(report.type)}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{formatFileSize(report.file.filesize)}</span>
                      </div>

                      <div className="text-sm text-gray-600 mb-4">
                        <span>{formatDate(report.date)}</span>
                      </div>

                      <button 
                        onClick={() => handleDownload(report.file.id, report.title)}
                        disabled={isDownloading === report.file.id}
                        className="w-full bg-[var(--reino-orange)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--reino-orange-hover)] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDownloading === report.file.id ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Baixando...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Baixar Relatório
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-[var(--reino-orange)] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
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
              <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center card-hover">
                <div className="w-16 h-16 bg-[var(--reino-yellow)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-[var(--reino-green-e)]" />
                </div>
                <h3 className="text-xl font-bold mb-2">CNPJ Ativo</h3>
                <p className="text-gray-300 text-sm">
                  Organização devidamente registrada e em conformidade com a legislação brasileira.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center card-hover">
                <div className="w-16 h-16 bg-[var(--reino-green-c)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarClock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Mais de X anos de atuação</h3>
                <p className="text-gray-300 text-sm">
                  Trabalhando com dedicação e amor desde [ano]. Impacto constante e reconhecido.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center card-hover">
                <div className="w-16 h-16 bg-[var(--reino-orange)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Parcerias com instituições</h3>
                <p className="text-gray-300 text-sm">
                  Atuamos com igrejas, escolas, empresas e voluntários da região.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center card-hover">
                <div className="w-16 h-16 bg-[var(--reino-yellow)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileBarChart className="w-8 h-8 text-[var(--reino-green-e)]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Prestação de contas anual</h3>
                <p className="text-gray-300 text-sm">
                  Relatórios financeiros e de impacto abertos à comunidade.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center card-hover">
                <div className="w-16 h-16 bg-[var(--reino-green-c)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartHandshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Equipe totalmente voluntária</h3>
                <p className="text-gray-300 text-sm">
                  Cada ação é fruto da doação de tempo e talento dos nossos voluntários.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center card-hover">
                <div className="w-16 h-16 bg-[var(--reino-orange)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Apoio da comunidade local</h3>
                <p className="text-gray-300 text-sm">
                  Elogios e reconhecimento constantes de moradores e líderes locais.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center card-hover">
                <div className="w-16 h-16 bg-[var(--reino-green-c)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersRound className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">+X pessoas impactadas</h3>
                <p className="text-gray-300 text-sm">
                  Crianças, famílias e comunidades alcançadas com amor e dignidade.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center card-hover">
                <div className="w-16 h-16 bg-[var(--reino-yellow)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchCheck className="w-8 h-8 text-[var(--reino-green-e)]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Presença em plataformas sociais</h3>
                <p className="text-gray-300 text-sm">
                  Projetos publicados em sites como Atados, Prosas e outros.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}