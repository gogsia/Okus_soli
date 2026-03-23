import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { MenuTabs } from '@/components/menu/MenuTabs';

const CoffeeMap = dynamic(
  () => import('@/components/menu/CoffeeMap').then((m) => ({ default: m.CoffeeMap })),
  { ssr: true }
);

export const metadata: Metadata = {
  title: 'Menu — Okus Soli',
  description: 'The Daily Offering. Artisan breads, pastries, single-origin coffee, and seasonal bites.',
  alternates: { canonical: 'https://okussoli.com/menu' },
  openGraph: {
    title: 'Menu — Okus Soli',
    description: 'The Daily Offering. Artisan breads, pastries, single-origin coffee, and seasonal bites.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menu — Okus Soli',
    description: 'The Daily Offering. Artisan breads, pastries, single-origin coffee, and seasonal bites.',
  },
};

export default function MenuPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">The Daily Offering</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Our</span> Menu
          </h1>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Everything baked fresh each morning. When it&apos;s gone, it&apos;s gone.
          </p>
        </div>

        {/* Menu Content */}
        <MenuTabs />

        {/* Coffee Origin Map */}
        <CoffeeMap />
      </div>
    </main>
  );
}
