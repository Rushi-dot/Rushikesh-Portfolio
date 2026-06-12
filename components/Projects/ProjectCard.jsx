'use client';

// ============================================================================
// ProjectCard — Sticky stacking project card
// ============================================================================
//
// Pure CSS sticky positioning — sticks at top: 80px.
// Each card has an increasing z-index set inline so newer cards cover older.
// Uses Framer Motion for subtle entry animation and scroll-linked fade/scale
// on the card being covered.
//
// Layout: Two-column grid
//   Left:  Large project number (ghosted), category, title, description, tags
//   Right: Preview image/screenshot with overlay
//   Top-right: CTA button
// ============================================================================

import { useRef, memo } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';
import styles from './Projects.module.css';

// Entry animation variant
const cardEntryVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Determine tag dot style class based on color property.
 */
function getDotClass(color) {
  switch (color) {
    case 'blue':
      return styles.dotBlue;
    case 'orange':
      return styles.dotOrange;
    case 'navy':
      return styles.dotNavy;
    case 'green':
      return styles.dotGreen;
    default:
      return styles.dotBlue;
  }
}

/**
 * ProjectCard — A single sticky-stacking project card.
 *
 * @param {Object} project - Project data (title, image, tags, etc.)
 * @param {number} index   - Card index (0-based)
 */
const ProjectCard = memo(function ProjectCard({ project, index, totalProjects, }) {
  const cardRef = useRef(null);

  // const start = index * 0.22;
  // const end = start + 0.22;

  const targetScale = 1 - (totalProjects - index - 1) * 0.05;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 1, targetScale]
  );

  // const scale = useTransform(
  //   scrollYProgress,
  //   [start, end],
  //   [1, targetScale]
  // );

  return (
    <div
      ref={cardRef}
      className={styles.cardWrapper}
      style={{
        zIndex: project.zIndex,
        // '--card-index': index,
        '--sticky-top': `${60 + index * 24}px`,
      }}
    >
      <motion.div
        variants={cardEntryVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div
          className={styles.projectCard}
          style={{
            scale,
            willChange: 'transform',
            transformOrigin: 'top center',
          }}
        >
          {/* <div className={styles.projectCard}> */}
          {/* Subtle ECG/image background */}
          <div className={styles.cardImageBackground}>
            <Image
              src={project.image}
              alt=""
              className={styles.backgroundImage}
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              priority={index === 0}
            />
          </div>

          {/* Content container */}
          <div className={styles.cardContent}>
            {/* Top Row: Number + Tags */}
            <div className={styles.topRow}>
              <span className={styles.projectNumber}>{project.number}</span>
              <div className={styles.tagsList}>
                {project.tags.map((tag) => (
                  <span key={tag.name} className={styles.techTag}>
                    <span
                      className={`${styles.tagDot} ${getDotClass(tag.color)}`}
                      aria-hidden="true"
                    />
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Middle Section: Title & Description */}
            <div className={styles.middleSection}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>
            </div>

            {/* Bottom Row: Buttons */}
            <div className={styles.bottomRow}>
              <a
                href={project.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
                aria-label={`${project.ctaLabel} — ${project.title}`}
              >
                {project.ctaLabel}
              </a>
              <a
                href={project.secondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
                aria-label={`${project.secondaryLabel} — ${project.title}`}
              >
                {project.secondaryLabel}
              </a>
            </div>
          </div>
          {/* </div> */}
        </motion.div>
      </motion.div>
    </div>
  );
});

export default ProjectCard;
