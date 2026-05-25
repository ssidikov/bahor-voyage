import { sanityClient } from './sanity';

/* ── Shared types ────────────────────────────────────────────────────── */

export type SanityImage = {
  _type: 'image';
  asset: { _ref: string; _type: string };
  hotspot?: { x: number; y: number; width: number; height: number };
  alt?: string;
  caption?: string;
};

export type BlogCategory = {
  title: string;
  slug: { current: string };
};

export type BlogAuthor = {
  name: string;
  role: string | null;
  avatar: SanityImage | null;
};

export type BlogPostCard = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: SanityImage;
  publishedAt: string;
  isFeatured: boolean;
  categories: BlogCategory[];
  author: BlogAuthor | null;
};

export type BlogPostFull = BlogPostCard & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  tags: string[];
  relatedTours: Array<{ label: string; href: string }>;
  seoTitle: string | null;
  metaDescription: string | null;
  focusKeyword: string | null;
  canonicalUrl: string | null;
  robotsNoIndex: boolean;
  robotsNoFollow: boolean;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: SanityImage | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
};

/* ── Reusable projection fragment ───────────────────────────────────── */

const postCardProjection = `
  _id,
  title,
  slug,
  excerpt,
  coverImage { ..., asset-> },
  publishedAt,
  isFeatured,
  "categories": categories[]->{ title, slug },
  "author": author->{ name, role, avatar { ..., asset-> } }
`;

/* ── Queries ─────────────────────────────────────────────────────────── */

export async function getBlogPosts(limit = 20): Promise<BlogPostCard[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && publishedAt <= now()] | order(isFeatured desc, publishedAt desc) [0...$limit] {
      ${postCardProjection}
    }`,
    { limit: limit - 1 },
  );
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPostFull | null> {
  const result = await sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug && publishedAt <= now()][0] {
      ${postCardProjection},
      body,
      tags,
      relatedTours,
      seoTitle,
      metaDescription,
      focusKeyword,
      canonicalUrl,
      robotsNoIndex,
      robotsNoFollow,
      ogTitle,
      ogDescription,
      ogImage { ..., asset-> },
      twitterTitle,
      twitterDescription
    }`,
    { slug },
  );
  return result ?? null;
}

export async function getBlogSlugs(): Promise<Array<{ slug: string }>> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && publishedAt <= now()] { "slug": slug.current }`,
  );
}

export async function getRelatedPosts(
  currentId: string,
  limit = 3,
): Promise<BlogPostCard[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && _id != $currentId && publishedAt <= now()] | order(publishedAt desc) [0...$limit] {
      ${postCardProjection}
    }`,
    { currentId, limit: limit - 1 },
  );
}
