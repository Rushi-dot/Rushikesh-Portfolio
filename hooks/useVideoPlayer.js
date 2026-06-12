'use client';

// ============================================================================
// useVideoPlayer — Video playback state management
// ============================================================================

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Manages the full lifecycle of a <video> element:
 * play / pause / mute / seek / progress tracking.
 *
 * @returns {{
 *   videoRef: React.RefObject<HTMLVideoElement>,
 *   isPlaying: boolean,
 *   isMuted: boolean,
 *   progress: number,
 *   duration: number,
 *   isLoaded: boolean,
 *   error: string|null,
 *   play: () => Promise<void>,
 *   pause: () => void,
 *   togglePlay: () => void,
 *   toggleMute: () => void,
 *   seek: (time: number) => void,
 * }}
 */
export function useVideoPlayer() {
  const videoRef = useRef(null);
  const [state, setState] = useState({
    isPlaying: false,
    isMuted: true,
    progress: 0,
    duration: 0,
    isLoaded: false,
    error: null,
  });

  // ---- Playback controls --------------------------------------------------

  const play = useCallback(async () => {
    try {
      await videoRef.current?.play();
      setState((s) => ({ ...s, isPlaying: true }));
    } catch (err) {
      setState((s) => ({
        ...s,
        error: err instanceof Error ? err.message : 'Playback failed',
      }));
    }
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current?.paused) {
      play();
    } else {
      pause();
    }
  }, [play, pause]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setState((s) => ({ ...s, isMuted: videoRef.current.muted }));
    }
  }, []);

  const seek = useCallback((time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  }, []);

  // ---- Event listeners ----------------------------------------------------

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () =>
      setState((s) => ({ ...s, duration: video.duration, isLoaded: true }));

    const onTimeUpdate = () =>
      setState((s) => ({ ...s, progress: video.currentTime }));

    const onError = () =>
      setState((s) => ({ ...s, error: 'Video failed to load' }));

    const onEnded = () => setState((s) => ({ ...s, isPlaying: false }));

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('error', onError);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('error', onError);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return {
    videoRef,
    ...state,
    play,
    pause,
    togglePlay,
    toggleMute,
    seek,
  };
}
