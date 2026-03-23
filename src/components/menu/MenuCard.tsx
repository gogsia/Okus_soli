'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'breads' | 'breakfast' | 'coffee' | 'appetizers';
  imageUrl: string;
  imageAlt: string;
  allergens?: string[];
  isBakersChoice?: boolean;
  bakersNote?: string;
  seasonal?: boolean;
}

export function MenuCard({ item }: { item: MenuItem }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.article
      layout
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-card"
      onMouseEnter={() => setRevealed(true)}
      onFocus={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onBlur={() => setRevealed(false)}
      aria-label={`${item.name} — ${item.description}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {/* Silhouette placeholder */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 bg-earth"
          style={{
            opacity: revealed ? 0 : 0.3,
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url(${item.imageUrl})`,
            backgroundColor: 'var(--color-earth)',
            opacity: revealed ? 1 : 0.7,
            transform: revealed ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Baker's Choice Badge */}
        {item.isBakersChoice && (
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs uppercase tracking-widest bg-sun text-depth font-sans font-medium"
          >
            Baker&apos;s Choice
          </div>
        )}

        {item.seasonal && (
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs uppercase tracking-widest bg-grove text-breath font-sans font-medium"
          >
            Seasonal
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-5">
        <h3
          className="text-lg mb-1 tracking-wide font-serif font-medium"
        >
          {item.name}
        </h3>
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3, ease: [0.2, 0.9, 0.4, 1.1] }}
            >
              <p className="text-sm mb-2 text-secondary">
                {item.description}
              </p>
              {item.bakersNote && (
                <p className="text-xs italic text-hearth">
                  &ldquo;{item.bakersNote}&rdquo;
                </p>
              )}
              {item.allergens && item.allergens.length > 0 && (
                <p className="text-xs mt-2 text-secondary" style={{ opacity: 0.7 }}>
                  Contains: {item.allergens.join(', ')}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
