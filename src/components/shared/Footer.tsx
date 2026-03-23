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
              Doručak, brunch i artizanski kruh.
              <br />
              Kiselo tijesto iz 5-godišnjeg startera.
              <br />&#352;ibenik, Hrvatska.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.15em] mb-4 opacity-50 font-sans"
            >
              Istraži
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/menu', label: 'Jelovnik' },
                { href: '/gallery', label: 'Galerija' },
                { href: '/story', label: 'Naša Priča' },
                { href: '/why', label: 'Zašto Pečemo' },
                { href: '/visit', label: 'Posjetite nas' },
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
              Radno Vrijeme
            </h4>
            <div className="space-y-2 text-sm opacity-70">
              <p>Pon–Sub: 09:00–15:00</p>
              <p>Nedjelja: Zatvoreno</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.15em] mb-4 opacity-50 font-sans"
            >
              Kontakt
            </h4>
            <div className="space-y-2 text-sm opacity-70">
              <p>Fausta Vran&#269;i&#263;a 9</p>
              <p>&#352;ibenik, Hrvatska</p>
              <a
                href="tel:+385991684830"
                className="block hover:opacity-100 transition-opacity"
              >
                +385 99 168 4830
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
          <p>&copy; {new Date().getFullYear()} Okus Soli. Sva prava pridržana.</p>
          <p className="font-serif italic">
            Pečeno s ljubavlju. Građeno s pažnjom.
          </p>
        </div>
      </div>
    </footer>
  );
}
