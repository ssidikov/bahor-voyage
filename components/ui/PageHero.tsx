'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export interface PageHeroProps {
  image: { src: string; alt: string };
  kicker: string;
  title: string;
  subtitle?: string;
  containerClassName?: string;
}

export default function PageHero({
  image,
  kicker,
  title,
  subtitle,
  containerClassName = 'h-[65vh] min-h-100',
}: PageHeroProps) {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], ['0%', '25%']);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative bg-[#fafafa] pt-20 md:pt-22 pb-6">
      <div
        className={`mx-2 rounded-3xl overflow-hidden relative ${containerClassName}`}
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ y: backgroundY }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-charcoal-900/30" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />

        {/* Content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 pb-10 md:pb-14 px-8 md:px-12"
          style={{ opacity: contentOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-4"
          >
            <p className="text-label uppercase tracking-[0.15em] text-white/80">
              {kicker}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-serif text-display-xl md:text-display-2xl text-white font-light max-w-3xl"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="text-body-lg text-white/80 leading-relaxed max-w-xl mt-4"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            className="w-14 h-px bg-gold mt-8 origin-left"
          />
        </motion.div>
      </div>
    </section>
  );
}
