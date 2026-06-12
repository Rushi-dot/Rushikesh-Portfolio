'use client';

// ============================================================================
// AboutTechStack — Glassmorphic tech pill grid with Framer Motion
// ============================================================================
//
// Uses Framer Motion whileInView + staggerChildren so pills animate
// every time the section enters the viewport, not just on first load.
// ============================================================================

import { memo } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

/** Complete tech stack — ordered to match Stitch design */
const TECH_ITEMS = [
  'JavaScript',
  'Java',
  'HTML5',
  'CSS3',
  'React.js',
  'Bootstrap',
  'Responsive Web Design',
  'Node.js',
  'Express.js',
  'RESTful APIs',
  'JWT Authentication',
  'MongoDB',
  'MongoDB Atlas',
  'Redis',
  'Git',
  'GitHub',
  'Docker',
  'VS Code',
  'SAP S/4HANA',
  'CRUD Operations',
  'API Integration',
  'Session Management',
  'Agile Methodology',
  'SDLC',
  'Git Version Control',
];

/** Framer Motion variants */
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


const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * AboutTechStack — Renders the full tech stack pill grid.
 * Framer Motion whileInView replays animations on every viewport entry.
 */
const AboutTechStack = memo(function AboutTechStack() {
  return (
    <div className={styles.techSection}>
      <div className={styles.container}>
        <motion.h2
          className={styles.watermark}
          variants={watermarkVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          aria-hidden="true"
        >
          TECH STACK
        </motion.h2>

        <motion.div
          className={styles.techGrid}
          role="list"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {TECH_ITEMS.map((tech) => (
            <motion.span
              key={tech}
              className={styles.techPill}
              variants={pillVariants}
              role="listitem"
            >
              <span className={styles.pillDot} aria-hidden="true" />
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
});

export default AboutTechStack;
