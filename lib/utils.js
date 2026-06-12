// ============================================================================
// Cinematic Portfolio — Utility Functions
// ============================================================================

import { MEDIA_QUERIES } from './constants';

/**
 * Conditionally join CSS class names, filtering out falsy values.
 * @param  {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Clamp a numeric value between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values.
 * @param {number} start
 * @param {number} end
 * @param {number} factor  - 0 to 1
 * @returns {number}
 */
export function lerp(start, end, factor) {
  return start + (end - start) * clamp(factor, 0, 1);
}

/**
 * Map a value from one range to another.
 * @param {number} value
 * @param {number} inMin
 * @param {number} inMax
 * @param {number} outMin
 * @param {number} outMax
 * @returns {number}
 */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Format seconds into MM:SS display string.
 * @param {number} seconds
 * @returns {string}
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Check if code is running on the client side.
 * @returns {boolean}
 */
export function isClient() {
  return typeof window !== 'undefined';
}

/**
 * Check whether the user prefers reduced motion.
 * Returns false on the server.
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  if (!isClient()) return false;
  return window.matchMedia(MEDIA_QUERIES.prefersReducedMotion).matches;
}

/**
 * Debounce a function call.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle a function call so it fires at most once per interval.
 * @param {Function} fn
 * @param {number} interval
 * @returns {Function}
 */
export function throttle(fn, interval) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Generate a random number in [min, max).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Sleep for ms milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Convert a hex colour + alpha to an rgba string.
 * @param {string} hex
 * @param {number} alpha
 * @returns {string}
 */
export function hexToRgba(hex, alpha) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
