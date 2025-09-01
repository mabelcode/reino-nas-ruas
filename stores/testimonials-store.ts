import { create } from 'zustand';

export interface Testimonial {
  id: string;
  name: string;
  age?: number;
  testimony: string;
  project?: string;
}

export const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ana',
    age: 16,
    testimony:
      'O projeto mudou minha vida. Aprendi disciplina no Jiu-Jitsu e hoje sou faixa azul. Meus pais ficam orgulhosos!',
    project: '1',
  },
  {
    id: '2',
    name: 'Carlos',
    age: 14,
    testimony:
      'Através do rap, consegui expressar meus sentimentos e ajudar outros jovens da comunidade.',
    project: '2',
  },
  {
    id: '3',
    name: 'Maria, mãe de participante',
    testimony:
      'Minha filha melhorou muito na escola depois que começou a participar do reforço. Obrigada Reino nas Ruas!',
    project: '3',
  },
];

interface TestimonialsState {
  testimonials: Testimonial[];
  loading: boolean;
  fetchTestimonials: () => void;
}

export const useTestimonialsStore = create<TestimonialsState>((set) => ({
  testimonials: fallbackTestimonials,
  loading: false,
  fetchTestimonials() {
    // Dados estáticos - sem necessidade de fetch
    set({ testimonials: fallbackTestimonials, loading: false });
  },
}));
