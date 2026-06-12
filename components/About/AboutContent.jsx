'use client';

// ============================================================================
// AboutContent — Centered bio layout (synced from Stitch)
// ============================================================================
//
// Stitch design: "About | Rushikesh Watane (Centered)"
// Centered layout with:
//   - Large "ABOUT" watermark heading
//   - Bio heading with highlighted role spans
//   - Three body paragraphs with staggered fade-in + slide reveal
//   - Max-width 900px, text-align center
// No split layout, no portrait — pure centered text design.
// ============================================================================

import { useRef, memo } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

// Framer Motion Variants for Staggered Paragraphs
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a premium feel
    },
  },
};

// Framer Motion Variants for Heading Pop
const watermarkVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 0.30,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
      restDelta: 0.001,
    },
  },
};

/**
 * AboutContent — Centered bio section matching Stitch design exactly.
 * Framer Motion drives viewport-triggered header pops and staggered paragraphs.
 */
const AboutContent = memo(function AboutContent() {
  const sectionRef = useRef(null);

  return (
    <div ref={sectionRef} className={styles.contentSection}>
      <div className={styles.container}>
        <div className={styles.contentInner}>
          {/* Watermark — ABOUT, opacity 0.30, centered, replays on enter */}
          <motion.h2
            className={styles.watermark}
            variants={watermarkVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            aria-hidden="true"
          >
            ABOUT
          </motion.h2>

          {/* Heading — pops in with a smooth spring transition and replays on enter */}
          <motion.h2
            className={styles.bioHeading}
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            I&apos;m Rushikesh Watane, a{' '}
            <span className={styles.highlightKeyword}>Full Stack Developer</span>{' '}
            and{' '}
            <span className={styles.highlightKeyword}>AI Engineer</span>{' '}
            focused on building intelligent, scalable, and user-centric digital
            experiences.
          </motion.h2>

          {/* Staggered paragraphs container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.p variants={paragraphVariants} className={styles.bioParagraph}>
              My work combines modern web technologies, backend engineering, and
              artificial intelligence to create products that solve real-world
              challenges. From <span className={styles.highlightKeyword}>MERN Stack</span> applications
              to <span className={styles.highlightKeyword}>Deep Learning</span> systems, I
              enjoy transforming complex ideas into impactful digital solutions.
            </motion.p>

            <motion.p variants={paragraphVariants} className={styles.bioParagraph}>
              I hold a Bachelor of Engineering in Information Technology from Prof.
              Ram Meghe Institute of Technology & Research with a CGPA of 8.36,
              where I developed a strong foundation in software engineering,
              problem solving, and emerging technologies.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

export default AboutContent;
