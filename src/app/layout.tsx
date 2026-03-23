import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google';
import { MoodProvider } from '@/components/mood/MoodProvider';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/shared/Footer';
import { EasterEggs } from '@/components/shared/EasterEggs';
import { ExitIntent } from '@/components/shared/ExitIntent';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { BackToTop } from '@/components/shared/BackToTop';
import { CustomCursor } from '@/components/shared/CustomCursor';
import { AmbientPlayer } from '@/components/audio/AmbientPlayer';
import { StructuredData } from '@/components/shared/StructuredData';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://okussoli.com'),
  title: {
    default: 'Okus Soli — Artisan Bakery & Coffee',
    template: '%s | Okus Soli',
  },
  description:
    'Sourdough baked at dawn. Coffee roasted with care. A place that feels like coming home.',
  keywords: ['bakery', 'artisan bread', 'sourdough', 'coffee', 'café', 'Mediterranean', 'pastries'],
  alternates: {
    canonical: 'https://okussoli.com',
  },
  openGraph: {
    type: 'website',
    siteName: 'Okus Soli',
    locale: 'en_US',
    title: 'Okus Soli — Artisan Bakery & Coffee',
    description:
      'Sourdough baked at dawn. Coffee roasted with care. A place that feels like coming home.',
    url: 'https://okussoli.com',
    images: [{ url: '/images/hero-poster.webp', width: 1200, height: 630, alt: 'Okus Soli — Artisan Bakery & Coffee' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Okus Soli — Artisan Bakery & Coffee',
    description: 'Sourdough baked at dawn. Coffee roasted with care. A place that feels like coming home.',
    images: ['/images/hero-poster.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StructuredData />
        <MoodProvider>
          {/* Skip to content */}
          <a href="#main" className="skip-link">
            Skip to content
          </a>

          <Navbar />

          <div id="main" className="flex-1 mood-overlay">
            {children}
          </div>

          <Footer />

          {/* Overlays & UI */}
          <CustomCursor />
          <ScrollProgress />
          <BackToTop />
          <AmbientPlayer />
          <EasterEggs />
          <ExitIntent />
        </MoodProvider>
      </body>
    </html>
  );
}
