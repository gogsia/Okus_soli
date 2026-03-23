import type { MetadataRoute } from 'next';

const BASE_URL = 'https://okussoli.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/menu', '/gallery', '/story', '/why', '/visit'];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/menu' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
