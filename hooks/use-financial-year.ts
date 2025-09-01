'use client';

import { useFinancialYearStore } from '@/stores/financial-year-store';

export function useFinancialYears() {
  const years = useFinancialYearStore((state) => state.years);
  return years;
}
