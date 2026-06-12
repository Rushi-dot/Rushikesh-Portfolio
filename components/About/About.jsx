'use client';

// ============================================================================
// About — Section orchestrator
// ============================================================================
//
// Composes AboutContent (centered bio) and AboutTechStack (pill grid)
// into a single coherent section placed directly below the Hero.
// Synced from Stitch "About | Rushikesh Watane (Centered)" design.
// ============================================================================

import { memo } from 'react';
import styles from './About.module.css';
import AboutContent from './AboutContent';
import AboutTechStack from './AboutTechStack';

/**
 * About — The second major section of the homepage.
 * Contains the bio split layout and tech stack grid, all animated
 * via GSAP ScrollTrigger in the child components.
 *
 * @param {{ className?: string }} props
 */
const About = memo(function About({ className }) {
  return (
    <section
      id="about"
      className={`${styles.aboutSection} ${className || ''}`}
      aria-label="About Rushikesh Watane"
    >
      <AboutContent />
      <AboutTechStack />
    </section>
  );
});

export default About;
