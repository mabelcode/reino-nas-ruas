'use client';

import { useInfoStore } from '@/stores/info-store';

export function useInfo() {
  const info = useInfoStore((state) => state.info);
  return info;
}
