import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FeaturedActivitiesSection } from '@/components/home/FeaturedActivitiesSection';

describe('FeaturedActivitiesSection', () => {
  it('renders four activities', () => {
    render(<FeaturedActivitiesSection />);
    const activities = screen.getAllByRole('heading', { level: 3 });
    expect(activities).toHaveLength(4);
  });
});
