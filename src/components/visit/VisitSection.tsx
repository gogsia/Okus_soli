'use client';

import { useLocalTime } from '@/hooks/useLocalTime';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

const BakeryMap = dynamic(
  () => import('./BakeryMap').then((m) => ({ default: m.BakeryMap })),
  { ssr: false, loading: () => <div className="rounded-2xl min-h-100 bg-earth" /> }
);

const hoursData = [
  { day: 'Monday–Friday', open: '07:00', close: '19:00', note: 'Quietest window: 14:00–16:00', rushNote: 'Morning rush 08:00–09:30' },
  { day: 'Saturday', open: '08:00', close: '20:00', note: 'Brunch buzz 10:00–13:00' },
  { day: 'Sunday', open: '08:00', close: '18:00', note: 'Slow Sunday mornings. Family-friendly.' },
];

export function VisitSection() {
  const time = useLocalTime();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-12 md:gap-16">
      {/* Left — Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ background: time.isOpen ? '#7A8B6B' : '#C27E5A' }}
          />
          <span
            className="text-sm uppercase tracking-widest font-medium font-sans"
            style={{
              color: time.isOpen ? 'var(--color-grove)' : 'var(--color-hearth)',
            }}
            aria-live="polite"
          >
            {time.statusText}
          </span>
        </div>

        {/* Hours */}
        <div>
          <h3
            className="text-xl mb-6 font-serif font-medium"
          >
            Opening Hours
          </h3>
          <div className="space-y-4">
            {hoursData.map((h) => (
              <div
                key={h.day}
                className="flex justify-between items-start pb-4 border-b border-earth"
              >
                <div>
                  <p className="font-medium text-sm font-sans">
                    {h.day}
                  </p>
                  <p className="text-xs mt-1 text-secondary">
                    {h.note}
                  </p>
                </div>
                <time
                  className="text-sm tabular-nums font-sans text-secondary"
                  dateTime={`${h.open}/${h.close}`}
                >
                  {h.open} — {h.close}
                </time>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div>
          <h3
            className="text-xl mb-4 font-serif font-medium"
          >
            Find Us
          </h3>
          <address className="not-italic text-sm leading-relaxed text-secondary">
            <p>123 Olive Grove Lane</p>
            <p>Mediterranean Quarter</p>
            <p>Sunstone, ST 10042</p>
          </address>
          <div className="mt-4 flex gap-4">
            <a
              href="tel:+1234567890"
              className="text-sm transition-colors duration-200 text-hearth"
            >
              +1 (234) 567-890
            </a>
            <span className="text-earth">|</span>
            <a
              href="mailto:hello@okussoli.com"
              className="text-sm transition-colors duration-200 text-hearth"
            >
              hello@okussoli.com
            </a>
          </div>
        </div>

        {/* Getting Here */}
        <div>
          <h3
            className="text-xl mb-4 font-serif font-medium"
          >
            Getting Here
          </h3>
          <div className="space-y-3 text-sm text-secondary">
            <p>
              <strong className="text-foreground font-medium">By foot:</strong>{' '}
              10-minute walk from Old Town Square
            </p>
            <p>
              <strong className="text-foreground font-medium">By transit:</strong>{' '}
              Line 4 to Olive Market stop, 2-minute walk east
            </p>
            <p>
              <strong className="text-foreground font-medium">Parking:</strong>{' '}
              Free street parking on weekends. Municipal lot 50m north.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right — Map */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative min-h-100 md:min-h-0"
      >
        <BakeryMap />
      </motion.div>
    </div>
  );
}
