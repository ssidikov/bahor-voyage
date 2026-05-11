'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ContactHeroProps {
  kicker: string;
  title: string;
  intro: string;
}

export default function ContactHero({
  kicker,
  title,
  intro,
}: ContactHeroProps) {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], ['0%', '25%']);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative bg-[#fafafa] py-6">
      <div className="mx-2 rounded-3xl overflow-hidden relative h-[65vh] min-h-100">
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ y: backgroundY }}
        >
          <Image
            src="/images/khiva-old-city.jpg"
            alt="Uzbek craftsmanship - Bahor Voyage"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Cinematic Overlays */}
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
            <div className="h-px w-8 bg-primary/40" />
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

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            className="w-14 h-px bg-gold mt-8 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="text-body-lg text-white/80 leading-relaxed max-w-xl mt-4"
          >
            {intro}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
