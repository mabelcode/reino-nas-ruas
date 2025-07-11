'use client';

import { useEffect } from 'react';

export function AutoHideScrollbars() {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      document.documentElement.classList.add('show-scrollbars');
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        document.documentElement.classList.remove('show-scrollbars');
      }, 1500);
    };

    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
