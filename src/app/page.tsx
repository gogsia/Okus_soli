import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/hero/HeroSection';
import { AboutSection } from '@/components/about/AboutSection';
import { HomepageMenu } from '@/components/menu/HomepageMenu';

// Lazy-load below-the-fold sections to reduce initial bundle
const TerraceSection = dynamic(
  () => import('@/components/terrace/TerraceSection').then((m) => ({ default: m.TerraceSection })),
  { ssr: true }
);

const HomepageGallery = dynamic(
  () => import('@/components/gallery/HomepageGallery').then((m) => ({ default: m.HomepageGallery })),
  { ssr: true }
);

const InstagramFeed = dynamic(
  () => import('@/components/shared/InstagramFeed').then((m) => ({ default: m.InstagramFeed })),
  { ssr: true }
);

const HomepageVisit = dynamic(
  () => import('@/components/visit/HomepageVisit').then((m) => ({ default: m.HomepageVisit })),
  { ssr: true }
);

export const metadata: Metadata = {
  title: 'Okus Soli by Pa\u2019kai \u2014 Doručak, Brunch i Artizanski Kruh \u2014 \u0160ibenik',
  description: 'Doručak, brunch i artizanski kruh u Šibeniku. Kruh od kiselog tijesta iz 5-godišnjeg startera, focaccia, specialty kava. Fausta Vrančića 9.',
  openGraph: {
    title: 'Okus Soli by Pa\u2019kai \u2014 \u0160ibenik',
    description: 'Doručak, brunch i artizanski kruh u Šibeniku. Kruh od kiselog tijesta iz 5-godišnjeg startera, focaccia, specialty kava.',
    type: 'website',
    siteName: 'Okus Soli by Pa\u2019kai',
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <HomepageMenu />
      <TerraceSection />
      <HomepageGallery />
      <InstagramFeed />
      <HomepageVisit />
    </main>
  );
}
