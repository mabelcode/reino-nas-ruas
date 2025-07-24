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

  it('dispatches custom event when volunteer button clicked', () => {
    const handler = jest.fn();
    window.addEventListener('openVolunteerModal', handler);
    render(<DonationCTA />);
    fireEvent.click(screen.getByRole('button', { name: /seja voluntário/i }));
    expect(handler).toHaveBeenCalled();
    window.removeEventListener('openVolunteerModal', handler);
  });
});
