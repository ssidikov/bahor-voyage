import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.bahor-voyage.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          fr: BASE_URL,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          fr: BASE_URL,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${BASE_URL}/projects`,
          en: `${BASE_URL}/en/projects`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${BASE_URL}/projects`,
          en: `${BASE_URL}/en/projects`,
        },
      },
    },
    {
      url: `${BASE_URL}/projects/voyage-solidaire`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${BASE_URL}/projects/voyage-solidaire`,
          en: `${BASE_URL}/en/projects/voyage-solidaire`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/projects/voyage-solidaire`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${BASE_URL}/projects/voyage-solidaire`,
          en: `${BASE_URL}/en/projects/voyage-solidaire`,
        },
      },
    },
  ];
}
