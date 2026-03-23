'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMood } from '@/components/mood/MoodProvider';

const PANORAMA_IMAGES: Record<string, string> = {
  DAWN_CRISP: '/images/4.jpg',
  MIDDAY_FULL: '/images/4.jpg',
  AMBER_HOUR: '/images/4.jpg',
  NOCTURNE: '/images/4.jpg',
};

export function TerracePanorama() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const dragStart = useRef(0);
  const offsetStart = useRef(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const prefersReduced = useReducedMotion();
  const mood = useMood();
  const autoRef = useRef<number>(0);

  const panoramaSrc = PANORAMA_IMAGES[mood];

  // Auto-pan when not dragging
  useEffect(() => {
    if (prefersReduced || isDragging) return;

    let lastTime = performance.now();
    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      setOffset((prev) => prev - delta * 0.008); // slow pan
      autoRef.current = requestAnimationFrame(animate);
    };
    autoRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(autoRef.current);
  }, [prefersReduced, isDragging]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    offsetStart.current = offset;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [offset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current;
    setOffset(offsetStart.current + dx * 0.5);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = panoramaSrc;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [panoramaSrc]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden select-none bg-earth"
      style={{
        height: 360,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="img"
      aria-label="360-degree panoramic view of the Okus Soli terrace. Drag to look around."
    >
      {imageLoaded ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${panoramaSrc})`,
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'repeat-x',
            backgroundPositionX: `${offset}px`,
            transition: isDragging ? 'none' : undefined,
          }}
        />
      ) : (
        // Fallback gradient when panorama image isn't available
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg,
              var(--color-earth) 0%,
              var(--color-breath) 25%,
              var(--color-grove) 50%,
              var(--color-earth) 75%,
              var(--color-breath) 100%)`,
            backgroundSize: '300% 100%',
            backgroundPositionX: `${offset * 0.2}px`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3 text-grove">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <p className="text-sm font-serif italic text-bark">
                Drag to explore the terrace
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gradient edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-earth/30 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-earth/30 to-transparent pointer-events-none" />

      {/* Drag instruction */}
      {!isDragging && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs bg-black/30 text-white/80 backdrop-blur-sm pointer-events-none font-sans">
          <span className="inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Drag to explore
          </span>
        </div>
      )}
    </div>
  );
}
