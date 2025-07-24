import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import { Testimonial } from '@/stores/testimonials-store';

describe('TestimonialsCarousel', () => {
  const testimonials: Testimonial[] = [
    { id: '1', name: 'João', testimony: 't1', age: 10, project: 'a' },
    { id: '2', name: 'Maria', testimony: 't2', age: 11, project: 'b' },
    { id: '3', name: 'Pedro', testimony: 't3', age: 12, project: 'c' },
    { id: '4', name: 'Ana', testimony: 't4', age: 13, project: 'd' },
  ];
  const map = { a: 'Proj A', b: 'Proj B', c: 'Proj C', d: 'Proj D' };

  it('shows testimonials and allows navigation', () => {
    render(<TestimonialsCarousel testimonials={testimonials} projectMap={map} />);
    expect(screen.getByText('t1')).toBeInTheDocument();
    const next = screen.getByRole('button', { name: /próximo/i });
    fireEvent.click(next);
    expect(screen.getByRole('button', { name: /anterior/i })).not.toBeDisabled();
  });
});
