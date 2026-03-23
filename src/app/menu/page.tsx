import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { MenuTabs } from '@/components/menu/MenuTabs';

const CoffeeMap = dynamic(
  () => import('@/components/menu/CoffeeMap').then((m) => ({ default: m.CoffeeMap })),
  { ssr: true }
);

export const metadata: Metadata = {
  title: 'Jelovnik — Okus Soli',
  description: 'Dnevna ponuda. Artizanski kruhovi, peciva, specialty kava i sezonski zalogaji.',
  alternates: { canonical: 'https://okussoli.com/menu' },
  openGraph: {
    title: 'Jelovnik — Okus Soli',
    description: 'Dnevna ponuda. Artizanski kruhovi, peciva, specialty kava i sezonski zalogaji.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jelovnik — Okus Soli',
    description: 'Dnevna ponuda. Artizanski kruhovi, peciva, specialty kava i sezonski zalogaji.',
  },
};

export default function MenuPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">Dnevna Ponuda</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Naš</span> Menu
          </h1>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Sve svježe pečeno svako jutro. Kad nestane, nestane.
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
