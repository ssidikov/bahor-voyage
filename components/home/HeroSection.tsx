'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import Button from '@/components/ui/Button';
import HeroSearchBar from '@/components/home/HeroSearchBar';
import { Link } from '@/i18n/navigation';

const MINI_DESTINATIONS = [
  {
    name: 'Samarcande',
    image: '/images/samarkand.jpeg',
    href: '/circuits/samarcande-boukhara',
    tag: '11 jours',
  },
  {
    name: 'Boukhara',
    image: '/images/Boukhara.jpg',
    href: '/circuits/samarcande-boukhara',
    tag: 'Route de la Soie',
  },
  {
    name: 'Khiva',
    image: '/images/khiva-old-city.jpg',
    href: '/circuits/immersion-totale-14j',
    tag: '14 jours',
  },
  {
    name: 'Immersion',
    image: '/images/afor-voyage-2.jpeg',
    href: '/circuits/grand-circuit-18j',
    tag: '18 jours',
  },
] as const;

function AnimatedText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className: string;
  delay?: number;
}) {
  const words = text.split(' ');
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotateX: -80 }}
            animate={{ y: '0%', rotateX: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="bg-[#fafafa]">
      {/* ── Large rounded hero card ── */}
      <div className="mx-2 rounded-3xl overflow-hidden relative h-[82vh] min-h-140">
        <Image
          src="/images/afor-voyage.jpg"
          alt=""
          fill
          priority
          quality={100}
          className="object-cover"
          placeholder="empty"
        />
        <div className="absolute inset-0 bg-charcoal-900/25" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/85 via-charcoal-900/25 to-transparent" />

        {/* Location pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-8 left-8 inline-flex items-center gap-2 border border-white/30 rounded-full px-4 py-1.5 backdrop-blur-sm bg-black/10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-white/85 text-sm font-medium tracking-wide">
            {t('hero_subtitle')}
          </span>
        </motion.div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-12 pb-10 md:pb-14">
          <h1 className="font-serif text-display-2xl text-white font-light max-w-5xl perspective-[1000px]">
            <AnimatedText text={t('hero_title')} className="" delay={0.4} />
          </h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-px bg-linear-to-r from-gold via-gold to-transparent mt-7 mb-6 origin-left"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              href="/#circuits"
              variant="inverted"
              size="lg"
              className="group text-label-lg uppercase tracking-widest relative overflow-hidden"
            >
              <span className="relative z-10">{t('hero_cta')}</span>
              <span
                aria-hidden="true"
                className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-2"
              >
                &rarr;
              </span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ── Search bar ── */}
      <div className="px-2 pb-6">
        <HeroSearchBar />
      </div>

      {/* ── Mini destination cards row ── */}
      <div className="px-2 pt-3 pb-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {MINI_DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            >
              <Link
                href={dest.href}
                className="group relative block aspect-4/3 rounded-[18px] overflow-hidden"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  quality={80}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/60 via-charcoal-900/10 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1 text-white text-[0.65rem] font-medium tracking-wide uppercase">
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    {dest.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-serif text-lg font-light leading-tight">
                    {dest.name}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
