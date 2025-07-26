import { render, screen, waitFor, act } from '@testing-library/react';
import { MissionSection } from '@/components/home/MissionSection';

const mockAbout = {
  mission: 'Missão Teste',
  vision: 'Visão Teste',
  values: 'Valores Teste',
};

describe('MissionSection', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renderiza os três pilares com dados da API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockAbout }),
    });
    await act(async () => {
      render(<MissionSection />);
    });
    await waitFor(() => {
      expect(screen.getByText('Missão')).toBeInTheDocument();
      expect(screen.getByText('Visão')).toBeInTheDocument();
      expect(screen.getByText('Valores')).toBeInTheDocument();
      expect(screen.getByText('Missão Teste')).toBeInTheDocument();
      expect(screen.getByText('Visão Teste')).toBeInTheDocument();
      expect(screen.getByText('Valores Teste')).toBeInTheDocument();
    });
  });

  it('renderiza corretamente se a API retorna erro', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Erro')); // Simula erro
    await act(async () => {
      render(<MissionSection />);
    });
    await waitFor(() => {
      expect(screen.getByText('Missão')).toBeInTheDocument();
      expect(screen.getByText('Visão')).toBeInTheDocument();
      expect(screen.getByText('Valores')).toBeInTheDocument();
    });
  });

  it('renderiza corretamente se a API retorna dados incompletos', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { mission: '', vision: '', values: '' } }),
    });
    await act(async () => {
      render(<MissionSection />);
    });
    await waitFor(() => {
      expect(screen.getByText('Missão')).toBeInTheDocument();
      expect(screen.getByText('Visão')).toBeInTheDocument();
      expect(screen.getByText('Valores')).toBeInTheDocument();
    });
  });

  it('mantém responsividade dos elementos principais', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockAbout }),
    });
    await act(async () => {
      render(<MissionSection />);
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));
    });
    await waitFor(() => {
      expect(screen.getByText('Missão')).toBeVisible();
    });
  });

  it('não quebra se fetch retornar dados inesperados', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    await act(async () => {
      expect(() => render(<MissionSection />)).not.toThrow();
    });
  });
});
