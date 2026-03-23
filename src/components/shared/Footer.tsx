import Link from 'next/link';
import { Newsletter } from './Newsletter';

export function Footer() {
  return (
    <footer
      className="relative py-16 md:py-20 bg-depth text-cream"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <p
              className="text-2xl mb-4 tracking-wide font-display"
            >
              <span className="text-hearth">Okus</span>{' '}
              <span className="text-cream">Soli</span>
            </p>
            <p
              className="text-sm leading-relaxed opacity-70 font-serif italic"
            >
              Sourdough baked at dawn.
              <br />
              Coffee roasted with care.
              <br />A place that feels like home.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.15em] mb-4 opacity-50 font-sans"
            >
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/menu', label: 'Menu' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/story', label: 'Our Story' },
                { href: '/why', label: 'Why We Bake' },
                { href: '/visit', label: 'Visit' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.15em] mb-4 opacity-50 font-sans"
            >
              Hours
            </h4>
            <div className="space-y-2 text-sm opacity-70">
              <p>Mon–Fri: 07:00–19:00</p>
              <p>Saturday: 08:00–20:00</p>
              <p>Sunday: 08:00–18:00</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.15em] mb-4 opacity-50 font-sans"
            >
              Connect
            </h4>
            <div className="space-y-2 text-sm opacity-70">
              <p>123 Olive Grove Lane</p>
              <p>Mediterranean Quarter</p>
              <a
                href="mailto:hello@okussoli.com"
                className="block hover:opacity-100 transition-opacity"
              >
                hello@okussoli.com
              </a>
              <a
                href="tel:+1234567890"
                className="block hover:opacity-100 transition-opacity"
              >
                +1 (234) 567-890
              </a>
              <a
                href="https://www.instagram.com/okus_solibypakai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-100 transition-opacity mt-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                @okus_solibypakai
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mb-16">
          <Newsletter />
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-40"
          style={{ borderTop: '1px solid rgba(245, 237, 224, 0.15)' }}
        >
          <p>&copy; {new Date().getFullYear()} Okus Soli. All rights reserved.</p>
          <p className="font-serif italic">
            Baked with love. Built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
