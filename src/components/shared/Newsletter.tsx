'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Subscription failed');

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <p
          className="text-lg mb-2 font-serif italic text-cream"
        >
          Welcome to the table.
        </p>
        <p className="text-sm opacity-60 text-cream">
          You&apos;ll hear from us when something beautiful comes out of the oven.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <h4
        className="text-xl mb-2 font-serif text-cream"
      >
        From Our Oven to Your Inbox
      </h4>
      <p className="text-sm mb-6 opacity-60 text-cream">
        Seasonal menus, new roasts, and the occasional hidden recipe. No spam — just warmth.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-5 py-3 rounded-full text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-(--color-sun) text-cream font-sans"
          style={{
            background: 'rgba(245, 237, 224, 0.12)',
            border: '1px solid rgba(245, 237, 224, 0.2)',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 bg-sun text-depth font-sans font-medium"
        >
          {status === 'loading' ? '...' : 'Join'}
        </button>
      </form>

      {status === 'error' && (
        <p className="text-xs mt-3 text-hearth">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
