import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zašto Pečemo — Okus Soli',
  description: 'Čitanje od 2 minute o tome zašto Okus Soli postoji.',
  alternates: { canonical: 'https://okussoli.com/why' },
  openGraph: {
    title: 'Zašto Pečemo — Okus Soli',
    description: 'Čitanje od 2 minute o tome zašto Okus Soli postoji.',
  },
  twitter: {
    card: 'summary',
    title: 'Zašto Pečemo — Okus Soli',
    description: 'Čitanje od 2 minute o tome zašto Okus Soli postoji.',
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
        <p className="section-label mb-8 text-center">Čitanje od 2 minute</p>

        <h1
          className="text-3xl md:text-4xl text-center mb-12 font-display"
          style={{ lineHeight: 1.3 }}
        >
          Zašto Pečemo
        </h1>

        <p className="drop-cap mb-8">
          Jer svijet je pun stvari napravljenih da se konzumiraju i zaborave. Htjeli smo napraviti
          nešto vrijedno pamćenja. Nešto što možete držati u rukama i osjetiti sate utkane u to.
        </p>

        <p className="mb-8">
          Pečenje je čin vjere. Miješate brašno, vodu, sol i vrijeme — i vjerujete da će nastati
          nešto veće. Nema prečaca. Nema trikova. Tijesto zna ako ste požurili.
        </p>

        <p className="mb-8">
          Pečemo jer u 4 ujutro, kad su ulice prazne i peć je jedina toplina u zgradi, nešto
          sveto se događa. Tišina. Ritam ruku u tijestu. Strpljenje čekanja da fermentacija
          učini ono što samo vrijeme može.
        </p>

        <p className="mb-8">
          Pečemo jer je kruh najstariji dar. Jer podijeliti kruh s nekim je čin povjerenja i
          velikodušnosti koji je stariji od svake institucije, svake granice, svakog jezika.
        </p>

        <p className="mb-8">
          Pečemo jer miris svježeg kruha tjera neznance na osmijeh. Jer topli kroasan može spasiti
          loše jutro. Jer netko, negdje, upravo će zagrizti u nešto što smo napravili s punom
          pažnjom — i u toj jednoj sekundi, sve je točno onako kako treba biti.
        </p>

        <p className="mb-8 text-hearth">
          Pečemo jer je to važno. Ne na način na koji su važni naslovi ili kvartalni izvještaji.
          Važno je na način na koji je važan izlazak sunca — tiho, sigurno, svaki dan.
        </p>

        <p className="text-center mt-16 text-secondary" style={{ fontSize: '0.875rem' }}>
          — Tim Okus Soli
        </p>
      </article>
    </main>
  );
}
