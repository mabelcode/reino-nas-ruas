'use client';

import { useTestimonialsStore } from '@/stores/testimonials-store';

export function useTestimonials() {
  const testimonials = useTestimonialsStore((state) => state.testimonials);
  return testimonials;
}
