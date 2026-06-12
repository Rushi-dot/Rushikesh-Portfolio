// ============================================================================
// Cinematic Portfolio — Constants & Configuration
// ============================================================================

// ---------------------------------------------------------------------------
// Site Metadata
// ---------------------------------------------------------------------------

export const SITE_METADATA = {
  title: 'Cinematic Portfolio',
  description:
    'A premium cinematic portfolio showcasing creative work through immersive visual storytelling.',
  url: 'https://cinematic-portfolio.com',
  image: '/og-image.jpg',
  locale: 'en_US',
  type: 'website',
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// ---------------------------------------------------------------------------
// Animation Presets (for GSAP)
// ---------------------------------------------------------------------------

export const ANIMATION_PRESETS = {
  fadeIn: { duration: 0.8, ease: 'power2.out' },
  fadeInUp: { duration: 0.8, ease: 'power3.out' },
  fadeInScale: { duration: 1, ease: 'expo.out' },
  staggerChildren: { duration: 0.6, stagger: 0.1, ease: 'power2.out' },
  cinematic: { duration: 1.4, ease: 'expo.out' },
  heroReveal: { duration: 1.8, delay: 0.5, ease: 'expo.out' },
  smoothScroll: { duration: 1.2, ease: 'sine.inOut' },
};

// ---------------------------------------------------------------------------
// Framer Motion Variants
// ---------------------------------------------------------------------------

export const MOTION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },

  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  },

  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },

  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  },

  slideInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  },

  slideInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  },

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  },

  navReveal: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

// ---------------------------------------------------------------------------
// Particle Defaults
// ---------------------------------------------------------------------------

export const DEFAULT_PARTICLE_CONFIG = {
  count: 120,
  size: 2,
  speed: 0.3,
  color: '#ffffff',
  opacity: 0.6,
  spread: 10,
  connectionDistance: 150,
  connectionOpacity: 0.15,
};

// ---------------------------------------------------------------------------
// Video Config
// ---------------------------------------------------------------------------

export const VIDEO_CONFIG = {
  defaultOverlayOpacity: 0.55,
  defaultPoster: '/video-poster.jpg',
  supportedFormats: ['video/mp4', 'video/webm'],
  preloadStrategy: 'auto',
};

// ---------------------------------------------------------------------------
// Loader Config
// ---------------------------------------------------------------------------

export const LOADER_CONFIG = {
  defaultDuration: 2.5,
  minimumDisplayTime: 1000,
  phases: ['assets', 'animations', 'complete'],
};

// ---------------------------------------------------------------------------
// Z-Index Scale
// ---------------------------------------------------------------------------

export const Z_INDEX = {
  behind: -1,
  base: 0,
  content: 10,
  overlay: 20,
  navbar: 30,
  modal: 40,
  loader: 50,
  tooltip: 60,
};

// ---------------------------------------------------------------------------
// Media Queries (for JS usage)
// ---------------------------------------------------------------------------

export const MEDIA_QUERIES = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  prefersDark: '(prefers-color-scheme: dark)',
  hover: '(hover: hover)',
  touch: '(hover: none)',
};

// ---------------------------------------------------------------------------
// Breakpoint widths (px, for JS calculations)
// ---------------------------------------------------------------------------

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
