'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/components/ui';
import { fadeUp, staggerContainer } from '@/lib/animations';

export function CTAContact() {
  const t = useTranslations('home');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.6, 0.75, 0.85],
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[65vh] overflow-hidden flex items-center justify-center"
    >
      {/* Background image with parallax zoom */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: backgroundScale }}
      >
        <Image
          src="/images/uzbekistan.jpeg"
          alt=""
          fill
          quality={100}
          className="object-cover"
          placeholder="empty"
        />
      </motion.div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-primary-500"
        style={{ opacity: overlayOpacity }}
      />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/6 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 12, 0], x: [0, -6, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-1/4 right-1/6 w-48 h-48 rounded-full bg-gold/8 blur-3xl pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-10 py-24 md:py-32 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-white/30" />
            <p className="text-label uppercase tracking-[0.15em] text-white/60">
              Bahor-Voyage
            </p>
            <div className="h-px w-8 bg-white/30" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-display-xl text-white font-light max-w-content mx-auto"
          >
            {t('cta_title')}
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="w-16 h-px bg-linear-to-r from-transparent via-gold to-transparent my-8"
          />

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4"
          >
            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                href="mailto:contact@bahor-voyage.com"
                variant="glass"
                size="lg"
                className="font-medium"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5 shrink-0"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {t('cta_email')}
              </Button>
            </motion.div>

            {/* Phone */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                href="tel:+33611555763"
                variant="glass"
                size="lg"
                className="font-medium"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.91 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {t('cta_phone')}
              </Button>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                href="https://wa.me/33611555763"
                target="_blank"
                rel="noopener noreferrer"
                variant="glass"
                size="lg"
                className="font-medium"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4.5 h-4.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                {t('cta_whatsapp')}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTAContact;
