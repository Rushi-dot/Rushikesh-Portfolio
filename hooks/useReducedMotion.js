'use client';

// ============================================================================
// useReducedMotion — Respects prefers-reduced-motion
// ============================================================================

import { MEDIA_QUERIES } from '@/lib/constants';
import { useMediaQuery } from './useMediaQuery';

/**
 * Returns true when the user has "Reduce motion" enabled.
 * Components should skip heavy animations when this returns true.
 *
 * @returns {boolean}
 */
export function useReducedMotion() {
  return useMediaQuery(MEDIA_QUERIES.prefersReducedMotion);
}
