import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectsPagination } from '@/components/home/ProjectsPagination';
import { Users } from 'lucide-react';

describe('ProjectsPagination', () => {
  const programs = [
    { id: 'p1', title: 'P1', description: 'd', details: [], participants: 1, duration: '1m', icon: Users },
    { id: 'p2', title: 'P2', description: 'd', details: [], participants: 1, duration: '1m', icon: Users },
    { id: 'p3', title: 'P3', description: 'd', details: [], participants: 1, duration: '1m', icon: Users },
    { id: 'p4', title: 'P4', description: 'd', details: [], participants: 1, duration: '1m', icon: Users },
    { id: 'p5', title: 'P5', description: 'd', details: [], participants: 1, duration: '1m', icon: Users },
  ];

  it('shows programs paginated', () => {
    render(<ProjectsPagination programs={programs} />);
    expect(screen.getByText('P1')).toBeInTheDocument();
    const next = screen.getByRole('button', { name: /próxima página/i });
    fireEvent.click(next);
    expect(screen.queryByText('P1')).not.toBeInTheDocument();
    expect(screen.getByText('P5')).toBeInTheDocument();
  });

  it('disables prev on first page and hides next on last', () => {
    render(<ProjectsPagination programs={programs} />);
    const prev = screen.getByLabelText(/página anterior/i);
    expect(prev).toHaveClass('invisible');
    const next = screen.getByRole('button', { name: /próxima página/i });
    fireEvent.click(next);
    expect(screen.queryByRole('button', { name: /próxima página/i })).not.toBeInTheDocument();
    expect(prev).not.toHaveClass('invisible');
  });

  it('omits navigation when single page', () => {
    render(<ProjectsPagination programs={programs.slice(0, 3)} />);
    expect(screen.queryByLabelText(/página anterior/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /próxima página/i })).not.toBeInTheDocument();
  });
});
