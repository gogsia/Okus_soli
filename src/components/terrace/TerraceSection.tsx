'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

const TerracePanorama = dynamic(
  () => import('./TerracePanorama').then((m) => ({ default: m.TerracePanorama })),
  { ssr: false, loading: () => <div className="w-full rounded-2xl bg-earth" style={{ height: 360 }} /> }
);

interface Hotspot {
  id: string;
  label: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
}

const hotspots: Hotspot[] = [
  { id: 'olive-grove', label: 'Olive Grove Corner', description: 'Perfect for hot afternoons. The oldest tree provides natural shade all day.', x: 15, y: 40 },
  { id: 'communal-table', label: 'Long Communal Table', description: 'Where strangers become friends. Seats 12. Always full on weekends.', x: 50, y: 55 },
  { id: 'window-nook', label: 'Window Reading Nook', description: 'A single chair, morning light, and a book. Our quietest seat.', x: 80, y: 35 },
  { id: 'herb-garden', label: 'Herb Garden Wall', description: 'Basil, rosemary, thyme — pick your own garnish.', x: 25, y: 70 },
  { id: 'fire-pit', label: 'Evening Fire Circle', description: 'Lit at sunset. Where coffee becomes conversation.', x: 65, y: 75 },
  { id: 'counter-seats', label: 'Baker\'s Counter', description: 'Watch the bread being shaped. Front-row seats to the craft.', x: 40, y: 30 },
  { id: 'family-corner', label: 'Family Corner', description: 'Lower table, wider chairs. Crayons provided. Crumbs welcome.', x: 75, y: 60 },
  { id: 'sunset-terrace', label: 'Sunset Terrace', description: 'West-facing. The golden hour hits here first. Best seat after 5pm.', x: 90, y: 45 },
];

export function TerraceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [exploredCount, setExploredCount] = useState(0);
  const [explored, setExplored] = useState<Set<string>>(new Set());

  const handleHotspotClick = useCallback((hotspot: Hotspot) => {
    setActiveHotspot(hotspot);
    setExplored((prev) => {
      const next = new Set(prev);
      next.add(hotspot.id);
      setExploredCount(next.size);
      if (next.size === hotspots.length) {
        window.dispatchEvent(new CustomEvent('okus:all-hotspots'));
      }
      return next;
    });
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">Your New Favorite Spot</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">The</span> Terrace
          </h2>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Eight unique spots, each with its own character. Explore them all.
          </p>
          {exploredCount > 0 && (
            <p className="mt-3 text-xs uppercase tracking-widest text-grove" aria-live="polite">
              {exploredCount} of {hotspots.length} spots explored
            </p>
          )}
        </div>

        {/* 360° Panorama */}
        <div className="mb-12">
          <TerracePanorama />
        </div>

        {/* Interactive Hotspot Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-earth"
        >
          {/* Panorama Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{
              backgroundImage: "url('/panorama/terrace-midday.jpg')",
              backgroundColor: 'var(--color-earth)',
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

          {/* Hotspots */}
          {hotspots.map((hotspot) => (
            <button
              type="button"
              key={hotspot.id}
              onClick={() => handleHotspotClick(hotspot)}
              className="absolute z-10 group"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
              aria-label={`Explore ${hotspot.label}`}
              aria-expanded={activeHotspot?.id === hotspot.id}
            >
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{
                  background: explored.has(hotspot.id) ? 'var(--color-grove)' : 'var(--color-sun)',
                  animationDuration: '2s',
                  width: '32px',
                  height: '32px',
                  margin: '-4px',
                }}
              />
              {/* Dot */}
              <span
                className="relative block w-6 h-6 rounded-full border-2 border-white/80 transition-transform duration-300 group-hover:scale-125"
                style={{
                  background: explored.has(hotspot.id) ? 'var(--color-grove)' : 'var(--color-sun)',
                }}
              />
              {/* Label on hover */}
              <span
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap px-3 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 bg-depth text-cream font-sans"
              >
                {hotspot.label}
              </span>
            </button>
          ))}

          {/* Instruction overlay */}
          {!activeHotspot && exploredCount === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p
                className="px-6 py-3 rounded-full text-sm bg-black/40 text-white/80 backdrop-blur-sm font-serif italic"
              >
                Click the golden dots to explore our terrace
              </p>
            </div>
          )}
        </motion.div>

        {/* Hotspot Detail Panel */}
        {activeHotspot && (
          <motion.div
            key={activeHotspot.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 max-w-lg mx-auto text-center"
          >
            <h3
              className="text-xl mb-2 font-serif font-medium"
            >
              {activeHotspot.label}
            </h3>
            <p className="text-sm text-secondary">
              {activeHotspot.description}
            </p>
          </motion.div>
        )}

        {/* All explored badge */}
        {exploredCount === hotspots.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center"
          >
            <p
              className="inline-block px-6 py-3 rounded-full text-sm bg-grove text-breath font-sans"
            >
              You found the perfect spot — all {hotspots.length} explored!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
