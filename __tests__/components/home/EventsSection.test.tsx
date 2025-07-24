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
});
