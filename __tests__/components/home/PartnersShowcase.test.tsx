import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PartnersShowcase } from '@/components/home/PartnersShowcase';

describe('PartnersShowcase', () => {
  const partners = [
    { id: '1', name: 'P1', category: 'Cat', website: 'a.com', logo: '1.png' },
    { id: '2', name: 'P2', category: 'Cat', website: 'b.com', logo: '2.png' },
    { id: '3', name: 'P3', category: 'Cat', website: 'c.com', logo: '3.png' },
    { id: '4', name: 'P4', category: 'Cat', website: 'd.com', logo: '4.png' },
    { id: '5', name: 'P5', category: 'Cat', website: 'e.com', logo: '5.png' },
  ];

  it('fetches and displays partners', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: partners }),
    });

    render(<PartnersShowcase />);
    expect(screen.getByText(/carregando parceiros/i)).toBeInTheDocument();
    expect(await screen.findByText('P1')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('/api/home/partners');
  });

  it('handles fetch error', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });
    render(<PartnersShowcase />);
    expect(await screen.findByText(/erro ao carregar parceiros/i)).toBeInTheDocument();
  });

  it('navigates slides', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: partners }),
    });
    render(<PartnersShowcase />);
    await screen.findByText('P1');
    const next = screen.getByRole('button', { name: /próximo/i });
    fireEvent.click(next);
    expect(screen.getByRole('button', { name: /anterior/i })).not.toBeDisabled();
  });
});
