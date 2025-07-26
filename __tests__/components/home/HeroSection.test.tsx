import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeroSection } from '@/components/home/HeroSection';
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
  founded_year: 2010,
};
const mockStats = {
  totalKids: 10,
  totalYoung: 20,
  totalAdult: 30,
  totalElderly: 40,
  totalPeople: 1234,
  activeProjects: 5,
};
const fallbackInfo = {
  email: '',
  phone: '',
  cnpj: '',
  street: '',
  number: 0,
  neighborhood: '',
  city: '',
  state: '',
  zipcode: '',
  email_2: '',
  phone_2: '',
  working_days_1: '',
  working_days_2: '',
  working_days_3: '',
  founded_year: 0,
};
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

describe('HeroSection', () => {
  beforeEach(() => {
    (useInfoHook.useInfo as jest.Mock).mockReturnValue(mockInfo);
    (useProjectStatsHook.useProjectStats as jest.Mock).mockReturnValue(mockStats);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o heading principal e os botões', async () => {
    await act(async () => {
      render(<HeroSection />);
    });
    expect(screen.getByRole('heading', { name: /transformando/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /faça uma doação/i })).toHaveAttribute('href', '/donate');
    expect(screen.getByRole('link', { name: /conheça nossa história/i })).toHaveAttribute('href', '/about');
  });

  it('exibe os cards de estatísticas com valores corretos', async () => {
    await act(async () => {
      render(<HeroSection />);
    });
    expect(screen.getByText('1234+')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    // 2024 - 2010 = 14
    expect(screen.getByText(String(new Date().getFullYear() - 2010))).toBeInTheDocument();
  });

  it('exibe textos de acessibilidade e alt nas imagens', async () => {
    await act(async () => {
      render(<HeroSection />);
    });
    const img = screen.getByAltText(/crianças sorrindo/i);
    expect(img).toBeInTheDocument();
  });

  it('exibe indicador de scroll', async () => {
    await act(async () => {
      render(<HeroSection />);
    });
    // Verifica se existe um elemento com a animação bounce (indicador de scroll)
    const scrollIndicator = document.querySelector('.animate-bounce');
    expect(scrollIndicator).toBeInTheDocument();
  });

  it('renderiza corretamente com dados de fallback', async () => {
    (useInfoHook.useInfo as jest.Mock).mockReturnValue(fallbackInfo);
    (useProjectStatsHook.useProjectStats as jest.Mock).mockReturnValue(fallbackStats);
    await act(async () => {
      render(<HeroSection />);
    });
    expect(screen.getByText('0+')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('mantém responsividade dos elementos principais', async () => {
    await act(async () => {
      render(<HeroSection />);
    });
    // Simula tela pequena
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));
    expect(screen.getByRole('heading', { name: /transformando/i })).toBeVisible();
  });

  it('possui links navegáveis e botões acessíveis', async () => {
    await act(async () => {
      render(<HeroSection />);
    });
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAccessibleName();
    });
  });

  it('não quebra se hooks retornarem dados incompletos', async () => {
    (useInfoHook.useInfo as jest.Mock).mockReturnValue({ ...fallbackInfo });
    (useProjectStatsHook.useProjectStats as jest.Mock).mockReturnValue({ ...fallbackStats });
    await act(async () => {
      expect(() => render(<HeroSection />)).not.toThrow();
    });
  });
});
