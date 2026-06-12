'use client';

import { useRef, memo } from 'react';
import styles from './Contact.module.css';

const ContactCard = memo(function ContactCard({ href, icon, label, value }) {
  const cardRef = useRef(null);
  const rectRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    if (!rectRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <a
      ref={cardRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      className={styles.glassCard}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.cardTop}>
        <div className={styles.iconWrapper}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className={`${styles.arrowIcon} material-symbols-outlined`}>
          north_east
        </span>
      </div>
      <div className={styles.cardBottom}>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.value}>{value}</h3>
      </div>
    </a>
  );
});

const Contact = memo(function Contact() {
  return (
    <section className={styles.contactSection} id="contact">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      />
      {/* Contact Section Content */}
      <div className={styles.contactMain}>
        {/* Hero Section */}
        <div className={styles.contactHero}>
          <h1 className={styles.contactTitle}>GET IN TOUCH</h1>
          <p className={styles.contactSubtitle}>
            PICK WHICHEVER CHANNEL SUITS YOU
          </p>
        </div>

        {/* Contact Grid */}
        <div className={styles.contactGrid}>
          {/* Card 1: Email */}
          <ContactCard
            href="mailto:rushipatilwatane1234@gmail.com"
            icon="mail"
            label="EMAIL"
            value="rushipatilwatane1234@gmail.com"
          />
          {/* Card 2: WhatsApp */}
          <ContactCard
            href="https://wa.me/9511296313"
            icon="chat"
            label="WHATSAPP"
            value="+91 9511296313"
          />
          {/* Card 3: LinkedIn */}
          <ContactCard
            href="https://www.linkedin.com/in/rushikesh-watane-39291a290/"
            icon="diversity_3"
            label="LINKEDIN"
            value="in/rushikesh-watane-39291a29"
          />
          {/* Card 4: GitHub */}
          <ContactCard
            href="https://github.com/Rushi-dot"
            icon="code"
            label="GITHUB"
            value="@Rushi-dot"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerText}>2026 RUSHIKESH WATANE</div>
          <div className={styles.footerText}>DESIGNED & BUILT IN PUNE</div>
        </div>
      </footer>
    </section>
  );
});

export default Contact;
