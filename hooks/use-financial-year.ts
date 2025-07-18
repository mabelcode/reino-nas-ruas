'use client';

import { useEffect } from 'react';
import { useFinancialYearStore, fallbackFinancialYears } from '@/stores/financial-year-store';

export function useFinancialYears() {
  const years = useFinancialYearStore((state) => state.years);
  const fetchYears = useFinancialYearStore((state) => state.fetchYears);

  useEffect(() => {
    if (!years.length) {
      fetchYears();
    }
  }, [years.length, fetchYears]);

  return years.length ? years : fallbackFinancialYears;
}
