'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const chapters = [
  {
    id: 1,
    title: 'The Spark',
    year: '2018',
    text: 'It started with a question no one asked: what if a bakery could make you feel the way a grandmother\'s kitchen does? Not nostalgia — but genuine belonging. We didn\'t have a business plan. We had a sourdough starter and a conviction.',
    bgColor: '#E3D9D2',
  },
  {
    id: 2,
    title: 'The First Oven',
    year: '2019',
    text: 'A converted garage. A second-hand deck oven. Flour on every surface, including the ceiling. The first loaf wasn\'t perfect — it was better than perfect. It was real. Friends came. Then their friends. Then strangers who became friends.',
    bgColor: '#C27E5A',
  },
  {
    id: 3,
    title: 'The Door Opens',
    year: '2020',
    text: 'We found the building — terracotta roof, olive tree in the courtyard, and a kitchen large enough to dream in. The world was uncertain. We opened anyway. People needed warm bread more than ever.',
    bgColor: '#7A8B6B',
  },
  {
    id: 4,
    title: 'The Community',
    year: '2021',
    text: 'A bread subscription was born from necessity and became a lifeline. Regulars left notes in the tip jar. A retired teacher started reading to children on Saturday mornings. The bakery stopped being ours — it became everyone\'s.',
    bgColor: '#E4B363',
  },
  {
    id: 5,
    title: 'The Coffee Chapter',
    year: '2022',
    text: 'We traveled to origin — Huila, Yirgacheffe, Antigua. We met farmers whose hands look like ours: calloused, flour-dusted, proud. We brought their coffee home and roasted it with the same care we give our bread.',
    bgColor: '#3A2C29',
  },
  {
    id: 6,
    title: 'Today & Tomorrow',
    year: 'Now',
    text: 'Every morning, the oven breathes to life before the sun. Every evening, we sweep flour from the floor and start the levain for tomorrow. The question we started with hasn\'t changed. The answer gets deeper every day.',
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
              backgroundImage: `url(/images/story/chapter-${chapter.id}.webp)`,
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
