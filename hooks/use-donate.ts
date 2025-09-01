'use client';

import { useDonateStore } from '@/stores/donate-store';

export function useDonate() {
  const donate = useDonateStore((state) => state.donate);
  return donate;
}
