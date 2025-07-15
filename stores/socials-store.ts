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
  fetchSocials: () => Promise<void>;
}

export const useSocialsStore = create<SocialsState>((set) => ({
  socials: [],
  loading: false,
  async fetchSocials() {
    set({ loading: true });
    try {
      const res = await fetch('/api/socials');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      set({ socials: data.data });
    } catch {
      set({ socials: fallbackSocials });
    } finally {
      set({ loading: false });
    }
  },
}));

export { fallbackSocials };
