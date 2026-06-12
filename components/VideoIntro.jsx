'use client';

// ============================================================================
// VideoIntro — Cinematic hero section orchestrator
// ============================================================================
//
// Assembles the full cinematic hero:
//   Blurred Background Video → Main Video → Three.js Cinematic Layer →
//   Gradient Overlays → Hero Content → Controls + Sound Prompt + Scroll
//
// All GSAP entrance animations are coordinated via a single timeline.
// ============================================================================

import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { gsap } from '@/lib/gsap';
import CinematicLayer from './CinematicLayer';
import VideoControls from './VideoControls';
import styles from './VideoIntro.module.css';

/**
 * VideoIntro — The cinematic hero section with layered video, Three.js
 * atmospheric particles, GSAP reveal animations, and premium interactions.
 *
 * @param {{ className?: string }} props
 */
const VideoIntro = memo(function VideoIntro({ className, isLoaded = true }) {
  // ---- Refs ----------------------------------------------------------------

  const sectionRef = useRef(null);
  const videoBgRef = useRef(null);
  const videoMainRef = useRef(null);
  const heroNameRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroAccentRef = useRef(null);
  const controlsRef = useRef(null);
  const scrollRef = useRef(null);
  const soundPromptRef = useRef(null);
  const timelineRef = useRef(null);

  // ---- State ---------------------------------------------------------------

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [soundPromptVisible, setSoundPromptVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // ---- Video controls -------------------------------------------------------

  const handlePlayPause = useCallback(() => {
    const video = videoMainRef.current;
    const videoBg = videoBgRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => { });
      videoBg?.play().catch(() => { });
      setIsPlaying(true);
    } else {
      video.pause();
      videoBg?.pause();
      setIsPlaying(false);
    }

    if (!hasInteracted) {
      setHasInteracted(true);
      setSoundPromptVisible(false);
    }
  }, [hasInteracted]);

  const handleMuteToggle = useCallback(() => {
    const video = videoMainRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);

    if (!hasInteracted) {
      setHasInteracted(true);
      setSoundPromptVisible(false);
    }
  }, [hasInteracted]);

  const handleSoundPromptClick = useCallback(() => {
    const video = videoMainRef.current;
    if (!video) return;

    video.muted = false;
    setIsMuted(false);
    setHasInteracted(true);
    setSoundPromptVisible(false);
  }, []);

  // ---- Auto-hide sound prompt after 8 seconds ----------------------------

  useEffect(() => {
    if (hasInteracted || !isLoaded) return;

    // 8s total — accounts for ~3.5s GSAP entrance animation + 4.5s visible
    const timeout = setTimeout(() => {
      setSoundPromptVisible(false);
    }, 8000);

    return () => clearTimeout(timeout);
  }, [hasInteracted, isLoaded]);

  // ---- Video playback & GSAP Coordination --------------------------------

  useEffect(() => {
    const videoMain = videoMainRef.current;
    const videoBg = videoBgRef.current;

    if (!isLoaded) {
      if (videoMain) {
        videoMain.pause();
        videoMain.currentTime = 0;
      }
      if (videoBg) {
        videoBg.pause();
        videoBg.currentTime = 0;
      }
      return;
    }

    let ctx;
    let isCancelled = false;

    const startPlaybackAndAnimate = async () => {
      if (videoMain) {
        videoMain.currentTime = 0;
        if (videoBg) videoBg.currentTime = 0;

        try {
          await Promise.all([
            videoMain.play().catch(() => {}),
            videoBg ? videoBg.play().catch(() => {}) : Promise.resolve()
          ]);
        } catch (err) {
          console.warn("Muted video autoplay blocked or failed:", err);
        }
      }

      if (isCancelled) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'expo.out' },
        });

        // 1. Background video fades in
        tl.to(videoBgRef.current, {
          opacity: 0.3,
          duration: 2,
          ease: 'power2.inOut',
        });

        // 2. Main video fades in
        tl.to(videoMainRef.current, {
          opacity: 1,
          duration: 2.2,
          ease: 'power2.inOut',
        }, '-=1.6');

        // 3. Navbar slides down (query outside scoped context)
        const navbarEl = document.querySelector('header');
        if (navbarEl) {
          tl.fromTo(
            navbarEl,
            { y: -40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2 },
            '-=1.2'
          );
        }

        // 4. Name reveals upward
        if (heroNameRef.current) {
          tl.to(heroNameRef.current, {
            y: 0,
            duration: 1.4,
            ease: 'expo.out',
          }, '-=0.8');
        }

        // 5. Subtitle fades in
        if (heroSubtitleRef.current) {
          tl.to(heroSubtitleRef.current, {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
          }, '-=0.6');
        }

        // 5b. Accent line draws in
        if (heroAccentRef.current) {
          tl.to(heroAccentRef.current, {
            opacity: 1,
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
          }, '-=0.8');
        }

        // 6. Controls appear
        if (controlsRef.current) {
          tl.to(controlsRef.current, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          }, '-=0.4');
        }

        // 6b. Scroll indicator appears
        if (scrollRef.current) {
          tl.to(scrollRef.current, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          }, '-=0.6');
        }

        timelineRef.current = tl;
      }, sectionRef);
    };

    startPlaybackAndAnimate();

    return () => {
      isCancelled = true;
      if (ctx) ctx.revert();
    };
  }, [isLoaded]);

  // ---- Scroll to next section ----------------------------------------------

  const handleScrollDown = useCallback(() => {
    const heroEl = sectionRef.current;
    if (!heroEl) return;

    const nextSection = heroEl.nextElementSibling;
    if (nextSection) {
      gsap.to(window, {
        scrollTo: { y: nextSection, offsetY: 0 },
        duration: 1.2,
        ease: 'sine.inOut',
      });
    } else {
      gsap.to(window, {
        scrollTo: { y: window.innerHeight },
        duration: 1.2,
        ease: 'sine.inOut',
      });
    }
  }, []);

  // ---- Render ---------------------------------------------------------------

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`${styles.heroWrapper} ${className || ''}`}
      aria-label="Hero section"
    >
      {/* Layer 1: Blurred Background Video */}
      <video
        ref={videoBgRef}
        className={styles.videoBg}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Layer 2: Main Video */}
      <video
        ref={videoMainRef}
        className={styles.videoMain}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Layer 3: Three.js Cinematic Particles */}
      <CinematicLayer className={styles.cinematicLayer} />

      {/* Layer 4: Gradient Overlays */}
      <div className={styles.overlays} aria-hidden="true">
        <div className={styles.overlayLeft} />
        <div className={styles.overlayBottom} />
        <div className={styles.overlayBlueGlow} />
        <div className={styles.overlayWarmAccent} />
      </div>

      {/* Layer 5: Hero Content (Stitch layout preserved) */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroName}>
          <span ref={heroNameRef} className={styles.heroNameInner}>
            Rushikesh<br />
            Watane
          </span>
        </h1>
        <p ref={heroSubtitleRef} className={styles.heroSubtitle}>
          FULL STACK DEVELOPER • AI ENGINEER
        </p>
        <div ref={heroAccentRef} className={styles.heroAccentLine} style={{ scaleX: 0 }} />
      </div>

      {/* Layer 6a: Sound Prompt */}
      <div
        ref={soundPromptRef}
        className={`${styles.soundPrompt} ${!soundPromptVisible ? styles.soundPromptHidden : ''}`}
        onClick={handleSoundPromptClick}
        role="button"
        tabIndex={0}
        aria-label="Tap to enable sound"
        onKeyDown={(e) => e.key === 'Enter' && handleSoundPromptClick()}
      >
        <span className={styles.soundPromptIcon}>🔊</span>
        Tap for Sound
      </div>

      {/* Layer 6b: Controls */}
      <div ref={controlsRef} className={styles.controlsWrapper}>
        <VideoControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          onPlayPause={handlePlayPause}
          onMuteToggle={handleMuteToggle}
        />
      </div>

      {/* Layer 6c: Scroll Indicator */}
      <div
        ref={scrollRef}
        className={styles.scrollIndicator}
        onClick={handleScrollDown}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
        onKeyDown={(e) => e.key === 'Enter' && handleScrollDown()}
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
});

export default VideoIntro;
