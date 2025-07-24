import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MissionSection } from '@/components/home/MissionSection';

describe('MissionSection', () => {
  it('displays three core values', () => {
    render(<MissionSection />);
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(3);
  });

  it('fetches mission data and renders it', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { mission: 'M', vision: 'V', values: 'X' } }),
    });
    render(<MissionSection />);
    expect(await screen.findByText('M')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('/api/about');
  });
});
