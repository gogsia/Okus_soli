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
  { day: 'Monday–Saturday', open: '09:00', close: '15:00', note: 'Breakfast & brunch all day', rushNote: 'Morning rush 09:00–11:00' },
  { day: 'Sunday', open: 'Closed', close: 'Closed', note: 'See you Monday!' },
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
            <p>Fausta Vran&#269;i&#263;a 9</p>
            <p>&#352;ibenik 22000</p>
            <p>Croatia</p>
          </address>
          <div className="mt-4 flex gap-4">
            <a
              href="tel:+385991684830"
              className="text-sm transition-colors duration-200 text-hearth"
            >
              +385 99 168 4830
            </a>
            <span className="text-earth">|</span>
            <a
              href="https://www.instagram.com/okus_solibypakai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors duration-200 text-hearth"
            >
              @okus_solibypakai
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
              Short walk from &#352;ibenik Old Town, along Fausta Vran&#269;i&#263;a street
            </p>
            <p>
              <strong className="text-foreground font-medium">By car:</strong>{' '}
              Public parking available nearby in &#352;ibenik city centre
            </p>
            <p>
              <strong className="text-foreground font-medium">Reservations:</strong>{' '}
              Call +385 99 168 4830
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
