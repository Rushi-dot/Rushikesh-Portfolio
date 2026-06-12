'use client';

// ============================================================================
// useMediaQuery — SSR-safe media query hook
// ============================================================================

import { useEffect, useState } from 'react';

/**
 * Subscribe to a CSS media query and reactively return whether it matches.
 * Returns false on the server to prevent hydration mismatches.
 *
 * @param {string} query - CSS media query string
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
