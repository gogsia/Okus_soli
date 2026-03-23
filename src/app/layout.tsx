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
  metadataBase: new URL('https://okus-soli-gamma.vercel.app'),
  title: {
    default: 'Okus Soli by Pa\u2019kai \u2014 Doručak, Brunch i Artizanski Kruh \u2014 \u0160ibenik',
    template: '%s | Okus Soli by Pa\u2019kai',
  },
  description:
    'Doručak, brunch i artizanski kruh u Šibeniku. Kruh od kiselog tijesta iz 5-godišnjeg startera, focaccia, specialty kava. Krešimir i Ksenija Glavina.',
  keywords: ['Okus Soli', 'Pa\u2019kai', '\u0160ibenik', 'pekara', 'doručak', 'brunch', 'kiselo tijesto', 'focaccia', 'Hrvatska', 'Dalmacija'],
  alternates: {
    canonical: 'https://okus-soli-gamma.vercel.app',
  },
  openGraph: {
    type: 'website',
    siteName: 'Okus Soli by Pa\u2019kai',
    locale: 'hr_HR',
    title: 'Okus Soli by Pa\u2019kai \u2014 Doručak, Brunch i Artizanski Kruh \u2014 \u0160ibenik',
    description:
      'Doručak, brunch i artizanski kruh u Šibeniku. Kruh od kiselog tijesta iz 5-godišnjeg startera, focaccia, specialty kava.',
    url: 'https://okus-soli-gamma.vercel.app',
    images: [{ url: '/images/hero-poster.webp', width: 1200, height: 630, alt: 'Okus Soli by Pa\u2019kai \u2014 \u0160ibenik' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Okus Soli by Pa\u2019kai \u2014 \u0160ibenik',
    description: 'Doručak, brunch i artizanski kruh. Kruh od kiselog tijesta iz 5-godišnjeg startera, focaccia, specialty kava.',
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
      lang="hr"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StructuredData />
        <MoodProvider>
          {/* Skip to content */}
          <a href="#main" className="skip-link">
            Preskoči na sadržaj
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
