import { create } from 'zustand';

export interface FinancialYear {
  id: string;
  amount_received: number;
  amount_invested: number;
  amount_beneficiaries: number;
  amount_events: number;
  observations?: string | null;
  year: number;
  projetcs: number;
  infrastructure: number;
  administration: number;
}

export const fallbackFinancialYears: FinancialYear[] = [
  {
    id: '1997da43-609b-498a-9947-cf59989b60f2',
    amount_received: 450000,
    amount_invested: 400000,
    amount_beneficiaries: 700,
    amount_events: 70,
    observations: null,
    year: 2024,
    projetcs: 300000,
    infrastructure: 50000,
    administration: 50000,
  },
];

interface FinancialYearState {
  years: FinancialYear[];
  loading: boolean;
  fetchYears: () => void;
}

export const useFinancialYearStore = create<FinancialYearState>((set) => ({
  years: fallbackFinancialYears,
  loading: false,
  fetchYears() {
    // Dados estáticos - sem necessidade de fetch
    set({ years: fallbackFinancialYears, loading: false });
  },
}));
