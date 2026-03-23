import { Metadata } from 'next';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export const metadata: Metadata = {
  title: 'Galerija — Okus Soli',
  description: 'Okus našeg svijeta. Vizualne priče od zore do zlatnog sata.',
  alternates: { canonical: 'https://okussoli.com/gallery' },
  openGraph: {
    title: 'Galerija — Okus Soli',
    description: 'Okus našeg svijeta. Vizualne priče od zore do zlatnog sata.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galerija — Okus Soli',
    description: 'Okus našeg svijeta. Vizualne priče od zore do zlatnog sata.',
  },
};

export default function GalleryPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Okus Našeg Svijeta</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Naš</span> Gallery
          </h1>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Svaka slika priča priču. Svaka priča počinje s brašnom, vodom i vremenom.
          </p>
        </div>
        <GalleryGrid />
      </div>
    </main>
  );
}
