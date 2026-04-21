'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface BookingHeroProps {
  kicker: string;
  title: string;
  intro: string;
}

export default function BookingHero({
  kicker,
  title,
  intro,
}: BookingHeroProps) {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], ['0%', '25%']);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-[65vh] min-h-[500px] overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ y: backgroundY }}
        >
          <Image
            src="/images/tours/Khiva-2.jpg"
            alt="Samarkand, Uzbekistan"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-charcoal-900/30" />
      <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center text-center z-10 px-6 pt-20"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-label uppercase tracking-[0.15em] text-white/80 mb-4"
          >
            {kicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-serif text-display-xl md:text-display-2xl text-white font-light"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            className="w-16 h-px bg-gold mx-auto mt-8 mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="text-body-lg text-white/90 leading-relaxed max-w-2xl mx-auto"
          >
            {intro}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
