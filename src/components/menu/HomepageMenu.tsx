'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const highlights = [
  {
    id: 'sourdough',
    name: 'Sourdough Bread',
    note: 'From our 5-year starter, baked fresh every morning',
    category: 'Bread',
    imageUrl: '/images/menu/sourdough.webp',
  },
  {
    id: 'focaccia',
    name: 'Focaccia Platter',
    note: 'With flavored butter, capers, young olive oil & specialty salts',
    category: 'Signature',
    imageUrl: '/images/menu/focaccia.webp',
  },
  {
    id: 'mortadella',
    name: 'Mortadella Sandwich',
    note: 'Premium mortadella with house-made pistachio mayo',
    category: 'Brunch',
    imageUrl: '/images/menu/croissant.webp',
  },
];

export function HomepageMenu() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} id="menu" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">The Daily Offering</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">A Taste</span> of What Awaits
          </h2>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Breakfast &amp; brunch served all day. Mon&#8211;Sat, 9&#8211;3.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {highlights.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group rounded-2xl overflow-hidden bg-card"
            >
              <div
                className="aspect-4/3 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                  backgroundColor: 'var(--color-earth)',
                }}
              />
              <div className="p-5">
                <span className="section-label text-[10px]">{item.category}</span>
                <h3
                  className="text-lg mt-1 mb-1 font-serif font-medium"
                >
                  {item.name}
                </h3>
                <p className="text-sm text-secondary">
                  {item.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/menu"
            className="inline-block px-10 py-4 rounded-full text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:scale-[1.02] bg-sun text-depth font-sans font-medium"
          >
            See Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
