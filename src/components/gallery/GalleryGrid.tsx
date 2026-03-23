'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  chapter: string;
  caption?: string;
  behindTheLens?: string;
  aspectRatio?: string;
}

import { GALLERY_CHAPTERS } from '@/lib/constants';

const galleryChapters = GALLERY_CHAPTERS;

// Real Okus Soli photos by Valerio Baranović
const photos: GalleryPhoto[] = [
  { id: 'g1', src: '/images/Snimka zaslona 2026-03-23 183618.png', alt: 'Chef Krešo shaping dough in the kitchen', chapter: 'dawn', caption: 'Before the city wakes, Chef Krešo shapes the day\'s bread by hand.', behindTheLens: 'Photo by Valerio Baranović' },
  { id: 'g2', src: '/images/9.jpg', alt: 'Fresh sourdough loaves in wooden boxes', chapter: 'dawn', caption: 'From a 5-year starter. Every loaf tells a story.' },
  { id: 'g3', src: '/images/7.jpg', alt: 'Focaccia cross-section showing open crumb', chapter: 'dawn', caption: 'The crumb speaks. High hydration, slow fermentation.' },
  { id: 'g4', src: '/images/7.jpg', alt: 'Sourdough focaccia — golden crust and open crumb', chapter: 'the-rise', caption: 'Patience is the only ingredient you can\'t buy.' },
  { id: 'g5', src: '/images/9.jpg', alt: 'Bread display at the bakery window', chapter: 'the-rise', caption: 'Fresh every morning. Gone by afternoon.' },
  { id: 'g6', src: '/images/5.jpg', alt: 'Focaccia platter with butter, olives, and bread', chapter: 'the-rise', caption: 'The focaccia platter — young olive oil, specialty salts, capers.' },
  { id: 'g7', src: '/images/4.jpg', alt: 'Terrace table with coffee and bread', chapter: 'the-pour', caption: 'Morning coffee on the terrace. Šibenik stone, warm light.', behindTheLens: 'Photo by Valerio Baranović' },
  { id: 'g8', src: '/images/3.jpg', alt: 'Granola bowl with fresh juices', chapter: 'the-pour', caption: 'Fresh-pressed juices and house-made granola.' },
  { id: 'g9', src: '/images/1.jpg', alt: 'Brunch spread with scrambled eggs and granola', chapter: 'the-pour', caption: 'The full Okus Soli experience.' },
  { id: 'g10', src: '/images/1.jpg', alt: 'Scrambled eggs on brioche with fresh juice', chapter: 'the-table', caption: 'Creamy scrambled eggs on brioche. Simple, perfect.' },
  { id: 'g11', src: '/images/8.jpg', alt: 'Poached eggs on brioche with greens', chapter: 'the-table', caption: 'Poached eggs, basil pesto, fresh salad.', behindTheLens: 'Photo by Valerio Baranović' },
  { id: 'g12', src: '/images/kreso i zena.png', alt: 'Krešimir and Ksenija Glavina — the owners', chapter: 'the-table', caption: 'Krešimir and Ksenija. The heart and soul of Okus Soli.' },
  { id: 'g13', src: '/images/4.jpg', alt: 'Terrace with stone walls and wooden chairs', chapter: 'golden-hour', caption: 'The terrace at Fausta Vrančića 9.', behindTheLens: 'Photo by Valerio Baranović' },
  { id: 'g14', src: '/images/5.jpg', alt: 'Bread basket and olive platter on the counter', chapter: 'golden-hour', caption: 'Dalmatian flavors, artisan bread, and honest ingredients.' },
  { id: 'g15', src: '/images/3.jpg', alt: 'Morning light on granola and green juice', chapter: 'golden-hour', caption: 'Where every morning starts right.' },
];

export function GalleryGrid() {
  const [activeChapter, setActiveChapter] = useState('dawn');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const filtered = photos.filter((p) => p.chapter === activeChapter);

  const navigateLightbox = useCallback((direction: number) => {
    setLightboxPhoto((current) => {
      if (!current) return null;
      const currentIndex = filtered.findIndex((p) => p.id === current.id);
      if (currentIndex === -1) return current;
      const nextIndex = (currentIndex + direction + filtered.length) % filtered.length;
      return filtered[nextIndex];
    });
  }, [filtered]);

  // Focus trap + Escape key handler + body scroll lock for lightbox
  useEffect(() => {
    if (!lightboxPhoto) return;

    // Auto-focus the close button when lightbox opens
    closeBtnRef.current?.focus();

    // Lock body scroll
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxPhoto(null);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        navigateLightbox(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigateLightbox(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [lightboxPhoto, navigateLightbox]);

  return (
    <>
      {/* Chapter Nav */}
      <div className="flex justify-center gap-3 md:gap-6 mb-12 flex-wrap">
        {galleryChapters.map((ch) => (
          <button
            type="button"
            key={ch.id}
            onClick={() => setActiveChapter(ch.id)}
            className="text-sm md:text-base transition-all duration-300 pb-1 font-serif italic"
            style={{
              fontWeight: activeChapter === ch.id ? 600 : 400,
              color: activeChapter === ch.id ? 'var(--color-hearth)' : 'var(--text-secondary)',
              borderBottom: activeChapter === ch.id ? '2px solid var(--color-hearth)' : '2px solid transparent',
            }}
          >
            {ch.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChapter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="gallery-item rounded-xl overflow-hidden cursor-pointer group relative"
              onClick={() => setLightboxPhoto(photo)}
              role="button"
              tabIndex={0}
              aria-label={`View ${photo.alt}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxPhoto(photo);
                }
              }}
            >
              <div
                className="aspect-4/3 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${photo.src})`,
                  backgroundColor: 'var(--color-earth)',
                }}
              />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-white/90 font-serif italic">
                    {photo.caption}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            onClick={() => setLightboxPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxPhoto.alt}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                ref={closeBtnRef}
                onClick={() => setLightboxPhoto(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white text-sm uppercase tracking-widest"
                aria-label="Close lightbox"
              >
                Close
              </button>

              {/* Prev/Next buttons */}
              {filtered.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Previous photo"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Next photo"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}

              <div
                className="w-full aspect-3/2 rounded-xl bg-cover bg-center"
                style={{
                  backgroundImage: `url(${lightboxPhoto.src})`,
                  backgroundColor: 'var(--color-earth)',
                }}
              />
              {lightboxPhoto.caption && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-center mt-6 text-white/80 text-lg font-serif italic"
                >
                  {lightboxPhoto.caption}
                </motion.p>
              )}
              {lightboxPhoto.behindTheLens && (
                <motion.aside
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="mt-4 flex items-start gap-3 text-white/60 text-sm max-w-lg mx-auto"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 shrink-0">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <p>{lightboxPhoto.behindTheLens}</p>
                </motion.aside>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
