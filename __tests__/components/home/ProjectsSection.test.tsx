import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Project } from '@/stores/projects-store';

// Mock do hook antes de importar o componente
jest.mock('@/hooks/use-projects', () => ({
  useProjects: jest.fn(),
}));

import { ProjectsSection } from '@/components/home/ProjectsSection';
import { useProjects } from '@/hooks/use-projects';

const mockUseProjects = useProjects as jest.MockedFunction<typeof useProjects>;

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Projeto 1',
    description: 'Descrição do projeto 1',
    keywords: ['Cultura'],
    status: 'Em andamento',
    start_date: '2024-01-01',
    end_date: null,
    cover_image: '',
    kids: 10,
    young: 20,
    adult: 0,
    elderly: 0,
  },
  {
    id: '2',
    title: 'Projeto 2',
    description: 'Descrição do projeto 2',
    keywords: ['Esporte'],
    status: 'Em andamento',
    start_date: '2024-01-01',
    end_date: null,
    cover_image: '',
    kids: 0,
    young: 30,
    adult: 0,
    elderly: 0,
  },
  {
    id: '3',
    title: 'Projeto 3',
    description: 'Descrição do projeto 3',
    keywords: ['Empreendedorismo'],
    status: 'Em andamento',
    start_date: '2024-01-01',
    end_date: null,
    cover_image: '',
    kids: 0,
    young: 0,
    adult: 40,
    elderly: 0,
  },
];
const mockProjectsMenos: Project[] = [
  {
    id: '1',
    title: 'Projeto 1',
    description: 'Descrição do projeto 1',
    keywords: ['Cultura'],
    status: 'Em andamento',
    start_date: '2024-01-01',
    end_date: null,
    cover_image: '',
    kids: 10,
    young: 20,
    adult: 0,
    elderly: 0,
  }
];
const mockProjectsVazio: Project[] = [];
const fallbackProjects: Project[] = [];

describe('ProjectsSection', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza três projetos em destaque', async () => {
    mockUseProjects.mockReturnValue(mockProjects);
    await act(async () => {
      render(<ProjectsSection />);
    });
    expect(screen.getByRole('heading', { name: /projetos em destaque/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(screen.getByText('Projeto 1')).toBeInTheDocument();
    expect(screen.getByText('Projeto 2')).toBeInTheDocument();
    expect(screen.getByText('Projeto 3')).toBeInTheDocument();
  });

  it('renderiza menos de três projetos se houver menos disponíveis', async () => {
    mockUseProjects.mockReturnValue(mockProjectsMenos);
    await act(async () => {
      render(<ProjectsSection />);
    });
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1);
    expect(screen.getByText('Projeto 1')).toBeInTheDocument();
  });

  it('renderiza mensagem e botão para ver todos os projetos', async () => {
    mockUseProjects.mockReturnValue(mockProjects);
    await act(async () => {
      render(<ProjectsSection />);
    });
    expect(screen.getByRole('link', { name: /ver todos os projetos/i })).toHaveAttribute('href', '/projects#programs');
  });

  it('renderiza corretamente com lista de projetos vazia', async () => {
    mockUseProjects.mockReturnValue(mockProjectsVazio);
    await act(async () => {
      render(<ProjectsSection />);
    });
    // Não deve quebrar, mas não renderiza cards
    expect(screen.getByRole('heading', { name: /projetos em destaque/i })).toBeInTheDocument();
  });

  it('mantém responsividade dos elementos principais', async () => {
    mockUseProjects.mockReturnValue(mockProjects);
    await act(async () => {
      render(<ProjectsSection />);
    });
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));
    expect(screen.getByRole('heading', { name: /projetos em destaque/i })).toBeVisible();
  });

  it('não quebra se hook retornar dados incompletos', async () => {
    mockUseProjects.mockReturnValue(fallbackProjects);
    await act(async () => {
      expect(() => render(<ProjectsSection />)).not.toThrow();
    });
  });

  it('links de cada projeto são acessíveis', async () => {
    mockUseProjects.mockReturnValue(mockProjects);
    await act(async () => {
      render(<ProjectsSection />);
    });
    const links = screen.getAllByRole('link', { name: /saiba mais/i });
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
      expect(link).toHaveAccessibleName();
    });
  });
});
