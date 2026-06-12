'use client';

// ============================================================================
// Loader — Cinematic preloading screen
// ============================================================================

import { useEffect, useRef, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import { LOADER_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import styles from './Loader.module.css';

/**
 * Cinematic loading screen with progress counter and GSAP-driven exit.
 *
 * @param {{
 *   variant?: 'cinematic' | 'minimal' | 'progress',
 *   onComplete?: () => void,
 *   duration?: number,
 *   className?: string,
 * }} props
 */
const Loader = memo(function Loader({
  variant = 'cinematic',
  onComplete,
  duration = LOADER_CONFIG.defaultDuration,
  className,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const progressFillRef = useRef(null);

  useEffect(() => {
    const obj = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      },
    });

    tl.to(obj, {
      value: 100,
      duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(obj.value);
        if (counterRef.current) {
          counterRef.current.textContent = `${val}`;
        }
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${val}%`;
        }
        if (loaderRef.current) {
          loaderRef.current.setAttribute('aria-valuenow', val);
        }
      },
    });

    tl.to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'expo.inOut',
    });

    return () => tl.kill();
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={loaderRef}
          className={cn(styles.loader, styles[variant], className)}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-label="Loading"
          role="progressbar"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          id="site-loader"
        >
          <div className={styles.content}>
            <span className={styles.counter} ref={counterRef}>
              0
            </span>
            <div className={styles.progressTrack}>
              <div
                ref={progressFillRef}
                className={styles.progressFill}
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Loader;
