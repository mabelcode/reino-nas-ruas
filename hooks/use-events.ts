'use client';

import { useEffect } from 'react';
import { useEventsStore, fallbackEvents } from '@/stores/events-store';

export function useEvents(page: number) {
  const events = useEventsStore((state) => state.events);
  const fetchEvents = useEventsStore((state) => state.fetchEvents);
  const totalPages = useEventsStore((state) => state.totalPages);

  useEffect(() => {
    fetchEvents(page);
  }, [page, fetchEvents]);

  return {
    events: events.length ? events : fallbackEvents,
    totalPages,
  };
}
