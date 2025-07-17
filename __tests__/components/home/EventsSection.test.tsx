import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventsSection } from '@/components/home/EventsSection';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: [
            { title: 'Ev1', date: '2024-01-01', description: '', cover_image: '', duration: '', location: '' },
            { title: 'Ev2', date: '2024-01-02', description: '', cover_image: '', duration: '', location: '' },
            { title: 'Ev3', date: '2024-01-03', description: '', cover_image: '', duration: '', location: '' },
          ],
        }),
    }) as any);
});

describe('EventsSection', () => {
  it('lists upcoming events', async () => {
    render(<EventsSection />);
    await waitFor(() => expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3));
  });
});
