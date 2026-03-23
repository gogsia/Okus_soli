'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FlourParticles } from './FlourParticles';

const charVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.035, duration: 0.6, ease: [0.33, 1, 0.68, 1] as const },
  }),
};

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const headline = 'Okus Soli by Pa\u2019kai';

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      aria-label="Hero — Where Craft Meets Comfort"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Poster fallback */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: "url('/images/hero-poster.webp')",
            backgroundColor: 'var(--color-earth)',
          }}
        />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/hero-poster.webp"
          // @ts-expect-error -- fetchPriority is valid HTML but not yet in React types
          fetchPriority="high"
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Bakery ambiance — bread scoring, coffee pour, and terrace morning light"
        >
          <source src="/video/hero-loop.webm" type="video/webm" />
          <source src="/video/hero-loop.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/50" />
      </div>

      {/* Flour Dust Particles */}
      <FlourParticles />

      {/* Texture Overlay */}
      <div className="absolute inset-0 z-1 texture-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="section-label mb-6 text-sun"
        >
          Breakfast, Brunch &amp; Artisan Baking &#8212; &#352;ibenik
        </motion.p>

        {/* Headline — Character-by-character animation */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wide font-display text-breath"
        >
          {headline.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={charVariants}
              className="inline-block"
              style={{ marginRight: char === ' ' ? '0.25em' : '0' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-lg md:text-xl mb-10 max-w-xl mx-auto font-serif italic text-cream font-normal"
        >
          Sourdough from a 5-year starter. Focaccia, fresh pastries &amp; specialty coffee. Fausta Vran&#269;i&#263;a 9, &#352;ibenik.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Link
            href="/menu"
            className="cta-breathe inline-block px-10 py-4 rounded-full text-sm uppercase tracking-[0.15em] font-medium transition-all duration-220 hover:scale-[1.02] bg-sun text-depth font-sans"
          >
            Explore the Menu
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5EDE0" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
