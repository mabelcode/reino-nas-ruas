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
});
