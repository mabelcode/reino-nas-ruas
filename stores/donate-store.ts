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
  fetchDonate: () => Promise<void>;
}

export const useDonateStore = create<DonateState>((set) => ({
  donate: null,
  loading: false,
  async fetchDonate() {
    set({ loading: true });
    try {
      const res = await fetch('/api/donate');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      set({ donate: data.data });
    } catch {
      set({ donate: fallbackDonate });
    } finally {
      set({ loading: false });
    }
  },
}));
