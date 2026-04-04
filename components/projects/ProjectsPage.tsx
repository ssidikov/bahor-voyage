'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/components/ui';
import {
  fadeIn,
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
} from '@/lib/animations';

/* --- Project data --- */
const PROJECTS = [
  {
    key: 'p1',
    image: '/images/projects/project-trees.jpg',
    imageAlt: 'Tree planting in Gurlan, Khorezm',
  },
  {
    key: 'p2',
    image: '/images/projects/project-education-AFOR.jpg',
    imageAlt: 'Youth education support',
  },
  {
    key: 'p3',
    image: '/images/projects/project-entrepreneurship.jpg',
    imageAlt: 'Female entrepreneurship in Uzbekistan',
  },
] as const;

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], ['0%', '20%']);

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative h-screen min-h-125 overflow-hidden">
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ y: heroParallax }}
        >
          <Image
            src="/images/projects/projects-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            placeholder="empty"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-charcoal-900/30" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/70 via-charcoal-900/15 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-16 md:pb-24">
          <div className="max-w-content mx-auto px-6 md:px-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="font-sans text-label uppercase tracking-[0.15em] text-white/70 mb-4"
            >
              {t('hero_subtitle')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="font-serif text-display-2xl text-white font-light max-w-4xl"
            >
              {t('hero_title')}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
              className="w-16 h-px bg-gold mt-8 origin-left"
            />
          </div>
        </div>
      </section>

      {/* ===================== INTRO ===================== */}
      <section className="bg-sand-50 py-16 md:py-20 lg:py-section">
        <div className="max-w-[48rem] mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <div className="divider-gold-center mb-10" />
              <p className="font-serif text-display-md text-charcoal-700 font-light leading-snug">
                {t('intro')}
              </p>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="font-sans text-body-lg text-charcoal-400 mt-8 leading-relaxed"
            >
              {t('intro2')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===================== PROJECTS ===================== */}
      {PROJECTS.map((project, idx) => {
        const isReversed = idx % 2 === 1;
        const roman = ['I', 'II', 'III'][idx];

        return (
          <section
            key={project.key}
            className={`py-16 md:py-20 lg:py-section overflow-hidden ${
              idx % 2 === 0 ? 'bg-white' : 'bg-sand-100'
            }`}
          >
            <div className="max-w-content mx-auto px-6 md:px-10">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Image column */}
                <motion.div
                  variants={isReversed ? slideLeft : slideRight}
                  className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}
                >
                  <div
                    className="relative aspect-4/3 overflow-hidden rounded-sm"
                    style={{
                      boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.25)',
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      placeholder="empty"
                    />
                    {/* Subtle gold corner accent */}
                    <div className="absolute top-0 left-0 w-12 h-12">
                      <div className="absolute top-0 left-0 w-full h-px bg-gold/40" />
                      <div className="absolute top-0 left-0 w-px h-full bg-gold/40" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-12 h-12">
                      <div className="absolute bottom-0 right-0 w-full h-px bg-gold/40" />
                      <div className="absolute bottom-0 right-0 w-px h-full bg-gold/40" />
                    </div>
                  </div>
                </motion.div>

                {/* Text column */}
                <motion.div
                  variants={isReversed ? slideRight : slideLeft}
                  className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}
                >
                  {/* Roman numeral */}
                  <span
                    className="font-serif text-7xl text-gold/25 font-light leading-none block select-none mb-2"
                    aria-hidden="true"
                  >
                    {roman}
                  </span>

                  {/* Region badge */}
                  <p className="text-label uppercase tracking-[0.15em] text-primary-400 mb-3">
                    {t(`${project.key}_region` as 'p1_region')}
                  </p>

                  {/* Title */}
                  <h2 className="font-serif text-display-md text-charcoal-700 font-light leading-snug">
                    {t(`${project.key}_title` as 'p1_title')}
                  </h2>

                  <div className="w-12 h-px bg-gold my-6" />

                  {/* Body text */}
                  <p className="font-sans text-body-md text-charcoal-400 leading-relaxed">
                    {t(`${project.key}_body` as 'p1_body')}
                  </p>

                  {/* Stat highlight */}
                  <motion.div
                    variants={fadeIn}
                    className="mt-8 flex items-baseline gap-3"
                  >
                    <span className="font-serif text-display-xl text-gold font-light">
                      {t(`${project.key}_stat` as 'p1_stat')}
                    </span>
                    <span className="font-sans text-body-md text-charcoal-400">
                      {t(`${project.key}_stat_label` as 'p1_stat_label')}
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ===================== CTA ===================== */}
      <section className="bg-charcoal-800 py-16 md:py-20 lg:py-section relative overflow-hidden">
        {/* Decorative geometric element */}
        <div className="absolute top-8 right-8 md:top-12 md:right-16 opacity-5 pointer-events-none">
          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            className="w-48 h-48 md:w-72 md:h-72"
          >
            <polygon points="140,10 170,100 260,100 185,150 210,240 140,190 70,240 95,150 20,100 110,100" />
            <polygon
              points="140,40 160,110 230,110 175,145 195,220 140,180 85,220 105,145 50,110 120,110"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="max-w-[48rem] mx-auto px-6 md:px-10 text-center relative z-10"
        >
          <motion.div variants={fadeUp}>
            <div className="divider-gold-center mb-8" />
            <h2 className="font-serif text-display-lg text-white font-light">
              {t('cta_title')}
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="font-sans text-body-lg text-charcoal-200 mt-6 leading-relaxed"
          >
            {t('cta_body')}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <Button
              href="/contact"
              variant="inverted"
              size="lg"
              className="group text-label-lg uppercase tracking-widest"
            >
              {t('cta_button')}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
