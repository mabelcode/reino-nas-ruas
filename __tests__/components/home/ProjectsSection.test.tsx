import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectsSection } from '@/components/home/ProjectsSection';

describe('ProjectsSection', () => {
  it('shows three projects', () => {
    render(<ProjectsSection />);
    const projects = screen.getAllByRole('heading', { level: 3 });
    expect(projects).toHaveLength(3);
  });

  it('links each project correctly', () => {
    render(<ProjectsSection />);
    const links = screen.getAllByRole('link', { name: /saiba mais/i });
    expect(links).toHaveLength(3);
    links.forEach((link) => expect(link.getAttribute('href')).toMatch(/#\w+/));
  });

  it('filters only ongoing projects', () => {
    const { useProjectsStore } = require('@/stores/projects-store');
    useProjectsStore.setState({
      projects: [
        { id: '1', title: 'A', description: 'd', keywords: [], status: 'Concluído' },
        { id: '2', title: 'B', description: 'd', keywords: [], status: 'Em andamento' },
      ],
      loading: false,
    });
    render(<ProjectsSection />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1);
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.queryByText('A')).not.toBeInTheDocument();
  });
});
