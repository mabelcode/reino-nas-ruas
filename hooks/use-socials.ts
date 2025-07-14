'use client';

import { useEffect, useState } from 'react';

export interface SocialMedia {
  id: string;
  platform: string;
  url: string;
}

const fallbackSocials: SocialMedia[] = [
  { id: 'fb', platform: 'facebook', url: 'https://facebook.com' },
  { id: 'ig', platform: 'instagram', url: 'https://instagram.com' },
  { id: 'yt', platform: 'youtube', url: 'https://youtube.com' },
  { id: 'ln', platform: 'linkedin', url: 'https://linkedin.com' },
];

export function useSocials() {
  const [socials, setSocials] = useState<SocialMedia[]>([]);

  useEffect(() => {
    async function fetchSocials() {
      try {
        const res = await fetch('/api/socials');
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setSocials(data.data);
      } catch {
        setSocials(fallbackSocials);
      }
    }
    fetchSocials();
  }, []);

  return socials.length ? socials : fallbackSocials;
}
