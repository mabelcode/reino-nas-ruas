import { create } from 'zustand';

export interface ONGInfo {
  email: string;
  phone: string;
  cnpj: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  email_2?: string | null;
  phone_2?: string | null;
  working_days_1?: string | null;
  working_days_2?: string | null;
  working_days_3?: string | null;
  founded_year?: number;
}

export const fallbackInfo: ONGInfo = {
  email: 'contato@reinonasruas.org',
  phone: '(11) 99999-9999',
  cnpj: '12.345.678/0001-90',
  street: 'Rua da Esperança',
  number: 123,
  neighborhood: 'Jardim São Paulo',
  city: 'São Paulo',
  state: 'SP',
  zipcode: '01234-567',
  email_2: 'diretoria@reinonasruas.org',
  phone_2: '(11) 3333-4444',
  working_days_1: 'Segunda a Sexta: 8h às 18h',
  working_days_2: 'Sábado: 8h às 12h',
  working_days_3: 'Domingo: Fechado',
  founded_year: 0,
};

interface InfoState {
  info: ONGInfo | null;
  loading: boolean;
  fetchInfo: () => Promise<void>;
}

export const useInfoStore = create<InfoState>((set) => ({
  info: null,
  loading: false,
  async fetchInfo() {
    set({ loading: true });
    try {
      const res = await fetch('/api/info');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      set({ info: data.data });
    } catch {
      set({ info: fallbackInfo });
    } finally {
      set({ loading: false });
    }
  },
}));
