'use client';

import { useState } from 'react';
import {
  Download,
  BarChart3,
  FileText,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
} from 'lucide-react';
import { CertificationsCarousel } from '@/components/transparency/CertificationsCarousel';

interface FinancialYear {
  id: string;
  amount_received: number;
  amount_invested: number;
  amount_beneficiaries: number;
  amount_events: number;
  year: number;
  projetcs: number;
  infrastructure: number;
  administration: number;
}

interface FinancialReport {
  id: string;
  title: string;
  type: string;
  date: string;
  file: {
    id: string;
    filesize: string;
    filename: string;
  };
}

export default function TransparencyPage() {
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState<string>('2021');

  // Dados estáticos baseados nos prints fornecidos
  const financialYears: FinancialYear[] = [
    {
      id: '1',
      amount_received: 100000,
      amount_invested: 99000,
      amount_beneficiaries: 300,
      amount_events: 25,
      year: 2021,
      projetcs: 50000,
      infrastructure: 20000,
      administration: 19000,
    },
    {
      id: '2',
      amount_received: 300000,
      amount_invested: 280000,
      amount_beneficiaries: 500,
      amount_events: 40,
      year: 2022,
      projetcs: 100000,
      infrastructure: 50000,
      administration: 50000,
    },
    {
      id: '3',
      amount_received: 400000,
      amount_invested: 380000,
      amount_beneficiaries: 300,
      amount_events: 30,
      year: 2023,
      projetcs: 200000,
      infrastructure: 100000,
      administration: 100000,
    },
    {
      id: '4',
      amount_received: 450000,
      amount_invested: 400000,
      amount_beneficiaries: 700,
      amount_events: 70,
      year: 2024,
      projetcs: 300000,
      infrastructure: 50000,
      administration: 50000,
    },
    {
      id: '5',
      amount_received: 600000,
      amount_invested: 550000,
      amount_beneficiaries: 1000,
      amount_events: 50,
      year: 2025,
      projetcs: 400000,
      infrastructure: 75000,
      administration: 75000,
    },
  ];

  const reports: FinancialReport[] = [
    {
      id: '1',
      title: 'Relatório Mensal - Julho 2025',
      type: 'MONTHLY',
      date: '2025-07-30',
      file: {
        id: 'julho-2025',
        filesize: '5632',
        filename: 'relatorio-julho-2025.pdf'
      }
    },
    {
      id: '2',
      title: 'Relatório Mensal - Maio 2025',
      type: 'MONTHLY',
      date: '2025-05-30',
      file: {
        id: 'maio-2025',
        filesize: '1434',
        filename: 'relatorio-maio-2025.pdf'
      }
    },
    {
      id: '3',
      title: 'Relatório Mensal - Abril 2025',
      type: 'MONTHLY',
      date: '2025-04-29',
      file: {
        id: 'abril-2025',
        filesize: '5632',
        filename: 'relatorio-abril-2025.pdf'
      }
    },
    {
      id: '4',
      title: 'Relatório Mensal - Janeiro 2025',
      type: 'MONTHLY',
      date: '2025-01-30',
      file: {
        id: 'janeiro-2025',
        filesize: '1434',
        filename: 'relatorio-janeiro-2025.pdf'
      }
    },
    {
      id: '5',
      title: 'Relatório Mensal - Novembro 2024',
      type: 'MONTHLY',
      date: '2024-11-29',
      file: {
        id: 'novembro-2024',
        filesize: '5632',
        filename: 'relatorio-novembro-2024.pdf'
      }
    },
    {
      id: '6',
      title: 'Relatório Mensal - Março 2024',
      type: 'MONTHLY',
      date: '2024-03-30',
      file: {
        id: 'marco-2024',
        filesize: '1434',
        filename: 'relatorio-marco-2024.pdf'
      }
    },
  ];

  // Ordenar anos naturalmente (crescente) e criar opções
  const yearOptions = financialYears
    .map((y) => y.year.toString())
    .sort((a, b) => parseInt(a) - parseInt(b)); // Ordenar por ano crescente

  // Configuração da paginação
  const itemsPerPage = 4;
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = reports.slice(startIndex, endIndex);

  const selectedData = financialYears.find(
    (fy) => fy.year.toString() === selectedYear,
  );
  const financialData = selectedData ?? financialYears[0];

  // Calcular percentuais baseados no total investido
  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const projectsPercentage = financialData ? calculatePercentage(financialData.projetcs, financialData.amount_invested) : 0;
  const infrastructurePercentage = financialData ? calculatePercentage(financialData.infrastructure, financialData.amount_invested) : 0;
  const administrationPercentage = financialData ? calculatePercentage(financialData.administration, financialData.amount_invested) : 0;

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

  const handleDownload = (fileId: string, title: string) => {
    try {
      setIsDownloading(fileId);
      
      // Link direto para o arquivo exemplo
      const fileUrl = '/assets/files/Exemplo_Movimentacoes.xlsx';
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = `${title}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
      alert('Erro ao baixar o arquivo. Tente novamente.');
    } finally {
      setIsDownloading(null);
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
                {yearOptions.map((year) => {
                  const isSelected = selectedYear === year;
                  return (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${isSelected
                        ? 'bg-[var(--reino-orange)] text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resumo Financeiro */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
                <DollarSign className="w-10 h-10 text-[var(--reino-green-c)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--reino-green-e)] mb-1">
                  {financialData ? formatCurrency(financialData.amount_received) : 'R$ 0,00'}
                </div>
                <div className="text-sm text-gray-600">Total Recebido</div>
              </div>

              <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
                <TrendingUp className="w-10 h-10 text-[var(--reino-orange)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--reino-green-e)] mb-1">
                  {financialData ? formatCurrency(financialData.amount_invested) : 'R$ 0,00'}
                </div>
                <div className="text-sm text-gray-600">Total Investido</div>
              </div>

              <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
                <Users className="w-10 h-10 text-[var(--reino-yellow)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--reino-green-e)] mb-1">
                  {financialData ? financialData.amount_beneficiaries + '+' : '0+'}
                </div>
                <div className="text-sm text-gray-600">Beneficiários</div>
              </div>

              <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
                <Calendar className="w-10 h-10 text-[var(--reino-green-e)] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--reino-green-e)] mb-1">
                  {financialData ? financialData.amount_events : 0}
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
                    {financialData ? formatCurrency(financialData.projetcs) : 'R$ 0,00'}
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
                    {financialData ? formatCurrency(financialData.infrastructure) : 'R$ 0,00'}
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
                    {financialData ? formatCurrency(financialData.administration) : 'R$ 0,00'}
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
                    className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${currentPage === page
                      ? 'bg-[var(--reino-orange)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
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
            <CertificationsCarousel />
          </div>
        </section>
      </div>
    </>
  );
}