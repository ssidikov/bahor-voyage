'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { urlFor } from '@/lib/sanity-image';
import type { BlogPostCard } from '@/lib/sanity-queries';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Button, PageHero } from '@/components/ui';

/* ── Date formatter ───────────────────────────────────────────────────── */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/* ── Post card ─────────────────────────────────────────────────────────── */

function PostCard({ post }: { post: BlogPostCard }) {
  const t = useTranslations('blog');
  const imgSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(720).height(480).quality(85).url()
    : null;

  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col bg-white border border-sand-200 rounded-[1.25rem] overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <Link href={`/blog/${post.slug.current}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={post.coverImage?.alt ?? post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-sand-100" />
          )}
          {post.isFeatured && (
            <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-[0.75rem] font-medium text-white backdrop-blur-sm">
              {t('featured_label')}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-6">
        {post.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((cat) => (
              <span
                key={cat.slug.current}
                className="text-[0.7rem] uppercase tracking-widest text-primary font-medium"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}

        <Link href={`/blog/${post.slug.current}`}>
          <h2 className="font-serif text-xl text-charcoal-700 font-light leading-snug mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-sm text-charcoal-500 leading-relaxed mb-5 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-sand-100">
          <div className="flex items-center gap-2">
            {post.author?.avatar?.asset && (
              <Image
                src={urlFor(post.author.avatar).width(40).height(40).url()}
                alt={post.author.name}
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
            )}
            {post.author?.name && (
              <span className="text-xs text-charcoal-400">
                {post.author.name}
              </span>
            )}
          </div>
          <time
            className="text-xs text-charcoal-300"
            dateTime={post.publishedAt}
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Featured post (large card) ───────────────────────────────────────── */

function FeaturedPost({ post }: { post: BlogPostCard }) {
  const t = useTranslations('blog');
  const imgSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1400).height(700).quality(90).url()
    : null;

  return (
    <motion.article
      variants={fadeUp}
      className="group relative overflow-hidden rounded-[1.75rem] shadow-[0_10px_30px_rgba(20,20,20,0.12)] mb-14 md:mb-20"
      style={{ minHeight: '480px' }}
    >
      {imgSrc ? (
        <div className="absolute inset-0 transition-transform duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
          <Image
            src={imgSrc}
            alt={post.coverImage?.alt ?? post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-charcoal-700" />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      <div
        className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12 lg:p-16"
        style={{ minHeight: '480px' }}
      >
        <span className="inline-block mb-4 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-[0.75rem] font-medium tracking-[0.08em] text-white backdrop-blur-sm">
          {t('featured_label')}
        </span>

        {post.categories?.length > 0 && (
          <p className="text-[0.75rem] uppercase tracking-[0.12em] text-gold mb-2">
            {post.categories.map((c) => c.title).join(' · ')}
          </p>
        )}

        <Link href={`/blog/${post.slug.current}`}>
          <h2 className="font-serif text-display-md text-white font-light leading-snug mb-4 max-w-3xl group-hover:text-gold transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-2xl line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4">
          <Link
            href={`/blog/${post.slug.current}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-charcoal-700 transition-all hover:bg-sand-50"
          >
            {t('read_more')}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <time className="text-white/60 text-xs" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Empty state ──────────────────────────────────────────────────────── */

function EmptyState() {
  const t = useTranslations('blog');
  return (
    <div className="py-24 text-center">
      <div className="w-8 h-px bg-gold mx-auto mb-8" />
      <p className="font-serif text-display-md text-charcoal-500 font-light mb-4">
        {t('no_posts_title')}
      </p>
      <p className="text-body-md text-charcoal-400">{t('no_posts_body')}</p>
    </div>
  );
}

/* ── Root component ───────────────────────────────────────────────────── */

export default function BlogListPage({ posts }: { posts: BlogPostCard[] }) {
  const t = useTranslations('blog');
  const featured = posts.find((p) => p.isFeatured) ?? posts[0] ?? null;
  const rest = featured ? posts.filter((p) => p._id !== featured._id) : posts;

  return (
    <>
      <PageHero
        image={{ src: '/images/Boukhara.jpg', alt: 'Blog Bahor-Voyage' }}
        kicker={t('hero_kicker')}
        title={t('hero_title')}
        subtitle={t('hero_subtitle')}
        containerClassName="h-[55vh] min-h-[360px]"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-content mx-auto px-5 md:px-8">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <FeaturedPost post={featured} />
                </motion.div>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {rest.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </motion.div>
              )}

              {/* CTA strip */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-20 py-16 px-8 md:px-12 bg-sand-50 rounded-3xl text-center border border-sand-200"
              >
                <div className="w-8 h-px bg-gold mx-auto mb-8" />
                <h2 className="font-serif text-display-md text-charcoal-700 font-light mb-4">
                  {t('cta_title')}
                </h2>
                <p className="text-body-md text-charcoal-500 mb-8 max-w-lg mx-auto">
                  {t('cta_body')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button href="/contact" variant="primary">
                    {t('cta_contact')}
                  </Button>
                  <Button href="/circuits" variant="outline">
                    {t('cta_circuits')}
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
