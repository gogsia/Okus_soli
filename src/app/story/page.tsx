import { Metadata } from 'next';
import { StoryChapters } from '@/components/story/StoryChapters';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Naša Priča — Okus Soli',
  description: 'Od strasti do dnevnog rituala. Priča Okusa Soli u šest poglavlja.',
  alternates: { canonical: 'https://okussoli.com/story' },
  openGraph: {
    title: 'Naša Priča — Okus Soli',
    description: 'Od strasti do dnevnog rituala. Priča Okusa Soli u šest poglavlja.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naša Priča — Okus Soli',
    description: 'Od strasti do dnevnog rituala. Priča Okusa Soli u šest poglavlja.',
  },
};

export default function StoryPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Od Strasti do Dnevnog Rituala</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Naša</span> Story
          </h1>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Svaka pekara ima priču. Naša se još uvijek piše.
          </p>
        </div>

        <StoryChapters />

        {/* Link to Why We Bake */}
        <div className="text-center mt-20">
          <p className="text-sm mb-4 text-secondary font-serif italic">
            Želite saznati više?
          </p>
          <Link
            href="/why"
            className="inline-block px-8 py-3 rounded-full text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:scale-[1.02] border-[1.5px] border-hearth text-hearth font-sans"
          >
            Zašto Pečemo
          </Link>
        </div>
      </div>
    </main>
  );
}
