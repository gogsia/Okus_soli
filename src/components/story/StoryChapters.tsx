'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const chapters = [
  {
    id: 1,
    title: 'Pa\u2019kai — Temelj',
    year: 'Ranije',
    text: 'Kre\u0161imir i Ksenija Glavina izgradili su Pa\u2019kai u jedan od najdražih restorana \u0160ibenika. Međunarodna kuhinja, ocjena 4.8 od 5 i vjerna publika. Ali tu je bio još jedan san \u2014 onaj koji je mirisao na kiselo tijesto.',
    bgColor: '#E3D9D2',
  },
  {
    id: 2,
    title: 'Starter se Budi',
    year: 'Prije 5 Godina',
    text: 'Chef Kre\u0161o počeo je uzgajati starter kiselog tijesta \u2014 hraneći ga svaki dan, učeći njegove ritmove, razumijevajući njegove raspoloženja. Ta živa kultura postala bi duša svega što Okus Soli stvara: kruha, focaccie, peciva.',
    bgColor: '#C27E5A',
  },
  {
    id: 3,
    title: 'Prostor nas je Pronašao',
    year: 'Prije 4 Godine',
    text: 'Hodajući niz ulicu Fausta Vran\u010Di\u0107a, uočili su prostor \u2014 samo dvoja vrata od Pa\u2019kai. Bio je savršen. Ali vrijeme nije bilo pravo. Čekali su. Četiri godine držali su viziju.',
    bgColor: '#7A8B6B',
  },
  {
    id: 4,
    title: 'Novo Poglavlje',
    year: '8. Studenog',
    text: '\u201CLjudi Kre\u0107emo!\u201D Starter se probudio. Okus Soli otvorio je svoja vrata na Fausta Vran\u010Di\u0107a 9 s doručkom, brunchom i aromom svježe pečenog kiselog tijesta koja je ispunila ulicu.',
    bgColor: '#E4B363',
  },
  {
    id: 5,
    title: 'Koncept',
    year: 'Danas',
    text: 'Doručak, brunch i artizansko pečenje ujedinjeni u jednom konceptu. Granola s jogurtom i voćem. Poširana jaja na briochu. Mortadella s pistacija majonezom. Focaccia s aromatiziranim maslacem i mladim maslinovim uljem. Specialty kava. Svako jutro, od 9 do 15.',
    bgColor: '#3A2C29',
  },
  {
    id: 6,
    title: 'Obitelj Raste',
    year: 'Sutra',
    text: 'S otvaranjem terase u proljeće i produženim radnim vremenom na vidiku, Okus Soli postaje više od pekare \u2014 to je \u0160ibenički jutarnji ritual. Mjesto gdje dan počinje toplom koricom, dobrom kavom i okusom soli u zraku.',
    bgColor: '#FDF8F0',
  },
];

function Chapter({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const prefersReduced = useReducedMotion();
  const gsapRef = useRef<{ ctx?: { revert: () => void } }>({});

  // GSAP ScrollTrigger for parallax on the image
  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    let ctx: { revert: () => void } | undefined;

    (async () => {
      try {
        const gsapModule = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        const gsap = gsapModule.default || gsapModule;
        gsap.registerPlugin(ScrollTrigger);

        const imageEl = el.querySelector('.chapter-image');
        const textEl = el.querySelector('.chapter-text');
        if (!imageEl || !textEl) return;

        ctx = gsap.context(() => {
          gsap.fromTo(
            imageEl,
            { y: 30 },
            {
              y: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }, el);
        gsapRef.current.ctx = ctx;
      } catch {
        // GSAP not available, degrade gracefully
      }
    })();

    return () => {
      ctx?.revert();
    };
  }, [prefersReduced]);

  const isLight = chapter.id === 5; // dark background needs light text

  return (
    <motion.div
      ref={ref}
      className="min-h-[60vh] flex items-center py-16"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Visual */}
        <div
          className={`chapter-image aspect-4/3 rounded-2xl overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}
        >
          <div
            className="w-full h-full rounded-2xl bg-cover bg-center"
            style={{
              backgroundImage: `url(${[
                '/images/kreso-i-zena.png',
                '/images/7.jpg',
                '/images/4.jpg',
                '/images/9.jpg',
                '/images/5.jpg',
                '/images/Snimka zaslona 2026-03-23 183618.png',
              ][chapter.id - 1]})`,
              backgroundColor: chapter.bgColor,
            }}
          />
        </div>

        {/* Text */}
        <motion.div
          className={`chapter-text ${index % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="section-label">{chapter.year}</span>
          <h3
            className="text-3xl md:text-4xl mt-2 mb-4 font-display"
            style={{
              color: isLight ? 'var(--color-breath)' : undefined,
            }}
          >
            {chapter.title}
          </h3>
          <p className="text-base leading-[1.85] text-secondary">
            {chapter.text}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function StoryChapters() {
  return (
    <div className="space-y-8">
      {chapters.map((chapter, i) => (
        <Chapter key={chapter.id} chapter={chapter} index={i} />
      ))}
    </div>
  );
}
