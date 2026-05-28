'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/components/ui';
import { fadeUp, staggerContainer } from '@/lib/animations';

type Highlight = {
  image: string;
  altKey: string;
};

const MEDIA_IMAGES = [
  'https://cdn.bahorvoyage.com/images/media/photo_10_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_11_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_12_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_13_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_14_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_15_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_16_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_17_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_18_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_19_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_1_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_20_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_21_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_22_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_23_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_24_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_25_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_26_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_2_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_3_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_4_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_5_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_6_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_7_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_8_2026-05-10_14-47-34.jpg',
  'https://cdn.bahorvoyage.com/images/media/photo_9_2026-05-10_14-47-34.jpg',
];

const INITIAL_HIGHLIGHTS: Highlight[] = [
  {
    image: 'https://cdn.bahorvoyage.com/images/Boukhara.jpg',
    altKey: 'gallery_alt_1',
  },
  {
    image: 'https://cdn.bahorvoyage.com/images/afor-voyage-2.jpeg',
    altKey: 'gallery_alt_2',
  },
  {
    image: 'https://cdn.bahorvoyage.com/images/uzbekistan.jpeg',
    altKey: 'gallery_alt_3',
  },
  {
    image: 'https://cdn.bahorvoyage.com/images/voyage-solidaire.avif',
    altKey: 'gallery_alt_4',
  },
];

const ALL_IMAGES: Highlight[] = [
  ...INITIAL_HIGHLIGHTS,
  ...MEDIA_IMAGES.map((src) => ({ image: src, altKey: 'gallery_alt_1' })),
];

const INITIAL_VISIBLE_COUNT = 3;
const BATCH_SIZE = 3;

function GalleryImage({
  src,
  alt,
  className,
  priority = false,
  onClick,
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      onClick={onClick}
      animate="visible"
      exit="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-label={`Open image: ${alt}`}
      className={`group relative overflow-hidden rounded-2xl border border-white/60 shadow-[0_4px_24px_rgba(21,20,18,0.06)] hover:shadow-[0_20px_50px_rgba(21,20,18,0.12)] transition-shadow duration-500 cursor-pointer ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={80}
          className="object-cover"
          placeholder="empty"
          priority={priority}
        />
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-charcoal-900/40 via-transparent to-transparent"
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hover shine effect */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-white/15 via-transparent to-transparent"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* View indicator on hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={1.5}
            className="w-5 h-5"
          >
            <path
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PhotoHighlightsSection() {
  const t = useTranslations('home');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedHighlight =
    selectedIndex === null ? null : (ALL_IMAGES[selectedIndex] ?? null);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
        return;
      }

      if (event.key === 'ArrowLeft') {
        setSelectedIndex((currentIndex) =>
          currentIndex === null
            ? currentIndex
            : (currentIndex - 1 + ALL_IMAGES.length) % ALL_IMAGES.length,
        );
      }

      if (event.key === 'ArrowRight') {
        setSelectedIndex((currentIndex) =>
          currentIndex === null
            ? currentIndex
            : (currentIndex + 1) % ALL_IMAGES.length,
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === null
        ? currentIndex
        : (currentIndex - 1 + ALL_IMAGES.length) % ALL_IMAGES.length,
    );
  };

  const showNext = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === null
        ? currentIndex
        : (currentIndex + 1) % ALL_IMAGES.length,
    );
  };

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, ALL_IMAGES.length));
  };

  const visibleImages = ALL_IMAGES.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_IMAGES.length;

  return (
    <section className="relative bg-[linear-gradient(180deg,#f7f2ea_0%,#fffdf8_100%)] py-20 md:py-28 lg:py-section overflow-hidden">
      {/* Background blobs */}
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 max-w-3xl md:mb-14"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-primary/40" />
            <p className="text-label uppercase tracking-[0.15em] text-primary-600">
              {t('gallery_kicker')}
            </p>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-display-lg font-light text-charcoal-700"
          >
            {t('gallery_title')}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-3xl text-body-lg leading-relaxed text-charcoal-500"
          >
            {t('gallery_body')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-3 sm:auto-rows-[240px] md:auto-rows-[280px] grid-flow-dense"
        >
          <AnimatePresence mode="popLayout">
            {visibleImages.map((highlight, index) => {
              // Create modern 1-large 2-small pattern
              const isLarge = index % 3 === 0;
              const aspectClass = isLarge
                ? 'h-[300px] sm:h-full sm:row-span-2 sm:col-span-2'
                : 'h-[250px] sm:h-full';
              return (
                <GalleryImage
                  key={highlight.image}
                  src={highlight.image}
                  alt={t(highlight.altKey as 'gallery_alt_1')}
                  className={aspectClass}
                  priority={index < 3}
                  onClick={() => openLightbox(index)}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-12 flex justify-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={showMore}
                variant="outline"
                className="w-full min-w-50 md:w-auto"
              >
                {t('gallery_view_more')}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedHighlight && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 md:p-10 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative h-full w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[1.75rem] bg-black shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute left-4 right-4 top-4 z-10 flex items-start justify-between gap-3 md:left-6 md:right-6 md:top-6">
                <div className="rounded-full bg-black/45 px-4 py-2 text-white/80 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                    {selectedIndex !== null
                      ? `${selectedIndex + 1} / ${ALL_IMAGES.length}`
                      : ''}
                  </p>
                </div>

                <button
                  className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  onClick={closeLightbox}
                  aria-label="Close viewer"
                  type="button"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-6 w-6"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {selectedHighlight && selectedIndex !== null && (
                  <motion.div
                    key={selectedHighlight.image}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={selectedHighlight.image}
                      alt={t(selectedHighlight.altKey as 'gallery_alt_1')}
                      fill
                      quality={100}
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                aria-label="Previous image"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:left-5"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-6 w-6"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={showNext}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:right-5"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-6 w-6"
                >
                  <path
                    d="M9 6l6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default PhotoHighlightsSection;
