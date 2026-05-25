import type { Metadata } from 'next';

import { setRequestLocale, getTranslations } from 'next-intl/server';

import BlogListPage from '@/components/blog/BlogListPage';
import { getBlogPosts } from '@/lib/sanity-queries';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const canonical = locale === 'fr' ? '/blog' : '/en/blog';

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical,
      languages: {
        fr: '/blog',
        en: '/en/blog',
        'x-default': '/blog',
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: `https://www.bahorvoyage.com${canonical}`,
      siteName: 'Bahor-Voyage',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta_title'),
      description: t('meta_description'),
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getBlogPosts(20);

  return <BlogListPage posts={posts} />;
}
