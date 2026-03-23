'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionReveal } from '@/components/shared/SectionReveal';

const pillars = [
  {
    id: 'craft',
    label: 'Artizanski Zanat',
    description: 'Svaki kruh oblikovan rukom. Nijedan nije isti. Odbacujemo uniformnost u potrazi za autentičnošću.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <path d="M24 4C14 4 6 12 6 24c0 8 4 14 10 18h16c6-4 10-10 10-18C42 12 34 4 24 4z" />
        <path d="M18 20c0-4 3-7 6-7s6 3 6 7" />
        <line x1="24" y1="28" x2="24" y2="38" />
      </svg>
    ),
  },
  {
    id: 'source',
    label: 'Pošteno Nabavljanje',
    description: 'Kava jednog podrijetla. Kameno mljeveno brašno. Svaki sastojak praćen do svog polja, svog poljoprivrednika, svoje priče.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <path d="M24 44V24" />
        <path d="M24 24c-6-2-10-8-10-16 10 2 14 8 10 16z" />
        <path d="M24 24c6-2 10-8 10-16-10 2-14 8-10 16z" />
        <circle cx="24" cy="44" r="2" />
      </svg>
    ),
  },
  {
    id: 'community',
    label: 'Zajednički Stol',
    description: 'Više od pekare — mjesto okupljanja. Gdje neznanci dijele kruh i postaju susjedi.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <rect x="8" y="20" width="32" height="4" rx="2" />
        <line x1="14" y1="24" x2="14" y2="40" />
        <line x1="34" y1="24" x2="34" y2="40" />
        <circle cx="16" cy="12" r="4" />
        <circle cx="32" cy="12" r="4" />
        <circle cx="24" cy="10" r="4" />
      </svg>
    ),
  },
  {
    id: 'ritual',
    label: 'Dnevni Ritual',
    description: 'Pečenje je čin predanosti. Svako jutro počinje u mraku, oblikujući tijesto osjećajem, instinktom.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <circle cx="24" cy="24" r="18" />
        <line x1="24" y1="10" x2="24" y2="24" />
        <line x1="24" y1="24" x2="34" y2="30" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="group text-center p-8 rounded-2xl transition-all duration-300 hover:shadow-lg bg-card"
    >
      <div
        className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-colors duration-300 text-grove bg-earth"
      >
        {pillar.icon}
      </div>
      <h3
        className="text-lg mb-3 tracking-wide font-serif text-depth"
      >
        {pillar.label}
      </h3>
      <p className="text-sm leading-relaxed text-secondary">
        {pillar.description}
      </p>
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <SectionReveal className="text-center mb-16 md:mb-20">
          <p className="section-label mb-4">Naša Filozofija</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Ručni rad.</span>{' '}
            Od srca. Dom.
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg font-serif italic text-secondary"
          >
            Od vlasnika Pa&apos;kai &#352;ibenik — doručak, brunch i artizanski kruh
            ujedinjeni u jednom konceptu.
          </p>
        </SectionReveal>

        {/* Split Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-28">
          {/* Video / Image Side */}
          <div className="relative aspect-4/5 rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/Snimka zaslona 2026-03-23 183618.png')",
                backgroundColor: 'var(--color-earth)',
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>

          {/* Text Side */}
          <SectionReveal className="space-y-6">
            <p
              className="drop-cap text-base leading-[1.85] text-foreground"
            >
              Okus Soli — &quot;Okus Soli&quot; — rođen je iz strasti Krešimira i Ksenije Glavina, koji su Šibeniku već podarili voljeni restoran Pa&apos;kai. Četiri godine sanjanja pronašle su dom na adresi Fausta Vran&#269;i&#263;a 9.
            </p>
            <p className="text-base leading-[1.85] text-secondary">
              Chef Krešo održava starter kiselog tijesta koji se uzgaja više od pet godina. Svaki kruh, svaka focaccia, svako pecivo počinje s tom živom kulturom — oblikovano rukom, fermentirano sa strpljenjem, pečeno s predanošću. Bez prečaca, bez kompromisa.
            </p>
            <p className="text-base leading-[1.85] text-secondary">
              Doručak i brunch susreću artizansko pečenje u jednom konceptu. Specialty kava, svježe cijeđeni sokovi, lokalna vina — bilo da držite toplu koricu ili keramičku šalicu, osjećaj bi trebao biti isti: <em className="text-hearth">ovdje pripadate.</em>
            </p>
          </SectionReveal>
        </div>

        {/* Philosophy Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
