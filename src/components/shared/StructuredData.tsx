export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'Okus Soli',
    description: 'Artisan bakery & coffee shop. Sourdough baked at dawn. Coffee roasted with care.',
    url: 'https://okussoli.com',
    telephone: '+1234567890',
    email: 'hello@okussoli.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Olive Grove Lane',
      addressLocality: 'Sunstone',
      addressRegion: 'ST',
      postalCode: '10042',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 0,
      longitude: 0,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '08:00',
        closes: '18:00',
      },
    ],
    servesCuisine: ['Bakery', 'Coffee', 'Pastries'],
    priceRange: '$$',
    image: 'https://okussoli.com/images/hero-poster.webp',
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
