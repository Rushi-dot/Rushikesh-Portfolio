// ============================================================================
// Cinematic Portfolio — GSAP Registration
// ============================================================================
//
// Centralised GSAP plugin registration. Import from here instead of 'gsap'
// directly so plugins are always registered before use.
// ============================================================================

'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export { gsap, ScrollTrigger, ScrollToPlugin };
