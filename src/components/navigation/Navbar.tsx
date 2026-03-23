'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMood } from '@/components/mood/MoodProvider';
import { NAV_LINKS } from '@/lib/constants';

const navLinks = NAV_LINKS;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mood = useMood();
  const isNight = mood === 'NOCTURNE';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  let headerBg = 'bg-transparent';
  if (scrolled && isNight) headerBg = 'bg-[#2A2422]/95 backdrop-blur-md shadow-lg';
  else if (scrolled) headerBg = 'bg-breath/95 backdrop-blur-md shadow-sm';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${headerBg}`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Glavna navigacija">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl tracking-wide">
          <span className="text-hearth">Okus</span>{' '}
          <span className="text-depth">Soli</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link text-sm tracking-widest uppercase font-sans font-light text-secondary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Zatvori izbornik' : 'Otvori izbornik'}
          aria-expanded={mobileOpen}
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300 origin-center"
            style={{
              background: 'var(--color-ink)',
              transform: mobileOpen ? 'rotate(45deg) translate(2px, 6px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: 'var(--color-ink)',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300 origin-center"
            style={{
              background: 'var(--color-ink)',
              transform: mobileOpen ? 'rotate(-45deg) translate(2px, -6px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: isNight ? '#2A2422' : '#FDF8F0' }}
      >
        <ul className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-widest uppercase font-sans font-light text-secondary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
