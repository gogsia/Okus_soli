import { Metadata } from 'next';
import { VisitSection } from '@/components/visit/VisitSection';

export const metadata: Metadata = {
  title: 'Posjetite nas — Okus Soli',
  description: 'Dođite po kruh. Pronađite nas, pogledajte radno vrijeme i planirajte posjet.',
  alternates: { canonical: 'https://okussoli.com/visit' },
  openGraph: {
    title: 'Posjetite nas — Okus Soli',
    description: 'Dođite po kruh. Pronađite nas, pogledajte radno vrijeme i planirajte posjet.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Posjetite nas — Okus Soli',
    description: 'Dođite po kruh. Pronađite nas, pogledajte radno vrijeme i planirajte posjet.',
  },
};

export default function VisitPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Dođite po Kruh</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Posjet</span> Us
          </h1>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Vaš stol čeka.
          </p>
        </div>

        <VisitSection />
      </div>
    </main>
  );
}
