import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.bahorvoyage.com';

function localizedEntry(
  path: string,
  priority: number,
): MetadataRoute.Sitemap[0] {
  const frPath = path;
  const enPath = `/en${path === '/' ? '' : path}`;

  return {
    url: `${BASE_URL}${frPath}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
    alternates: {
      languages: {
        fr: `${BASE_URL}${frPath}`,
        en: `${BASE_URL}${enPath}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routeEntries: Array<{ path: string; priority: number }> = [
    { path: '/', priority: 1 },
    { path: '/about', priority: 0.8 },
    { path: '/circuits', priority: 0.9 },
    { path: '/circuits/samarcande-boukhara', priority: 0.8 },
    { path: '/circuits/voyage-solidaire-11j', priority: 0.8 },
    { path: '/circuits/immersion-totale-14j', priority: 0.8 },
    { path: '/circuits/grand-circuit-18j', priority: 0.8 },
    { path: '/projects', priority: 0.8 },
    { path: '/projects/voyage-solidaire', priority: 0.7 },
    { path: '/contact', priority: 0.7 },
    { path: '/booking', priority: 0.7 },
    { path: '/mentions-legales', priority: 0.4 },
    { path: '/politique-de-confidentialite', priority: 0.3 },
    { path: '/cgv', priority: 0.3 },
    { path: '/suppression-donnees', priority: 0.1 },
  ];

  return routeEntries.flatMap(({ path, priority }) => {
    const entry = localizedEntry(path, priority);
    return [
      entry,
      {
        ...entry,
        url: `${BASE_URL}/en${path === '/' ? '' : path}`,
      },
    ];
  });
}
