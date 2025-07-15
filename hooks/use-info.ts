'use client';

import { useEffect } from 'react';
import { useInfoStore, fallbackInfo } from '@/stores/info-store';

export function useInfo() {
  const info = useInfoStore((state) => state.info);
  const fetchInfo = useInfoStore((state) => state.fetchInfo);

  useEffect(() => {
    if (!info) {
      fetchInfo();
    }
  }, [info, fetchInfo]);

  return info ?? fallbackInfo;
}
