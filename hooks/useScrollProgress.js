'use client';

// ============================================================================
// useScrollProgress — Normalised 0→1 page scroll position
// ============================================================================

import { useEffect, useState } from 'react';
import { throttle } from '@/lib/utils';

/**
 * Returns a value between 0 and 1 representing page scroll progress.
 * Useful for scroll-driven cinematic effects without GSAP ScrollTrigger.
 *
 * @param {number} [interval=16] - throttle interval in ms
 * @returns {number}
 */
export function useScrollProgress(interval = 16) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(window.scrollY / scrollHeight);
    };

    const throttledUpdate = throttle(update, interval);
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    update();

    return () => window.removeEventListener('scroll', throttledUpdate);
  }, [interval]);

  return progress;
}
