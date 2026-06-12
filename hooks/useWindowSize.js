'use client';

// ============================================================================
// useWindowSize — Debounced viewport dimensions
// ============================================================================

import { useEffect, useState } from 'react';
import { debounce } from '@/lib/utils';

/**
 * Track browser viewport dimensions with a debounced resize listener.
 * Returns { width: 0, height: 0 } on the server.
 *
 * @param {number} [delay=150] - debounce delay in ms
 * @returns {{ width: number, height: number }}
 */
export function useWindowSize(delay = 150) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    update();

    const debouncedUpdate = debounce(update, delay);
    window.addEventListener('resize', debouncedUpdate);
    return () => window.removeEventListener('resize', debouncedUpdate);
  }, [delay]);

  return size;
}
