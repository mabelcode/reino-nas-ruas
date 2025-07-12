import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MissionSection } from '@/components/home/MissionSection';

describe('MissionSection', () => {
  it('displays three core values', () => {
    render(<MissionSection />);
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(3);
  });
});
