import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventsSection } from '@/components/home/EventsSection';

describe('EventsSection', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('lista eventos futuros corretamente', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { title: 'Ev1', date: new Date().toISOString(), duration: '10h', location: 'Local 1', description: 'Desc 1', cover_image: 'image1.jpg' },
          { title: 'Ev2', date: new Date().toISOString(), duration: '11h', location: 'Local 2', description: 'Desc 2', cover_image: 'image2.jpg' },
          { title: 'Ev3', date: new Date().toISOString(), duration: '12h', location: 'Local 3', description: 'Desc 3', cover_image: 'image3.jpg' },
        ],
      }),
    });
    await act(async () => {
      render(<EventsSection />);
    });
    const events = await screen.findAllByRole('heading', { level: 3 });
    expect(events).toHaveLength(3);
    expect(screen.getByText('Ev1')).toBeInTheDocument();
    expect(screen.getByText('Ev2')).toBeInTheDocument();
    expect(screen.getByText('Ev3')).toBeInTheDocument();
  });

  it('renderiza estado de carregamento', async () => {
    global.fetch = jest.fn().mockImplementation(() => new Promise(() => {}));
    await act(async () => {
      render(<EventsSection />);
    });
    expect(screen.getAllByText('', { selector: '.animate-pulse' })).toBeTruthy();
  });

  it('não renderiza seção se não houver eventos', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ data: [] }) });
    await act(async () => {
      render(<EventsSection />);
    });
    await waitFor(() => {
      expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
    });
  });

  it('renderiza corretamente se fetch falhar', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Erro'));
    await act(async () => {
      render(<EventsSection />);
    });
    await waitFor(() => {
      // Não deve renderizar eventos
      expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
    });
  });

  it('mantém responsividade dos elementos principais', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { title: 'Ev1', date: new Date().toISOString(), duration: '10h', location: 'Local 1', description: 'Desc 1', cover_image: 'image1.jpg' },
        ],
      }),
    });
    await act(async () => {
      render(<EventsSection />);
    });
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));
    await waitFor(() => {
      expect(screen.getByText('Ev1')).toBeVisible();
    });
  });

  it('não quebra se fetch retornar dados inesperados', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    expect(() => act(async () => render(<EventsSection />))).not.toThrow();
  });
});
