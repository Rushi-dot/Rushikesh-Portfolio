'use client';

// ============================================================================
// VideoControls — Glassmorphism floating video controls (bottom-right)
// ============================================================================
//
// Compact play/pause + mute/unmute buttons with glassmorphism styling.
// Designed to float at the bottom-right of the hero section.
// ============================================================================

import { memo } from 'react';
import { cn } from '@/lib/utils';
import styles from './VideoControls.module.css';

/**
 * Floating glassmorphism video controls — play/pause and mute/unmute.
 *
 * @param {{
 *   isPlaying: boolean,
 *   isMuted: boolean,
 *   onPlayPause: () => void,
 *   onMuteToggle: () => void,
 *   className?: string,
 * }} props
 */
const VideoControls = memo(function VideoControls({
  isPlaying = false,
  isMuted = true,
  onPlayPause,
  onMuteToggle,
  className,
}) {
  return (
    <div className={cn(styles.controls, className)} id="video-controls">
      {/* Play / Pause */}
      <button
        className={styles.controlBtn}
        onClick={onPlayPause}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        id="video-play-btn"
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="4" height="12" rx="1" />
            <rect x="9" y="2" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2.5v11l10-5.5L4 2.5z" />
          </svg>
        )}
      </button>

      {/* Mute toggle */}
      <button
        className={styles.controlBtn}
        onClick={onMuteToggle}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        id="video-mute-btn"
      >
        {isMuted ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2L4 6H1v4h3l4 4V2z" />
            <line x1="12" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2L4 6H1v4h3l4 4V2z" />
            <path d="M11 5.5c.8.8.8 2 0 2.8M13 3.5c1.6 1.6 1.6 4 0 5.6" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
});

export default VideoControls;
