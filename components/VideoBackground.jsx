'use client';

// ============================================================================
// VideoBackground — Fullscreen cinematic video layer
// ============================================================================

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { VIDEO_CONFIG } from '@/lib/constants';
import styles from './VideoBackground.module.css';

/**
 * Fullscreen looping background video with optional gradient overlay.
 * Auto-plays muted on mount for browser autoplay compliance.
 *
 * @param {{
 *   sources?: Array<{ src: string, type: string }>,
 *   poster?: string,
 *   overlay?: boolean,
 *   overlayOpacity?: number,
 *   className?: string,
 *   priority?: boolean,
 * }} props
 */
export default function VideoBackground({
  sources = [],
  poster = VIDEO_CONFIG.defaultPoster,
  overlay = true,
  overlayOpacity = VIDEO_CONFIG.defaultOverlayOpacity,
  className,
  priority = false,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure autoplay on mount (some browsers need a nudge)
    video.play().catch(() => {
      // Autoplay blocked — video will remain paused
    });
  }, []);

  return (
    <div className={cn(styles.wrapper, className)}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        poster={poster}
        aria-hidden="true"
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>

      {overlay && (
        <div
          className={styles.overlay}
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
