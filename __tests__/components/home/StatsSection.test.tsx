import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StatsSection } from '@/components/home/StatsSection';

describe('StatsSection', () => {
  it('renders four stats cards', () => {
    render(<StatsSection />);
    const numbers = screen.getAllByText(/\+|%|^\d/);
    expect(numbers.length).toBeGreaterThanOrEqual(4);
  });
});
