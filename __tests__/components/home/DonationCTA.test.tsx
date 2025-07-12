import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DonationCTA } from '@/components/home/DonationCTA';

describe('DonationCTA', () => {
  it('has donation and volunteer actions', () => {
    render(<DonationCTA />);
    expect(screen.getByRole('link', { name: /doar agora/i })).toHaveAttribute('href', '/donate');
    const button = screen.getByRole('button', { name: /seja voluntário/i });
    fireEvent.click(button);
    // Event dispatch should not throw
  });
});
