'use client';

import { useEffect } from 'react';
import { useDonateStore, fallbackDonate } from '@/stores/donate-store';

export function useDonate() {
  const donate = useDonateStore((state) => state.donate);
  const fetchDonate = useDonateStore((state) => state.fetchDonate);

  useEffect(() => {
    if (!donate) {
      fetchDonate();
    }
  }, [donate, fetchDonate]);

  return donate ?? fallbackDonate;
}
