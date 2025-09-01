'use client';

import { useSocialsStore } from '@/stores/socials-store';

export function useSocials() {
  const socials = useSocialsStore((state) => state.socials);
  return socials;
}
