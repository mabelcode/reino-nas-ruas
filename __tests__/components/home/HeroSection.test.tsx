import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('HeroSection', () => {
  it('renders main heading and buttons', () => {
    const { HeroSection } = require('@/components/home/HeroSection');
    render(<HeroSection />);
    expect(screen.getByRole('heading', { name: /transformando/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /faça uma doação/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /conheça nossa história/i })).toBeInTheDocument();
  });

  it('shows stats from stores', () => {
    const { useInfoStore, fallbackInfo } = require('@/stores/info-store');
    const { useProjectsStore } = require('@/stores/projects-store');
    useInfoStore.setState({ info: { ...fallbackInfo, founded_year: 2024 } });
    useProjectsStore.setState({
      projects: [
        { id: '1', title: 'P1', description: '', keywords: [], kids: 5, young: 0, adult: 0, elderly: 0, status: 'Em andamento' },
      ],
      loading: false,
    });
    const { HeroSection } = require('@/components/home/HeroSection');
    render(<HeroSection />);
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getAllByText('1')).toHaveLength(2);
    expect(screen.getAllByText(String(new Date().getFullYear() - 2024)).length).toBeGreaterThan(0);
  });
});
