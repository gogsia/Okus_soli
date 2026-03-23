import { Metadata } from 'next';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export const metadata: Metadata = {
  title: 'Gallery — Okus Soli',
  description: 'A Taste of Our World. Visual stories from dawn to golden hour.',
  alternates: { canonical: 'https://okussoli.com/gallery' },
  openGraph: {
    title: 'Gallery — Okus Soli',
    description: 'A Taste of Our World. Visual stories from dawn to golden hour.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery — Okus Soli',
    description: 'A Taste of Our World. Visual stories from dawn to golden hour.',
  },
};

export default function GalleryPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">A Taste of Our World</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Our</span> Gallery
          </h1>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Every image tells a story. Every story begins with flour, water, and time.
          </p>
        </div>
        <GalleryGrid />
      </div>
    </main>
  );
}
