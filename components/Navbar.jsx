'use client';

// ============================================================================
// Navbar — Cinematic transparent navigation
// ============================================================================

import { useEffect, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import { NAV_ITEMS, MOTION_VARIANTS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import styles from './Navbar.module.css';

/**
 * Premium cinematic navbar with scroll-aware transparency, glassmorphism,
 * and GSAP-driven reveal animation.
 *
 * @param {{ items?: Array<{label:string, href:string}>, isTransparent?: boolean, className?: string }} props
 */
const Navbar = memo(function Navbar({ items = NAV_ITEMS, isTransparent = true, className }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // ---- Scroll detection ---------------------------------------------------

  useEffect(() => {
    let currentScrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== currentScrolled) {
        currentScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---- GSAP entrance animation -------------------------------------------

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  // ---- Render -------------------------------------------------------------

  const showGlass = scrolled || !isTransparent;

  return (
    <motion.header
      ref={navRef}
      variants={MOTION_VARIANTS.navReveal}
      initial="hidden"
      animate="visible"
      className={cn(
        styles.navbar,
        showGlass && styles.navbarScrolled,
        className,
      )}
    >
      <nav className={styles.navInner} aria-label="Primary navigation">
        {/* Logo */}
        <a href="/" className={styles.logo} id="nav-logo">
          <span className={styles.logoMark}>RW</span>
          <span className={styles.logoText}>Portfolio</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.navLinks} id="nav-links-desktop">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={styles.navLink}
                id={`nav-link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className={styles.navCta} id="nav-cta">
          Get in Touch
        </a>

        {/* Mobile toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          id="nav-mobile-toggle"
        >
          <span className={cn(styles.hamburgerLine, mobileOpen && styles.hamburgerOpen)} />
          <span className={cn(styles.hamburgerLine, mobileOpen && styles.hamburgerOpen)} />
          <span className={cn(styles.hamburgerLine, mobileOpen && styles.hamburgerOpen)} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={styles.mobileMenu}
          id="nav-mobile-menu"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className={styles.navCta}
            onClick={() => setMobileOpen(false)}
          >
            Get in Touch
          </a>
        </motion.div>
      )}
    </motion.header>
  );
});

export default Navbar;
