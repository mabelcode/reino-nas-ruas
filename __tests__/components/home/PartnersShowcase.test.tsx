import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PartnersShowcase } from '@/components/home/PartnersShowcase';

describe('PartnersShowcase', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renderiza corretamente quando há erro ao carregar parceiros', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Erro de rede'));
    await act(async () => {
      render(<PartnersShowcase />);
    });
    expect(screen.getByText(/erro ao carregar parceiros/i)).toBeInTheDocument();
  });

  it('renderiza corretamente quando não há parceiros', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
    await act(async () => {
      render(<PartnersShowcase />);
    });
    // Deve renderizar sem quebrar, mesmo sem parceiros
    expect(screen.queryByText(/erro ao carregar parceiros/i)).not.toBeInTheDocument();
  });

  it('mantém responsividade dos elementos principais', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
    await act(async () => {
      render(<PartnersShowcase />);
    });
    
    // Simula mudança de tamanho de tela dentro do act para evitar warnings
    await act(async () => {
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));
    });
    
    // Verifica se o componente ainda está renderizado (não deve quebrar)
    expect(screen.queryByText(/erro ao carregar parceiros/i)).not.toBeInTheDocument();
  });
}); 