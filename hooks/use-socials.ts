'use client';

import { useEffect } from 'react';
import { useSocialsStore, fallbackSocials } from '@/stores/socials-store';

export function useSocials() {
  const socials = useSocialsStore((state) => state.socials);
  const fetchSocials = useSocialsStore((state) => state.fetchSocials);

  useEffect(() => {
    if (!socials.length) {
      fetchSocials();
    }
  }, [socials.length, fetchSocials]);

  return socials.length ? socials : fallbackSocials;
}
