'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { urlFor } from '@/lib/sanity-image';
import type { BlogPostCard, BlogPostFull } from '@/lib/sanity-queries';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui';
import { PortableText } from './PortableText';

/* ── Date formatter ───────────────────────────────────────────────────── */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/* ── Related post mini-card ───────────────────────────────────────────── */

function RelatedCard({ post }: { post: BlogPostCard }) {
  const t = useTranslations('blog');
  const imgSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(480).height(320).quality(80).url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col bg-white border border-sand-200 rounded-[1.25rem] overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={post.coverImage?.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-sand-100" />
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-lg text-charcoal-700 font-light leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-charcoal-400 line-clamp-2 mb-3 flex-1">
          {post.excerpt}
        </p>
        <span className="text-xs text-primary font-medium">
          {t('read_more')} →
        </span>
      </div>
    </Link>
  );
}

/* ── Root component ───────────────────────────────────────────────────── */

type Props = {
  post: BlogPostFull;
  relatedPosts: BlogPostCard[];
};

export default function BlogDetailPage({ post, relatedPosts }: Props) {
  const t = useTranslations('blog');

  const coverSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1600).height(900).quality(90).url()
    : null;

  return (
    <article>
      {/* ── Hero image ────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: '60vh', minHeight: '360px' }}
      >
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={post.coverImage?.alt ?? post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-charcoal-700" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back link */}
        <div className="absolute top-24 left-0 right-0">
          <div className="max-w-content mx-auto px-5 md:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t('back_to_blog')}
            </Link>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 md:pb-14">
          <div className="max-w-content mx-auto px-5 md:px-8">
            {post.categories?.length > 0 && (
              <p className="text-[0.75rem] uppercase tracking-[0.12em] text-gold mb-3">
                {post.categories.map((c) => c.title).join(' · ')}
              </p>
            )}
            <h1 className="font-serif text-display-lg text-white font-light leading-tight max-w-4xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Meta bar ──────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-sand-100">
        <div className="max-w-content mx-auto px-5 md:px-8 py-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-charcoal-400">
          {post.author?.name && (
            <span className="flex items-center gap-2">
              {post.author.avatar?.asset && (
                <Image
                  src={urlFor(post.author.avatar).width(32).height(32).url()}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              )}
              <span>
                {t('by')}{' '}
                <strong className="text-charcoal-600">
                  {post.author.name}
                </strong>
              </span>
            </span>
          )}
          <time dateTime={post.publishedAt}>
            {t('published_on')} {formatDate(post.publishedAt)}
          </time>
          {post.tags?.length > 0 && (
            <span className="flex items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-sand-50 border border-sand-200 px-3 py-0.5 text-xs text-charcoal-500"
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="max-w-content mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14 lg:gap-20 items-start">
          {/* Main content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {post.excerpt && (
              <motion.p
                variants={fadeUp}
                className="font-serif text-xl text-charcoal-500 italic leading-relaxed mb-10 pb-10 border-b border-sand-100"
              >
                {post.excerpt}
              </motion.p>
            )}

            <motion.div variants={fadeUp}>
              <PortableText value={post.body} />
            </motion.div>

            {/* Related tours */}
            {post.relatedTours?.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="mt-14 p-8 bg-primary/5 rounded-2xl border border-primary/10"
              >
                <h3 className="font-serif text-xl text-charcoal-700 font-light mb-5">
                  {t('related_tours_title')}
                </h3>
                <ul className="space-y-3">
                  {post.relatedTours.map((tour) => (
                    <li key={tour.href}>
                      <Link
                        href={tour.href}
                        className="flex items-center gap-2 text-primary text-sm font-medium hover:text-primary-hover transition-colors"
                      >
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
                        {tour.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 space-y-8">
            {/* CTA card */}
            <div className="bg-sand-50 border border-sand-200 rounded-2xl p-7 text-center">
              <div className="w-6 h-px bg-gold mx-auto mb-5" />
              <h3 className="font-serif text-xl text-charcoal-700 font-light mb-3">
                {t('cta_title')}
              </h3>
              <p className="text-sm text-charcoal-500 leading-relaxed mb-6">
                {t('cta_body')}
              </p>
              <div className="flex flex-col gap-3">
                <Button href="/contact" variant="primary" className="w-full">
                  {t('cta_contact')}
                </Button>
                <Button href="/circuits" variant="outline" className="w-full">
                  {t('cta_circuits')}
                </Button>
              </div>
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div>
                <h3 className="text-[0.7rem] uppercase tracking-[0.14em] text-charcoal-400 font-medium mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white border border-sand-200 px-3 py-1 text-xs text-charcoal-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ── Related posts ─────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="bg-sand-50 border-t border-sand-200 py-16 md:py-20">
          <div className="max-w-content mx-auto px-5 md:px-8">
            <div className="w-8 h-px bg-gold mb-8" />
            <h2 className="font-serif text-display-md text-charcoal-700 font-light mb-10">
              {t('related_posts_title')}
            </h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {relatedPosts.map((p) => (
                <motion.div key={p._id} variants={fadeUp}>
                  <RelatedCard post={p} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </article>
  );
}
