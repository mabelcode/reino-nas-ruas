import { create } from 'zustand';

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

interface SocialsState {
  socials: SocialMedia[];
  loading: boolean;
  fetchSocials: () => void;
}

export const useSocialsStore = create<SocialsState>((set) => ({
  socials: fallbackSocials,
  loading: false,
  fetchSocials() {
    // Dados estáticos - sem necessidade de fetch
    set({ socials: fallbackSocials, loading: false });
  },
}));

export { fallbackSocials };
