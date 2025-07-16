import { create } from 'zustand';

export interface ApiEvent {
  id: string;
  title: string;
  description?: string;
  date?: string;
  views?: number;
  video_url?: string;
  cover_image?: string;
  impact?: string;
  highlights?: string[];
  participants?: number;
  duration?: string;
  location?: string;
  organizer?: string;
  filter_tags?: string[];
  related_projects?: { projects_id: string }[];
  gallery?: { directus_files_id: string }[];
}

interface EventsState {
  events: ApiEvent[];
  totalPages: number;
  loading: boolean;
  fetchEvents: (page: number) => Promise<void>;
  updateEvent: (event: ApiEvent) => void;
}

export const useEventsStore = create<EventsState>((set) => ({
  events: [],
  totalPages: 1,
  loading: false,
  async fetchEvents(page = 0) {
    set({ loading: true });
    try {
      const res = await fetch(`/api/events?page=${page}`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      set({
        events: data.data,
        totalPages: data.meta?.total_pages ?? 1,
      });
    } catch {
      set({ events: [], totalPages: 1 });
    } finally {
      set({ loading: false });
    }
  },
  updateEvent(updated) {
    set((state) => ({
      events: state.events.map((e) => (e.id === updated.id ? updated : e)),
    }));
  },
}));

export const fallbackEvents: ApiEvent[] = [];
