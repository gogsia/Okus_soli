'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function ExitIntent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY < 10 &&
        !sessionStorage.getItem('okus-exit-shown')
      ) {
        setShow(true);
        sessionStorage.setItem('okus-exit-shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Escape key handler
  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-55 flex items-center justify-center p-6"
        style={{ background: 'rgba(42, 36, 34, 0.85)' }}
        onClick={() => setShow(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Stay a moment?"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-md w-full rounded-2xl p-8 text-center bg-breath"
        >
          <p
            className="text-2xl mb-2 font-display text-depth"
          >
            Stay a moment?
          </p>
          <p
            className="text-base mb-8 font-serif italic text-secondary"
          >
            The bread is almost ready. The coffee is still warm.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/menu"
              onClick={() => setShow(false)}
              className="px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] bg-sun text-depth font-sans font-medium"
            >
              Explore the Menu
            </Link>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all duration-200 border-[1.5px] border-earth text-secondary font-sans"
            >
              Maybe Later
            </button>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
