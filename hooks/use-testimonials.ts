'use client';

import { useEffect } from 'react';
import { useTestimonialsStore, fallbackTestimonials } from '@/stores/testimonials-store';

export function useTestimonials() {
  const testimonials = useTestimonialsStore((state) => state.testimonials);
  const fetchTestimonials = useTestimonialsStore((state) => state.fetchTestimonials);

  useEffect(() => {
    if (!testimonials.length) {
      fetchTestimonials();
    }
  }, [testimonials.length, fetchTestimonials]);

  return testimonials.length ? testimonials : fallbackTestimonials;
}
