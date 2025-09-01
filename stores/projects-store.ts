import { create } from 'zustand';

export interface Project {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  status?: string;
  highlighted?: boolean;
  start_date?: string;
  end_date?: string | null;
  cover_image?: string;
  kids?: number;
  young?: number;
  adult?: number;
  elderly?: number;
}

export const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Projeto Raízes',
    description:
      'Fortalecimento da identidade cultural e autoestima através de atividades artísticas e culturais, conectando os jovens com suas origens.',
    keywords: ['Cultura'],
    status: 'Em andamento',
    start_date: '2024-01-01',
    end_date: null,
    cover_image: '',
    kids: 0,
    young: 45,
    adult: 0,
    elderly: 0,
  },
  {
    id: '2',
    title: 'Futuro Campeão',
    description:
      'Desenvolvimento de habilidades esportivas e valores através do Jiu-Jitsu, promovendo disciplina e respeito entre os participantes.',
    keywords: ['Esporte'],
    status: 'Em andamento',
    start_date: '2024-01-01',
    end_date: null,
    cover_image: '',
    kids: 0,
    young: 60,
    adult: 0,
    elderly: 0,
  },
  {
    id: '3',
    title: 'Mulheres Empreendedoras',
    description:
      'Capacitação profissional e desenvolvimento de habilidades empreendedoras para mulheres da comunidade, incluindo cursos e mentoria.',
    keywords: ['Empreendedorismo'],
    status: 'Em andamento',
    start_date: '2024-01-01',
    end_date: null,
    cover_image: '',
    kids: 0,
    young: 25,
    adult: 0,
    elderly: 0,
  },
];

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  fetchProjects: () => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: fallbackProjects,
  loading: false,
  fetchProjects() {
    // Dados estáticos - sem necessidade de fetch
    set({ projects: fallbackProjects, loading: false });
  },
}));
