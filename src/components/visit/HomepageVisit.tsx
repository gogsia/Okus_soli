'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocalTime } from '@/hooks/useLocalTime';

export function HomepageVisit() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const time = useLocalTime();

  return (
    <section
      ref={ref}
      id="visit"
      className="py-24 md:py-32 relative bg-earth"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-4">Come for the Bread</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            Your Table <span className="text-hearth">is Waiting</span>
          </h2>

          {/* Status */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: time.isOpen ? 'var(--color-grove)' : 'var(--color-hearth)',
                boxShadow: time.isOpen ? '0 0 8px rgba(122, 139, 107, 0.5)' : 'none',
              }}
            />
            <span
              className="text-sm uppercase tracking-widest font-sans font-normal"
              style={{
                color: time.isOpen ? 'var(--color-grove)' : 'var(--color-hearth)',
              }}
            >
              {time.statusText}
            </span>
          </div>

          <p
            className="max-w-lg mx-auto text-lg mb-10 font-serif italic text-secondary"
          >
            Fausta Vran&#269;i&#263;a 9, &#352;ibenik, Croatia
          </p>

          <Link
            href="/visit"
            className="cta-breathe inline-block px-10 py-4 rounded-full text-sm uppercase tracking-[0.15em] font-medium transition-all duration-220 hover:scale-[1.02] bg-sun text-depth font-sans"
          >
            Plan Your Visit
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
