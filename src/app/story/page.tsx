import { Metadata } from 'next';
import { StoryChapters } from '@/components/story/StoryChapters';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Story — Okus Soli',
  description: 'From Passion to Daily Ritual. The story of Okus Soli in six chapters.',
  alternates: { canonical: 'https://okussoli.com/story' },
  openGraph: {
    title: 'Our Story — Okus Soli',
    description: 'From Passion to Daily Ritual. The story of Okus Soli in six chapters.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story — Okus Soli',
    description: 'From Passion to Daily Ritual. The story of Okus Soli in six chapters.',
  },
};

export default function StoryPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">From Passion to Daily Ritual</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Our</span> Story
          </h1>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Every bakery has a story. Ours is still being written.
          </p>
        </div>

        <StoryChapters />

        {/* Link to Why We Bake */}
        <div className="text-center mt-20">
          <p className="text-sm mb-4 text-secondary font-serif italic">
            Want the deeper version?
          </p>
          <Link
            href="/why"
            className="inline-block px-8 py-3 rounded-full text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:scale-[1.02] border-[1.5px] border-hearth text-hearth font-sans"
          >
            Why We Bake
          </Link>
        </div>
      </div>
    </main>
  );
}
