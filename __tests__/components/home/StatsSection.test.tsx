import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StatsSection } from '@/components/home/StatsSection';
import * as useInfoHook from '@/hooks/use-info';
import * as useProjectStatsHook from '@/hooks/use-project-stats';

const mockInfo = {
  email: 'contato@reinonasruas.org',
  phone: '(11) 99999-9999',
  cnpj: '12.345.678/0001-90',
  street: 'Rua da Esperança',
  number: 123,
  neighborhood: 'Jardim São Paulo',
  city: 'São Paulo',
  state: 'SP',
  zipcode: '01234-567',
  email_2: 'diretoria@reinonasruas.org',
  phone_2: '(11) 3333-4444',
  working_days_1: 'Segunda a Sexta: 8h às 18h',
  working_days_2: 'Sábado: 8h às 12h',
  working_days_3: 'Domingo: Fechado',
  founded_year: 2015,
};
const mockStats = {
  totalKids: 10,
  totalYoung: 20,
  totalAdult: 30,
  totalElderly: 40,
  totalPeople: 100,
  activeProjects: 3,
};
const fallbackInfo = { ...mockInfo, founded_year: 0 };
const fallbackStats = {
  totalKids: 0,
  totalYoung: 0,
  totalAdult: 0,
  totalElderly: 0,
  totalPeople: 0,
  activeProjects: 0,
};

// Mock dos hooks antes de importar os componentes
jest.mock('@/hooks/use-info', () => ({
  useInfo: jest.fn(),
}));

jest.mock('@/hooks/use-project-stats', () => ({
  useProjectStats: jest.fn(),
}));

describe('StatsSection', () => {
  beforeEach(() => {
    (useInfoHook.useInfo as jest.Mock).mockReturnValue(mockInfo);
    (useProjectStatsHook.useProjectStats as jest.Mock).mockReturnValue(mockStats);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o título e descrição', async () => {
    await act(async () => {
      render(<StatsSection />);
    });
    expect(screen.getByRole('heading', { name: /nosso impacto/i })).toBeInTheDocument();
    expect(screen.getByText(/números que refletem/i)).toBeInTheDocument();
  });

  it('renderiza todos os quatro cards de estatísticas', async () => {
    await act(async () => {
      render(<StatsSection />);
    });
    expect(screen.getByText('100+')).toBeInTheDocument();
    expect(screen.getByText(String(new Date().getFullYear() - 2015))).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('exibe textos de acessibilidade nos ícones', async () => {
    await act(async () => {
      render(<StatsSection />);
    });
    // Os ícones são decorativos, mas os textos devem estar presentes
    expect(screen.getByText('Pessoas Atendidas')).toBeInTheDocument();
    expect(screen.getByText('Anos de Atividade')).toBeInTheDocument();
    expect(screen.getByText('Projetos Ativos')).toBeInTheDocument();
    expect(screen.getByText('Amor e Dedicação')).toBeInTheDocument();
  });

  it('renderiza corretamente com dados de fallback', async () => {
    (useInfoHook.useInfo as jest.Mock).mockReturnValue(fallbackInfo);
    (useProjectStatsHook.useProjectStats as jest.Mock).mockReturnValue(fallbackStats);
    await act(async () => {
      render(<StatsSection />);
    });
    expect(screen.getByText('0+')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('mantém responsividade dos elementos principais', async () => {
    await act(async () => {
      render(<StatsSection />);
    });
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));
    expect(screen.getByRole('heading', { name: /nosso impacto/i })).toBeVisible();
  });

  it('não quebra se hooks retornarem dados incompletos', async () => {
    (useInfoHook.useInfo as jest.Mock).mockReturnValue({ ...fallbackInfo });
    (useProjectStatsHook.useProjectStats as jest.Mock).mockReturnValue({ ...fallbackStats });
    await act(async () => {
      expect(() => render(<StatsSection />)).not.toThrow();
    });
  });
});
