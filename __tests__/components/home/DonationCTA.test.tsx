import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DonationCTA } from '@/components/home/DonationCTA';

describe('DonationCTA', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renderiza título, texto e botões principais', () => {
    render(<DonationCTA />);
    expect(screen.getByRole('heading', { name: /faça parte da transformação/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /doar agora/i })).toHaveAttribute('href', '/donate');
    expect(screen.getByRole('button', { name: /seja voluntário/i })).toBeInTheDocument();
  });

  it('dispara evento customizado ao clicar em "Seja Voluntário"', () => {
    render(<DonationCTA />);
    const button = screen.getByRole('button', { name: /seja voluntário/i });
    const spy = jest.fn();
    window.addEventListener('openVolunteerModal', spy);
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
    window.removeEventListener('openVolunteerModal', spy);
  });

  it('exibe os valores de doação sugeridos', () => {
    render(<DonationCTA />);
    expect(screen.getByText('R$ 30')).toBeInTheDocument();
    expect(screen.getByText('R$ 100')).toBeInTheDocument();
    expect(screen.getByText('R$ 500')).toBeInTheDocument();
    expect(screen.getByText(/1 mês de atividades/i)).toBeInTheDocument();
    expect(screen.getByText(/material esportivo/i)).toBeInTheDocument();
    expect(screen.getByText(/evento para 50 crianças/i)).toBeInTheDocument();
  });

  it('mantém responsividade dos elementos principais', () => {
    render(<DonationCTA />);
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));
    expect(screen.getByRole('heading', { name: /faça parte da transformação/i })).toBeVisible();
  });

  it('links e botões são acessíveis', () => {
    render(<DonationCTA />);
    const link = screen.getByRole('link', { name: /doar agora/i });
    expect(link).toHaveAccessibleName();
    const button = screen.getByRole('button', { name: /seja voluntário/i });
    expect(button).toHaveAccessibleName();
  });
});
