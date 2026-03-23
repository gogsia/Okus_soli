'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const previewPhotos = [
  { id: 'p1', src: '/images/Snimka zaslona 2026-03-23 183618.png', alt: 'Chef Krešo oblikuje tijesto', span: 'sm:col-span-2 sm:row-span-2' },
  { id: 'p2', src: '/images/7.jpg', alt: 'Presjek focaccie', span: '' },
  { id: 'p3', src: '/images/8.jpg', alt: 'Poširana jaja na briochu', span: '' },
  { id: 'p4', src: '/images/4.jpg', alt: 'Stol na terasi s kavom', span: 'col-span-2' },
];

export function HomepageGallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} id="gallery" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Okus Našeg Svijeta</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Trenuci</span> Koje Čuvamo
          </h2>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
          {previewPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`gallery-item rounded-xl overflow-hidden ${photo.span}`}
            >
              <div
                className="w-full h-full min-h-50 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${photo.src})`,
                  backgroundColor: 'var(--color-earth)',
                }}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-block px-8 py-3 rounded-full text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:scale-[1.02] border-[1.5px] border-hearth text-hearth font-sans"
          >
            Pogledaj Cijelu Galeriju
          </Link>
        </div>
      </div>
    </section>
  );
}
