import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TeamPagination } from '@/components/home/TeamPagination';

describe('TeamPagination', () => {
  const team = [
    { id: '1', name: 'Ana', role: 'Role', resume: 'bio', cover: '1.jpg' },
    { id: '2', name: 'Bia', role: 'Role', resume: 'bio', cover: '2.jpg' },
    { id: '3', name: 'Caio', role: 'Role', resume: 'bio', cover: '3.jpg' },
    { id: '4', name: 'Davi', role: 'Role', resume: 'bio', cover: '4.jpg' },
    { id: '5', name: 'Eva', role: 'Role', resume: 'bio', cover: '5.jpg' },
    { id: '6', name: 'Fernanda', role: 'Role', resume: 'bio', cover: '6.jpg' },
    { id: '7', name: 'Gustavo', role: 'Role', resume: 'bio', cover: '7.jpg' },
  ];

  it('paginates team members', () => {
    render(<TeamPagination team={team} />);
    // 6 members on first page
    expect(screen.getByText('Ana')).toBeInTheDocument();
    expect(screen.queryByText('Gustavo')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByText('Gustavo')).toBeInTheDocument();
  });
});
