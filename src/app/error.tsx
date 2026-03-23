'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Okus Soli] Application error:', error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <span
          aria-hidden="true"
          className="block text-6xl mb-4 font-display text-earth"
        >
          Ups
        </span>
        <h1
          className="text-3xl md:text-4xl mb-4 font-display"
        >
          Nešto je pošlo po krivu
        </h1>
        <p
          className="text-lg mb-8 font-serif italic text-secondary"
        >
          I najboljim pećima treba trenutak za oporavak. Pokušajmo ponovo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="px-8 py-3 rounded-full text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:scale-[1.02] bg-sun text-depth font-sans font-medium"
          >
            Pokušaj ponovo
          </button>
          <Link
            href="/"
            className="px-8 py-3 rounded-full text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:scale-[1.02] border-[1.5px] border-hearth text-hearth font-sans"
          >
            Povratak
          </Link>
        </div>
      </div>
    </main>
  );
}
