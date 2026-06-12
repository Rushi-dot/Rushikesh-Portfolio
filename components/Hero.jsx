'use client';

// ============================================================================
// Hero — Placeholder shell (implementation deferred)
// ============================================================================

import { cn } from '@/lib/utils';
import styles from './Hero.module.css';

/**
 * Hero section shell. This component is intentionally minimal —
 * the full cinematic Hero implementation will be built in a later phase.
 *
 * @param {{ className?: string }} props
 */
export default function Hero({ className }) {
  return (
    <section
      id="hero"
      className={cn(styles.hero, className)}
      aria-label="Hero section"
    >
      {/* VideoBackground, Particles, and content will be composed here */}
    </section>
  );
}
