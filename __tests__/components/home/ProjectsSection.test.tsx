import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectsSection } from '@/components/home/ProjectsSection';

describe('ProjectsSection', () => {
  it('shows three projects', () => {
    render(<ProjectsSection />);
    const projects = screen.getAllByRole('heading', { level: 3 });
    expect(projects).toHaveLength(3);
  });
});
