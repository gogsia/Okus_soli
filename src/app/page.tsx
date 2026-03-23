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
  title: 'Okus Soli by Pa\u2019kai \u2014 Breakfast, Brunch & Artisan Baking \u2014 \u0160ibenik',
  description: 'Breakfast, brunch & artisan baking in \u0160ibenik, Croatia. Sourdough from a 5-year starter, focaccia, specialty coffee. Fausta Vran\u010Di\u0107a 9.',
  openGraph: {
    title: 'Okus Soli by Pa\u2019kai \u2014 \u0160ibenik',
    description: 'Breakfast, brunch & artisan baking in \u0160ibenik, Croatia. Sourdough from a 5-year starter, focaccia, specialty coffee.',
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
