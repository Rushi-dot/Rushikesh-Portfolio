import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// ---------------------------------------------------------------------------
// Font configuration
// ---------------------------------------------------------------------------

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------

export const metadata = {
  title: {
    default: 'Cinematic Portfolio — Premium Visual Storytelling',
    template: '%s | Cinematic Portfolio',
  },
  description:
    'A premium cinematic portfolio showcasing creative work through immersive visual storytelling, motion design, and interactive experiences.',
  keywords: [
    'portfolio',
    'cinematic',
    'creative',
    'visual storytelling',
    'motion design',
    'film',
    'video production',
  ],
  authors: [{ name: 'Cinematic Portfolio' }],
  creator: 'Cinematic Portfolio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Cinematic Portfolio — Premium Visual Storytelling',
    description:
      'A premium cinematic portfolio showcasing creative work through immersive visual storytelling.',
    siteName: 'Cinematic Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cinematic Portfolio',
    description:
      'A premium cinematic portfolio showcasing creative work through immersive visual storytelling.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ---------------------------------------------------------------------------
// Viewport
// ---------------------------------------------------------------------------

export const viewport = {
  themeColor: '#0a0b10',
  width: 'device-width',
  initialScale: 1,
};

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        {children}
      </body>
    </html>
  );
}
