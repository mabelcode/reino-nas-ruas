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

  it('dot navigation works', () => {
    Object.defineProperty(window, 'innerWidth', { value: 700, writable: true });
    render(<TestimonialsCarousel testimonials={testimonials} projectMap={map} />);
    const dots = screen.getAllByRole('button', { name: /ir para o slide/i });
    fireEvent.click(dots[1]);
    expect(screen.getByText('t3')).toBeInTheDocument();
    expect(screen.queryByText('t1')).not.toBeInTheDocument();
  });

  it('hides navigation with one testimonial', () => {
    render(
      <TestimonialsCarousel testimonials={[testimonials[0]]} projectMap={map} />
    );
    expect(screen.queryByRole('button', { name: /próximo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /ir para o slide/i })).not.toBeInTheDocument();
  });

  it('disables previous arrow on first page', () => {
    render(<TestimonialsCarousel testimonials={testimonials} projectMap={map} />);
    expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled();
  });

  it('hides navigation when slides match width', () => {
    Object.defineProperty(window, 'innerWidth', { value: 700, writable: true });
    render(<TestimonialsCarousel testimonials={testimonials.slice(0, 2)} projectMap={map} />);
    expect(screen.queryByRole('button', { name: /próximo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /ir para o slide/i })).not.toBeInTheDocument();
  });
});
