'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const highlights = [
  {
    id: 'sourdough',
    name: 'Kruh od Kiselog Tijesta',
    note: 'Iz našeg 5-godišnjeg startera, svježe pečen svako jutro',
    category: 'Kruh',
    imageUrl: '/images/9.jpg',
  },
  {
    id: 'focaccia',
    name: 'Focaccia Pladanj',
    note: 'S aromatiziranim maslacem, kaparima, mladim maslinovim uljem i specijalnim solima',
    category: 'Zaštitni Znak',
    imageUrl: '/images/5.jpg',
  },
  {
    id: 'mortadella',
    name: 'Mortadella Sendvič',
    note: 'Premium mortadella s domaćom pistacija majonezom',
    category: 'Brunch',
    imageUrl: '/images/1.jpg',
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
          <p className="section-label mb-4">Dnevna Ponuda</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Okus</span> Onoga Što Čeka
          </h2>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Doručak i brunch cijeli dan. Pon&#8211;Sub, 9&#8211;15.
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
            Pogledaj Cijeli Jelovnik
          </Link>
        </div>
      </div>
    </section>
  );
}
