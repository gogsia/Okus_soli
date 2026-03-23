'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const previewPhotos = [
  { id: 'p1', src: '/images/gallery/dawn-1.webp', alt: 'Baker arriving before sunrise', span: 'sm:col-span-2 sm:row-span-2' },
  { id: 'p2', src: '/images/gallery/pour-1.webp', alt: 'Coffee pour', span: '' },
  { id: 'p3', src: '/images/gallery/rise-2.webp', alt: 'Scoring bread', span: '' },
  { id: 'p4', src: '/images/gallery/golden-1.webp', alt: 'Golden hour exterior', span: 'col-span-2' },
];

export function HomepageGallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} id="gallery" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">A Taste of Our World</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Moments</span> We Treasure
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
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
