import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import BlogDetailPage from '@/components/blog/BlogDetailPage';
import {
  getBlogPostBySlug,
  getBlogSlugs,
  getRelatedPosts,
} from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity-image';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  const canonical =
    post.canonicalUrl ??
    (locale === 'fr' ? `/blog/${slug}` : `/en/blog/${slug}`);
  const canonicalUrl =
    post.canonicalUrl ?? `https://www.bahorvoyage.com${canonical}`;

  const ogImageUrl = post.ogImage?.asset
    ? urlFor(post.ogImage).width(1200).height(630).url()
    : post.coverImage?.asset
      ? urlFor(post.coverImage).width(1200).height(630).url()
      : undefined;

  const robots: string[] = [];
  if (post.robotsNoIndex) robots.push('noindex');
  if (post.robotsNoFollow) robots.push('nofollow');

  return {
    title,
    description,
    robots: robots.length ? robots.join(', ') : undefined,
    alternates: {
      canonical,
      languages: {
        fr: `/blog/${slug}`,
        en: `/en/blog/${slug}`,
        'x-default': `/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.ogTitle ?? title,
      description: post.ogDescription ?? description,
      url: canonicalUrl,
      siteName: 'Bahor-Voyage',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: post.ogImage?.alt ?? title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitterTitle ?? post.ogTitle ?? title,
      description: post.twitterDescription ?? post.ogDescription ?? description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [post, relatedPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPostBySlug(slug).then((p) => (p ? getRelatedPosts(p._id, 3) : [])),
  ]);

  if (!post) notFound();

  const canonicalUrl =
    post.canonicalUrl ??
    `https://www.bahorvoyage.com${locale === 'fr' ? `/blog/${slug}` : `/en/blog/${slug}`}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    url: canonicalUrl,
    datePublished: post.publishedAt,
    inLanguage: 'fr',
    publisher: {
      '@type': 'Organization',
      name: 'Bahor-Voyage',
      url: 'https://www.bahorvoyage.com',
    },
    author: post.author?.name
      ? { '@type': 'Person', name: post.author.name }
      : { '@type': 'Organization', name: 'Bahor-Voyage' },
    image: post.coverImage?.asset
      ? urlFor(post.coverImage).width(1200).height(630).url()
      : undefined,
    keywords: [post.focusKeyword, ...(post.tags ?? [])]
      .filter(Boolean)
      .join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailPage post={post} relatedPosts={relatedPosts} />
    </>
  );
}
