'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const PARTICLE_COUNT = 160;
const PARTICLE_COLOR = 'rgba(253, 248, 240,'; // --color-breath

export function FlourParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const prefersReduced = useReducedMotion();

  const createParticle = useCallback((width: number, height: number): Particle => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -0.15 - Math.random() * 0.35, // drift upward
      opacity: 0.15 + Math.random() * 0.45,
      life: 0,
      maxLife: 300 + Math.random() * 400,
    };
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const w = canvas.parentElement?.clientWidth || canvas.width;
    const h = canvas.parentElement?.clientHeight || canvas.height;
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => createParticle(w, h));

    let time = 0;

    const animate = () => {
      const pw = canvas.parentElement?.clientWidth || 0;
      const ph = canvas.parentElement?.clientHeight || 0;
      ctx.clearRect(0, 0, pw, ph);
      time += 0.01;

      particlesRef.current.forEach((p) => {
        p.life++;

        // Perlin-like lateral sway using sin
        const sway = Math.sin(time * 2 + p.x * 0.01) * 0.2;

        p.x += p.speedX + sway;
        p.y += p.speedY;

        // Fade in/out based on life
        const lifeFraction = p.life / p.maxLife;
        let alpha = p.opacity;
        if (lifeFraction < 0.1) {
          alpha *= lifeFraction / 0.1;
        } else if (lifeFraction > 0.8) {
          alpha *= (1 - lifeFraction) / 0.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${PARTICLE_COLOR} ${alpha})`;
        ctx.fill();

        // Reset particle when it dies or goes off-screen
        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > pw + 10) {
          const reset = createParticle(pw, ph);
          reset.y = ph + 10; // spawn at bottom
          Object.assign(p, reset);
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReduced, createParticle]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-2 pointer-events-none"
      aria-hidden="true"
    />
  );
}
