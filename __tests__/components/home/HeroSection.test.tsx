import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeroSection } from '@/components/home/HeroSection';

describe('HeroSection', () => {
  it('renders main heading and buttons', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { name: /transformando/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /faça uma doação/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /conheça nossa história/i })).toBeInTheDocument();
  });
});
