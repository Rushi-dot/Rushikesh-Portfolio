'use client';

// ============================================================================
// Projects — Stacked Sticky Card Showcase
// ============================================================================
//
// Premium Awwwards-inspired stacked project showcase.
// - Cards stick at top: 80px with increasing z-index
// - New cards naturally slide over previous cards while scrolling
// - Previous cards remain partially visible behind the active card
// - Pure CSS sticky stacking — smooth 60fps, no JS scroll hijacking
// - No horizontal movement, no rotation, no dramatic scaling
// ============================================================================

import { motion } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

// ── Project Data ─────────────────────────────────────────────────────────────

const PROJECTS_DATA = [
  {
    number: '01',
    title: 'Prediction of Arrhythmia Using Deep Learning',
    category: 'Deep Learning · Healthcare',
    year: '2024',
    description:
      'Architected a 1D-Convolutional Neural Network capable of classifying five distinct types of cardiac arrhythmias with 98.2% accuracy on the MIT-BIH database.',
    image: '/project-preview-01.png',
    tags: [
      { name: 'Python', color: 'blue' },
      { name: 'CNN', color: 'blue' },
      { name: 'TensorFlow', color: 'orange' },
    ],
    ctaLabel: 'View Project',
    ctaUrl: '#',
    secondaryLabel: 'Case Study',
    secondaryUrl: '#',
    zIndex: 1,
  },
  {
    number: '02',
    title: 'Pinterest Clone',
    category: 'Full Stack · Web App',
    year: '2024',
    description:
      'A high-performance full-stack masonry grid application featuring real-time image processing, secure authentication, and dynamic content discovery engines.',
    image: '/project-preview-02.png',
    tags: [
      { name: 'Node.js', color: 'green' },
      { name: 'Express', color: 'green' },
      { name: 'MongoDB', color: 'green' },
    ],
    ctaLabel: 'Live Demo',
    ctaUrl: '#',
    secondaryLabel: 'Source Code',
    secondaryUrl: '#',
    zIndex: 2,
  },
  {
    number: '03',
    title: 'CreatorPulse',
    category: 'AI · SaaS Product',
    year: '2024',
    description:
      'AI-driven analytics dashboard for modern content creators. Pulse utilizes natural language processing to predict engagement trends and optimize post schedules.',
    image: '/project-preview-03.png',
    tags: [
      { name: 'React', color: 'blue' },
      { name: 'AI/ML', color: 'navy' },
      { name: 'SaaS', color: 'navy' },
    ],
    ctaLabel: 'Launch App',
    ctaUrl: '#',
    secondaryLabel: 'Documentation',
    secondaryUrl: '#',
    zIndex: 3,
  },
  {
    number: '04',
    title: 'AI Code Assistant',
    category: 'Generative AI · Dev Tools',
    year: '2025',
    description:
      'Intelligent coding companion powered by large language models. Features real-time code generation, contextual suggestions, and multi-language support.',
    image: '/project-preview-04.png',
    tags: [
      { name: 'Next.js', color: 'blue' },
      { name: 'LLM', color: 'navy' },
      { name: 'TypeScript', color: 'blue' },
    ],
    ctaLabel: 'Try It',
    ctaUrl: '#',
    secondaryLabel: 'GitHub',
    secondaryUrl: '#',
    zIndex: 4,
  },
];

// ── Section Header Animations ────────────────────────────────────────────────

const labelVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
};


/**
 * Projects — Stacked sticky card showcase section.
 * Cards pin at a fixed top offset and overlap as the user scrolls.
 */
export default function Projects() {
  // const stackRef = useRef(null);

  // const { scrollYProgress } = useScroll({
  //   target: stackRef,
  //   offset: ["start start", "end end"],
  // });
  return (
    <section
      id="projects"
      className={styles.projectsSection}
      aria-label="Selected Projects"
    >
      {/* ── Section Header ────────────────────────────────────────────── */}
      <div className={styles.sectionHeader}>
        <motion.h2
          className={styles.sectionTitle}
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          PROJECTS
        </motion.h2>
      </div>

      {/* ── Stacked Sticky Card Stack ─────────────────────────────────── */}
      <div className={styles.cardsStack}>
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalProjects={PROJECTS_DATA.length}
          />
        ))}
      </div>

      {/* Spacer to release the final sticky card */}
      <div className={styles.stackSpacer} aria-hidden="true" />
    </section>
  );
}
