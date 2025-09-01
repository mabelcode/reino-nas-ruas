import { create } from 'zustand';

export interface DonateInfo {
  id: string;
  pix: string;
  suggested_values: string[];
}

export const fallbackDonate: DonateInfo = {
  id: 'fallback',
  pix: '00.000.000/0000-00',
  suggested_values: ['30', '50', '100', '250', '500', '1000'],
};

interface DonateState {
  donate: DonateInfo | null;
  loading: boolean;
  fetchDonate: () => void;
}

export const useDonateStore = create<DonateState>((set) => ({
  donate: fallbackDonate,
  loading: false,
  fetchDonate() {
    // Dados estáticos - sem necessidade de fetch
    set({ donate: fallbackDonate, loading: false });
  },
}));
