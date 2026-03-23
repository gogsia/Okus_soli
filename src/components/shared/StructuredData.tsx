export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'Okus Soli by Pa\u2019kai',
    description: 'Artisan bakery, breakfast & brunch in \u0160ibenik, Croatia. Sourdough from a 5-year starter, focaccia, and specialty coffee.',
    url: 'https://okus-soli-gamma.vercel.app',
    telephone: '+385991684830',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fausta Vran\u010di\u0107a 9',
      addressLocality: '\u0160ibenik',
      addressRegion: '\u0160ibenik-Knin County',
      postalCode: '22000',
      addressCountry: 'HR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.7351,
      longitude: 15.8908,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '15:00',
      },
    ],
    servesCuisine: ['Bakery', 'Breakfast', 'Brunch', 'Coffee'],
    priceRange: '$$',
    image: 'https://okus-soli-gamma.vercel.app/images/hero-poster.webp',
    sameAs: [
      'https://www.instagram.com/okus_solibypakai/',
      'https://www.instagram.com/pakai_sibenik/',
      'https://www.facebook.com/PaKaiSibenik/',
    ],
    founder: {
      '@type': 'Person',
      name: 'Kre\u0161imir Glavina',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
