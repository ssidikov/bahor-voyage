'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import Button from '@/components/ui/Button';
import HeroSearchBar from '@/components/home/HeroSearchBar';

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
    <section className="relative h-svh min-h-150 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/afor-voyage.jpg"
            alt=""
            fill
            priority
            quality={100}
            className="object-cover"
            placeholder="empty"
          />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-charcoal-900/25" />
      <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-content mx-auto px-6 md:px-10">
          {/* Eyebrow with line animation */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="h-px w-12 bg-gold origin-left"
            />
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-sans text-label uppercase tracking-[0.2em] text-white/70"
            >
              {t('hero_subtitle')}
            </motion.p>
          </motion.div>

          {/* Headline with word-by-word reveal */}
          <h1 className="font-serif text-display-2xl text-white font-light max-w-6xl perspective-[1000px]">
            <AnimatedText text={t('hero_title')} className="" delay={0.4} />
          </h1>

          {/* Animated gold line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-px bg-linear-to-r from-gold via-gold to-transparent mt-8 mb-6 origin-left"
          />

          {/* CTA with spring animation */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
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
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              <span
                aria-hidden="true"
                className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-2"
              >
                &rarr;
              </span>
            </Button>
          </motion.div>

          {/* Search bar */}
          <HeroSearchBar />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
