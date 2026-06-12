'use client';

// ============================================================================
// Home Page — Cinematic Portfolio
// ============================================================================

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import VideoIntro from '@/components/VideoIntro';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About/About'), {
  loading: () => <div style={{ minHeight: '600px' }} />,
});
const Projects = dynamic(() => import('@/components/Projects/Projects'), {
  loading: () => <div style={{ minHeight: '800px' }} />,
});
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
import Loader from '@/components/Loader';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // Notify GSAP ScrollTrigger on scroll
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Sync Lenis frame updates with GSAP ticker
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Disable lag smoothing to prevent ticking delay
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);


  return (
    <>
      <Loader onComplete={() => setIsLoading(false)} />
      <Navbar className={isLoading ? 'opacity-0 pointer-events-none' : ''} />
      <main className="film-grain">
        <VideoIntro isLoaded={!isLoading} />
        <About />
        <Projects />
        <Contact />
      </main>

    </>
  );
}

