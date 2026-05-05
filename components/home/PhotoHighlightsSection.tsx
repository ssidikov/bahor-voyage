'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/components/ui';
import { fadeUp, staggerContainer } from '@/lib/animations';

type Highlight = {
  image: string;
  altKey: 'gallery_alt_1' | 'gallery_alt_2' | 'gallery_alt_3' | 'gallery_alt_4';
};

const HIGHLIGHTS = [
  { image: '/images/Boukhara.jpg', altKey: 'gallery_alt_1' },
  { image: '/images/afor-voyage-2.jpeg', altKey: 'gallery_alt_2' },
  { image: '/images/uzbekistan.jpeg', altKey: 'gallery_alt_3' },
  { image: '/images/voyage-solidaire.avif', altKey: 'gallery_alt_4' },
] as const satisfies readonly [Highlight, ...Highlight[]];

function GalleryImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          quality={100}
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
          className="grid gap-4 md:gap-5 lg:grid-cols-12 lg:grid-rows-2"
        >
          {/* Large featured image */}
          <GalleryImage
            src={HIGHLIGHTS[0].image}
            alt={t(HIGHLIGHTS[0].altKey)}
            className="lg:col-span-7 lg:row-span-2 aspect-4/3 lg:aspect-auto"
            priority
          />

          {/* Right column images */}
          <GalleryImage
            src={HIGHLIGHTS[1].image}
            alt={t(HIGHLIGHTS[1].altKey)}
            className="lg:col-span-5 aspect-video"
          />
          <div className="grid grid-cols-2 gap-4 md:gap-5 lg:col-span-5">
            <GalleryImage
              src={HIGHLIGHTS[2].image}
              alt={t(HIGHLIGHTS[2].altKey)}
              className="aspect-square"
            />
            <GalleryImage
              src={HIGHLIGHTS[3].image}
              alt={t(HIGHLIGHTS[3].altKey)}
              className="aspect-square"
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              href="/circuits"
              variant="outline"
              className="w-full md:w-auto"
            >
              {t('gallery_cta')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default PhotoHighlightsSection;
