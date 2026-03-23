'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASTER_EGG_HOURS } from '@/lib/constants';

interface EasterEggOverlay {
  type: 'quote' | 'recipe' | 'greeting';
  title?: string;
  content: string;
}

export function EasterEggs() {
  const [overlay, setOverlay] = useState<EasterEggOverlay | null>(null);
  const [shownEggs, setShownEggs] = useState<Set<string>>(new Set());

  const showEgg = useCallback((id: string, egg: EasterEggOverlay) => {
    if (shownEggs.has(id)) return;
    setShownEggs((prev) => new Set(prev).add(id));
    setOverlay(egg);
  }, [shownEggs]);

  // Sunrise / sunset greeting — check on mount only
  useEffect(() => {
    const h = new Date().getHours();
    const m = new Date().getMinutes();
    const timeout = setTimeout(() => {
      if (h === EASTER_EGG_HOURS.sunrise.hour && m < EASTER_EGG_HOURS.sunrise.maxMinutes) {
        showEgg('sunrise', {
          type: 'greeting',
          title: 'Good morning, early riser',
          content: 'The ovens are already warm. The first loaves are almost ready. You\'re right on time.',
        });
      } else if (h === EASTER_EGG_HOURS.sunset.hour && m < EASTER_EGG_HOURS.sunset.maxMinutes) {
        showEgg('sunset', {
          type: 'greeting',
          title: 'Golden hour',
          content: 'The day is winding down, but there\'s still time for one last cup. The terrace light is perfect right now.',
        });
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [showEgg]);

  // Escape key handler for overlay
  useEffect(() => {
    if (!overlay) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOverlay(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [overlay]);

  // Listen for custom events from other components
  useEffect(() => {
    const handleRecipe = () => {
      showEgg('recipe', {
        type: 'recipe',
        title: 'Grandmother\'s Focaccia',
        content: `You found our hidden recipe.\n\n500g strong bread flour\n380ml warm water\n10g salt\n7g active dry yeast\n3 tbsp olive oil\n\nMix flour, yeast, and water. Rest 10 minutes.\nAdd salt and oil. Knead 8 minutes until smooth.\nFirst rise: 1.5 hours, covered.\nStretch into an oiled baking tray.\nDimple with fingers. Drizzle generously with olive oil.\nTop with rosemary, flaky salt, cherry tomatoes.\nSecond rise: 30 minutes.\nBake at 220°C for 22–25 minutes.\n\nShare it with someone you love.`,
      });
    };

    const handleQuote = () => {
      showEgg('quote', {
        type: 'quote',
        content: '"Everything you see I owe to spaghetti." — Sophia Loren',
      });
    };

    const handleAllHotspots = () => {
      showEgg('hotspots', {
        type: 'greeting',
        title: 'The Perfect Spot',
        content: 'You\'ve explored every corner of our terrace. Clearly, you belong here. Next time you visit, tell us you found the perfect spot — coffee\'s on us.',
      });
    };

    window.addEventListener('okus:recipe', handleRecipe);
    window.addEventListener('okus:quote', handleQuote);
    window.addEventListener('okus:all-hotspots', handleAllHotspots);
    return () => {
      window.removeEventListener('okus:recipe', handleRecipe);
      window.removeEventListener('okus:quote', handleQuote);
      window.removeEventListener('okus:all-hotspots', handleAllHotspots);
    };
  }, [showEgg]);

  return (
    <AnimatePresence>
      {overlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-60 flex items-center justify-center p-6"
          style={{ background: 'rgba(42, 36, 34, 0.92)' }}
          onClick={() => setOverlay(null)}
          role="dialog"
          aria-modal="true"
          aria-label={overlay.title || 'Easter egg'}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full rounded-2xl p-8 md:p-10"
            style={{
              background: overlay.type === 'recipe'
                ? 'linear-gradient(135deg, #FDF8F0, #E3D9D2)'
                : 'var(--color-breath)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOverlay(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors text-bark"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Content */}
            {overlay.title && (
              <h3
                className="text-2xl mb-4 font-display text-depth"
              >
                {overlay.title}
              </h3>
            )}

            <div
              className="text-sm leading-relaxed whitespace-pre-line text-bark"
              style={{
                fontFamily: overlay.type === 'recipe' ? 'var(--font-serif)' : 'var(--font-sans)',
                lineHeight: overlay.type === 'recipe' ? 1.9 : 1.75,
              }}
            >
              {overlay.content}
            </div>

            {overlay.type === 'recipe' && (
              <p
                className="mt-6 text-xs uppercase tracking-widest text-center text-grove"
              >
                Hidden recipe unlocked
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
