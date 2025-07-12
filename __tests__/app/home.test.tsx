import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

describe('Home page', () => {
  it('renders all sections', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /transformando/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /nossa essência/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /nossas atividades/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /projetos em destaque/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /nosso impacto/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /próximos eventos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /seja voluntário/i })).toBeInTheDocument();
  });
});
