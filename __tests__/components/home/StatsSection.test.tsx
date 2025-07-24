import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('StatsSection', () => {
  it('renders four stats cards', () => {
    const { StatsSection } = require('@/components/home/StatsSection');
    render(<StatsSection />);
    const numbers = screen.getAllByText(/\+|%|^\d/);
    expect(numbers.length).toBeGreaterThanOrEqual(4);
  });

  it('uses values from stores', () => {
    const { useInfoStore, fallbackInfo } = require('@/stores/info-store');
    const { useProjectsStore } = require('@/stores/projects-store');
    useInfoStore.setState({ info: { ...fallbackInfo, founded_year: 2020 } });
    useProjectsStore.setState({
      projects: [
        { id: '1', title: 'P1', description: '', keywords: [], kids: 5, young: 5, adult: 0, elderly: 0, status: 'Em andamento' },
      ],
      loading: false,
    });
    const { StatsSection } = require('@/components/home/StatsSection');
    render(<StatsSection />);
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(String(new Date().getFullYear() - 2020))).toBeInTheDocument();
  });
});
