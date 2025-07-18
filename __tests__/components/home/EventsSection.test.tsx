import { render, screen } from '@testing-library/react';
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
});
