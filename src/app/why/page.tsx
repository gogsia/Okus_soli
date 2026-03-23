import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why We Bake — Okus Soli',
  description: 'A 2-minute read about why Okus Soli exists.',
  alternates: { canonical: 'https://okussoli.com/why' },
  openGraph: {
    title: 'Why We Bake — Okus Soli',
    description: 'A 2-minute read about why Okus Soli exists.',
  },
  twitter: {
    card: 'summary',
    title: 'Why We Bake — Okus Soli',
    description: 'A 2-minute read about why Okus Soli exists.',
  },
};

export default function WhyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-6">
      <article
        className="max-w-[60ch] mx-auto font-serif text-foreground"
        style={{
          fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
          lineHeight: 2,
        }}
      >
        <p className="section-label mb-8 text-center">A 2-minute read</p>

        <h1
          className="text-3xl md:text-4xl text-center mb-12 font-display"
          style={{ lineHeight: 1.3 }}
        >
          Why We Bake
        </h1>

        <p className="drop-cap mb-8">
          Because the world is full of things made to be consumed and forgotten. We wanted to make
          something worth remembering. Something you could hold in your hands and feel the hours
          folded into it.
        </p>

        <p className="mb-8">
          Baking is an act of faith. You mix flour, water, salt, and time — and you trust that
          something greater will emerge. There is no shortcut. There is no hack. The dough knows
          if you rushed it.
        </p>

        <p className="mb-8">
          We bake because at 4am, when the streets are empty and the oven is the only warmth in
          the building, something sacred happens. The silence. The rhythm of hands in dough. The
          patience of waiting for fermentation to do what only time can do.
        </p>

        <p className="mb-8">
          We bake because bread is the oldest gift. Because sharing a loaf with someone is an act
          of trust and generosity that predates every institution, every border, every language.
        </p>

        <p className="mb-8">
          We bake because the smell of fresh bread makes strangers smile. Because a warm croissant
          can rescue a bad morning. Because someone, somewhere, is about to take the first bite of
          something we made with our whole attention — and for that one second, everything is exactly
          as it should be.
        </p>

        <p className="mb-8 text-hearth">
          We bake because it matters. Not in the way that headlines matter or quarterly reports
          matter. It matters the way a sunrise matters — quietly, certainly, every single day.
        </p>

        <p className="text-center mt-16 text-secondary" style={{ fontSize: '0.875rem' }}>
          — The Okus Soli Team
        </p>
      </article>
    </main>
  );
}
