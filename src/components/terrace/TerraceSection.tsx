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
  { id: 'olive-grove', label: 'Kutak Maslinika', description: 'Savršen za vruća popodneva. Najstarije stablo pruža prirodni hlad cijeli dan.', x: 15, y: 40 },
  { id: 'communal-table', label: 'Dugački Zajednički Stol', description: 'Gdje neznanci postaju prijatelji. 12 mjesta. Uvijek pun vikendom.', x: 50, y: 55 },
  { id: 'window-nook', label: 'Kutak za Čitanje kod Prozora', description: 'Jedna stolica, jutarnje svjetlo i knjiga. Naše najtiše mjesto.', x: 80, y: 35 },
  { id: 'herb-garden', label: 'Zid Začinskog Vrta', description: 'Bosiljak, ružmarin, timijan — uberite svoj vlastiti ukras.', x: 25, y: 70 },
  { id: 'fire-pit', label: 'Večernji Krug kod Vatre', description: 'Upaljen na zalasku sunca. Gdje kava postaje razgovor.', x: 65, y: 75 },
  { id: 'counter-seats', label: 'Pekarski Pult', description: 'Gledajte kako se kruh oblikuje. Sjedala u prvom redu za zanat.', x: 40, y: 30 },
  { id: 'family-corner', label: 'Obiteljski Kutak', description: 'Niži stol, šire stolice. Bojice osigurane. Mrvice dobrodošle.', x: 75, y: 60 },
  { id: 'sunset-terrace', label: 'Terasa za Zalazak Sunca', description: 'Okrenuta zapadu. Zlatni sat ovdje stiže prvi. Najbolje mjesto nakon 17h.', x: 90, y: 45 },
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
          <p className="section-label mb-4">Vaše Novo Omiljeno Mjesto</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-display"
          >
            <span className="text-sun">Naša</span> Terasa
          </h2>
          <p
            className="max-w-xl mx-auto text-lg font-serif italic text-secondary"
          >
            Osam jedinstvenih mjesta, svako s vlastitim karakterom. Istražite ih sve.
          </p>
          {exploredCount > 0 && (
            <p className="mt-3 text-xs uppercase tracking-widest text-grove" aria-live="polite">
              {exploredCount} od {hotspots.length} mjesta istraženo
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
                Kliknite na zlatne točke za istraživanje naše terase
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
              Pronašli ste savršeno mjesto — svih {hotspots.length} istraženo!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
