import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventsSection } from '@/components/home/EventsSection';

describe('EventsSection', () => {
  it('lists upcoming events', () => {
    render(<EventsSection />);
    const events = screen.getAllByRole('heading', { level: 3 });
    expect(events).toHaveLength(3);
  });
});
