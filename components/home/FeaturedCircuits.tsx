'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui';

type CircuitId = 'c1' | 'c2' | 'c3' | 'c4';

type Circuit = {
  id: CircuitId;
  image: string;
  href: string;
};

const CIRCUITS: readonly Circuit[] = [
  {
    id: 'c1',
    image: '/images/Boukhara.jpg',
    href: '/circuits/samarcande-boukhara',
  },
  {
    id: 'c2',
    image: '/images/voyage-solidaire.avif',
    href: '/circuits/voyage-solidaire-11j',
  },
  {
    id: 'c3',
    image: '/images/afor-voyage-2.jpeg',
    href: '/circuits/immersion-totale-14j',
  },
  {
    id: 'c4',
    image: '/images/immersion-totale.jpeg',
    href: '/circuits/grand-circuit-18j',
  },
] as const;

function CircuitCard3D({
  id,
  image,
  href,
  large,
}: Circuit & { large?: boolean }) {
  const t = useTranslations('circuits');
  const durationKey = `${id}_duration` as const;
  const tagKey = `${id}_tag` as const;
  const descKey = `${id}_desc` as const;

  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      style={{ perspective: 800 }}
      className={
        large
          ? 'aspect-4/5 md:aspect-3/2 lg:aspect-auto lg:h-104'
          : 'aspect-4/5 md:aspect-square lg:aspect-auto lg:h-104'
      }
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-full w-full"
      >
        <Link
          href={href}
          className="group relative block h-full w-full overflow-hidden rounded-3xl border border-white/20 shadow-[0_10px_40px_rgba(20,20,20,0.15)]"
        >
          <motion.div
            className="relative h-full w-full"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          >
            {/* Image with zoom on hover */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src={image}
                alt={t(tagKey)}
                fill
                quality={100}
                className="object-cover"
                placeholder="empty"
              />
            </motion.div>

            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-linear-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent"
              animate={{ opacity: isHovered ? 1 : 0.85 }}
              transition={{ duration: 0.4 }}
            />

            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent opacity-0"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Duration badge */}
            <motion.div
              className="absolute left-5 top-5 z-10 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 backdrop-blur-md"
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/90">
                {t(durationKey)}
              </span>
            </motion.div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-7 lg:p-8">
              <motion.h3
                className="font-serif text-2xl leading-tight text-white md:text-[1.9rem] lg:text-[2.2rem] font-light"
                animate={{ y: isHovered ? -4 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {t(tagKey)}
              </motion.h3>
              <motion.p
                className="mt-2 text-sm leading-relaxed text-white/75 md:text-body-md line-clamp-2"
                animate={{
                  y: isHovered ? -2 : 0,
                  opacity: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {t(descKey)}
              </motion.p>

              <motion.span
                className="mt-5 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.14em] text-white/90 font-medium"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {t('learn_more')}
                <motion.span
                  aria-hidden="true"
                  animate={{ x: isHovered ? 6 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  &rarr;
                </motion.span>
              </motion.span>
            </div>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}

export function FeaturedCircuits() {
  const t = useTranslations('circuits');
  const tHome = useTranslations('home');

  return (
    <section
      id="circuits"
      className="relative bg-[linear-gradient(180deg,#fff_0%,#f8f4ed_50%,#fff_100%)] py-20 md:py-28 lg:py-section overflow-hidden"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-0 w-125 h-125 bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-100 h-100 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-312 mx-auto px-6 md:px-10 relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 md:mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-primary/40" />
            <p className="text-label uppercase tracking-[0.15em] text-primary-400">
              {t('section_kicker')}
            </p>
          </motion.div>

          <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <motion.h2
                variants={fadeUp}
                className="font-serif text-display-xl text-charcoal-700 font-light text-left"
              >
                {t('section_title')}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="font-sans text-body-lg text-charcoal-400 mt-4 text-left"
              >
                {t('section_subtitle')}
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="shrink-0 lg:pb-1">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  href="/booking"
                  variant="primary"
                  size="md"
                  className="w-full lg:w-auto lg:min-w-48"
                >
                  {tHome('cta_reserve')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-12 lg:gap-7"
        >
          {CIRCUITS.map((circuit, idx) => (
            <motion.div
              key={circuit.id}
              variants={fadeUp}
              className={
                idx === 0 || idx === 3
                  ? 'md:col-span-2 lg:col-span-8'
                  : 'md:col-span-1 lg:col-span-4'
              }
            >
              <CircuitCard3D
                id={circuit.id}
                image={circuit.image}
                href={circuit.href}
                large={idx === 0 || idx === 3}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 rounded-3xl border border-charcoal-100/50 bg-white/80 backdrop-blur-sm px-6 py-6 md:px-8 md:py-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
        >
          <p className="max-w-200 text-body-md text-charcoal-500">
            {t('section_conversion_note')}
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              href="/contact"
              variant="outline"
              size="md"
              className="w-full lg:w-auto lg:min-w-56"
            >
              {t('section_cta')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedCircuits;
