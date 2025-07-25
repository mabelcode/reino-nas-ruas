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

  it('renders without about text on fetch error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('oops'));
    render(<MissionSection />);
    expect(screen.queryByText('oops')).not.toBeInTheDocument();
    // Wait for effect to complete
    await screen.findAllByRole('heading', { level: 3 });
    expect(screen.queryByText('M')).not.toBeInTheDocument();
  });

  it('only fetches once on rerender', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { mission: 'M', vision: 'V', values: 'X' } }),
    });
    global.fetch = fetchMock;
    const { rerender } = render(<MissionSection />);
    await screen.findByText('M');
    rerender(<MissionSection />);
    await screen.findByText('M');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
