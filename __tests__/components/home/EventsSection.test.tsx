import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventsSection } from '@/components/home/EventsSection';

describe('EventsSection', () => {
  it('lists upcoming events', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { title: 'Ev1', date: new Date().toISOString(), duration: '', location: '', description: '', cover_image: '' },
          { title: 'Ev2', date: new Date().toISOString(), duration: '', location: '', description: '', cover_image: '' },
          { title: 'Ev3', date: new Date().toISOString(), duration: '', location: '', description: '', cover_image: '' },
        ],
      }),
    });
    render(<EventsSection />);
    const events = await screen.findAllByRole('heading', { level: 3 });
    expect(events).toHaveLength(3);
  });

  it('renders nothing when API returns empty', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ data: [] }) });
    const { container } = render(<EventsSection />);
    await waitFor(() => expect(container.innerHTML).toBe(''));
  });

  it('handles fetch rejection gracefully', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('fail'));
    const { container } = render(<EventsSection />);
    await waitFor(() => expect(container.innerHTML).toBe(''));
  });

  it('formats and displays event data', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            title: 'Formatação',
            date: '2024-08-15T00:00:00.000Z',
            duration: '2h',
            location: 'Aqui',
            description: '<p>desc</p>',
            cover_image: 'img.png',
          },
        ],
      }),
    });
    render(<EventsSection />);
    expect(await screen.findByText('Formatação')).toBeInTheDocument();
    expect(screen.getByText(/15 de agosto/i)).toBeInTheDocument();
    expect(screen.getByText('2h')).toBeInTheDocument();
    expect(screen.getByText('Aqui')).toBeInTheDocument();
  });
});
