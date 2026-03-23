import { Metadata } from 'next';
import { VisitSection } from '@/components/visit/VisitSection';

export const metadata: Metadata = {
  title: 'Visit — Okus Soli',
  description: 'Come for the Bread. Find us, see our hours, and plan your visit.',
  alternates: { canonical: 'https://okussoli.com/visit' },
  openGraph: {
    title: 'Visit — Okus Soli',
    description: 'Come for the Bread. Find us, see our hours, and plan your visit.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visit — Okus Soli',
    description: 'Come for the Bread. Find us, see our hours, and plan your visit.',
  },
};

export default function VisitPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Come for the Bread</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Visit</span> Us
          </h1>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Your table is waiting.
          </p>
        </div>

        <VisitSection />
      </div>
    </main>
  );
}
