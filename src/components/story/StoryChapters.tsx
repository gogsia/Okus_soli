'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const chapters = [
  {
    id: 1,
    title: 'Pa\u2019kai — The Foundation',
    year: 'Earlier',
    text: 'Kre\u0161imir and Ksenija Glavina built Pa\u2019kai into one of \u0160ibenik\u2019s most beloved restaurants. International cuisine, a rating of 4.8 out of 5, and a loyal following. But there was another dream brewing \u2014 one that smelled of sourdough.',
    bgColor: '#E3D9D2',
  },
  {
    id: 2,
    title: 'The Starter Awakens',
    year: '5 Years Ago',
    text: 'Chef Kre\u0161o began cultivating a sourdough starter \u2014 feeding it daily, learning its rhythms, understanding its moods. That living culture would become the soul of everything Okus Soli creates: bread, focaccia, pastries.',
    bgColor: '#C27E5A',
  },
  {
    id: 3,
    title: 'The Space Found Us',
    year: '4 Years Ago',
    text: 'Walking down Fausta Vran\u010Di\u0107a street, they spotted the space \u2014 just two doors from Pa\u2019kai. It was perfect. But the timing wasn\u2019t right. They waited. For four years, they held the vision.',
    bgColor: '#7A8B6B',
  },
  {
    id: 4,
    title: 'A New Chapter',
    year: 'November 8',
    text: '\u201CLjudi Kre\u0107emo!\u201D \u2014 \u201CPeople, let\u2019s go!\u201D The starter had awakened. Okus Soli opened its doors at Fausta Vran\u010Di\u0107a 9 with breakfast, brunch, and the aroma of freshly baked sourdough filling the street.',
    bgColor: '#E4B363',
  },
  {
    id: 5,
    title: 'The Concept',
    year: 'Today',
    text: 'Breakfast, brunch, and artisan baking united in a single concept. Granola with yogurt and fruit. Poached eggs on brioche. Mortadella with pistachio mayo. Focaccia with flavored butter and young olive oil. Specialty coffee. Every morning, 9 to 3.',
    bgColor: '#3A2C29',
  },
  {
    id: 6,
    title: 'The Family Grows',
    year: 'Tomorrow',
    text: 'With the terrace opening in spring and extended hours on the horizon, Okus Soli is becoming more than a bakery \u2014 it\u2019s \u0160ibenik\u2019s morning ritual. A place where the day begins with warm crust, good coffee, and the taste of salt in the air.',
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
