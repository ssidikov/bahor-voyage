'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui';
import { Link } from '@/i18n/navigation';
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
} from '@/lib/animations';

/* ---- SVG icons for the three pillars ---- */
function IconPeople() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="9" r="4" />
      <path d="M4 26c0-4.418 3.582-8 8-8s8 3.582 8 8" />
      <circle cx="22" cy="9" r="3" />
      <path d="M22 18c2.761 0 5 2.686 5 6" />
    </svg>
  );
}

function IconEconomy() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 26h24" />
      <path d="M8 26V14l8-8 8 8v12" />
      <rect x="13" y="19" width="6" height="7" />
    </svg>
  );
}

function IconKnowledge() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8h20v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8Z" />
      <path d="M6 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2" />
      <path d="M16 12v12M11 15l5-3 5 3" />
    </svg>
  );
}

const PRINCIPLES_CONFIG = [
  { key: 'p1', Icon: IconPeople },
  { key: 'p2', Icon: IconEconomy },
  { key: 'p3', Icon: IconKnowledge },
] as const;

export default function VoyageSolidairePage() {
  const t = useTranslations('voyage_solidaire');
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], ['0%', '20%']);

  const principles = PRINCIPLES_CONFIG.map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`${key}_title` as 'p1_title'),
    body: t(`${key}_body` as 'p1_body'),
  }));

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative h-screen min-h-125 overflow-hidden">
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ y: heroParallax }}
        >
          <Image
            src="/images/projects/projects-hero.jpg"
            alt=""
            fill
            priority
            quality={100}
            className="object-cover"
            placeholder="empty"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-charcoal-900/35" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/75 via-charcoal-900/15 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-16 md:pb-24">
          <div className="max-w-content mx-auto px-6 md:px-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="font-sans text-label uppercase tracking-[0.15em] text-white/70 mb-4"
            >
              {t('hero_kicker')}
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
              className="font-sans text-body-lg text-white/80 mt-5 max-w-xl"
            >
              {t('hero_subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              className="w-16 h-px bg-gold mt-8 origin-left"
            />
          </div>
        </div>
      </section>

      {/* ===================== INTRO CHAPEAU ===================== */}
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
              <p className="font-serif text-display-md text-charcoal-700 font-light leading-snug italic">
                {t('intro_quote')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===================== WHAT IS SOLIDARITY TRAVEL ===================== */}
      <section className="bg-white py-16 md:py-20 lg:py-section overflow-hidden">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            {/* Text column */}
            <motion.div variants={slideLeft} className="lg:col-span-6">
              <p className="text-label uppercase tracking-[0.15em] text-primary-400 mb-3">
                {t('definition_kicker')}
              </p>
              <h2 className="font-serif text-display-md text-charcoal-700 font-light leading-snug">
                {t('definition_title')}
              </h2>
              <div className="w-12 h-px bg-gold my-6" />
              <p className="font-sans text-body-md text-charcoal-400 leading-relaxed mb-5">
                {t('definition_body1')}
              </p>
              <p className="font-sans text-body-md text-charcoal-400 leading-relaxed">
                {t('definition_body2')}
              </p>
            </motion.div>

            {/* Image column */}
            <motion.div variants={slideRight} className="lg:col-span-6">
              <div
                className="relative aspect-4/3 overflow-hidden rounded-sm"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.25)',
                }}
              >
                <Image
                  src="/images/projects/project-trees.jpg"
                  alt="Tree planting in Gurlan, Khorezm"
                  fill
                  quality={100}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  placeholder="empty"
                />
                {/* Gold corner accents */}
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
          </motion.div>
        </div>
      </section>

      {/* ===================== WHY AFOR ===================== */}
      <section className="bg-sand-100 py-16 md:py-20 lg:py-section overflow-hidden">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            {/* Image column — reversed */}
            <motion.div
              variants={slideLeft}
              className="lg:col-span-6 lg:order-2"
            >
              <div
                className="relative aspect-4/3 overflow-hidden rounded-sm"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.25)',
                }}
              >
                <Image
                  src="/images/projects/project-education-AFOR.jpg"
                  alt="Youth education support"
                  fill
                  quality={100}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  placeholder="empty"
                />
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
              variants={slideRight}
              className="lg:col-span-6 lg:order-1"
            >
              <p className="text-label uppercase tracking-[0.15em] text-primary-400 mb-3">
                {t('why_kicker')}
              </p>
              <h2 className="font-serif text-display-md text-charcoal-700 font-light leading-snug">
                {t('why_title')}
              </h2>
              <div className="w-12 h-px bg-gold my-6" />
              <p className="font-sans text-body-md text-charcoal-400 leading-relaxed mb-5">
                {t('why_body1')}
              </p>
              <p className="font-sans text-body-md text-charcoal-400 leading-relaxed">
                {t('why_body2')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===================== THREE PRINCIPLES ===================== */}
      <section className="bg-white py-16 md:py-20 lg:py-section">
        <div className="max-w-content mx-auto px-6 md:px-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp}>
              <p className="text-label uppercase tracking-[0.15em] text-primary-400 mb-3">
                {t('principles_kicker')}
              </p>
              <h2 className="font-serif text-display-md text-charcoal-700 font-light">
                {t('principles_title')}
              </h2>
              <div className="divider-gold-center mt-8" />
            </motion.div>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {principles.map(({ key, Icon, title, body }) => (
              <motion.div
                key={key}
                variants={fadeUp}
                className="group bg-sand-50 border border-sand-200 rounded-sm p-8 hover:border-gold/50 transition-colors duration-300"
              >
                <div className="text-primary-400 mb-5 transition-transform duration-300 group-hover:scale-110 origin-left">
                  <Icon />
                </div>
                <h3 className="font-serif text-display-sm text-charcoal-700 font-light mb-3">
                  {title}
                </h3>
                <div className="w-8 h-px bg-gold/60 mb-4" />
                <p className="font-sans text-body-md text-charcoal-400 leading-relaxed">
                  {body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== CUSTOMISE YOUR JOURNEY ===================== */}
      <section className="bg-sand-100 py-16 md:py-20 lg:py-section overflow-hidden">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
          >
            {/* Text */}
            <motion.div variants={slideLeft} className="lg:col-span-7">
              <p className="text-label uppercase tracking-[0.15em] text-primary-400 mb-3">
                {t('custom_kicker')}
              </p>
              <h2 className="font-serif text-display-md text-charcoal-700 font-light leading-snug">
                {t('custom_title')}
              </h2>
              <div className="w-12 h-px bg-gold my-6" />
              <p className="font-sans text-body-md text-charcoal-400 leading-relaxed">
                {t('custom_body')}
              </p>
            </motion.div>

            {/* Booking card */}
            <motion.div variants={slideRight} className="lg:col-span-5">
              <div className="bg-white border border-sand-200 rounded-sm p-8 shadow-sm">
                <Image
                  src="/images/projects/project-entrepreneurship.jpg"
                  alt=""
                  width={480}
                  height={270}
                  quality={100}
                  className="object-cover rounded-sm w-full aspect-video mb-6"
                  placeholder="empty"
                />
                <Button
                  href="/circuits"
                  variant="primary"
                  className="group w-full mb-3 text-label-lg uppercase tracking-widest px-7 py-3"
                >
                  {t('custom_cta')}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Button>
                <p className="font-sans text-body-sm text-charcoal-400 text-center">
                  {t('custom_cta_sub')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
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
            <Link
              href="/projects"
              className="font-sans text-body-md text-charcoal-300 hover:text-white underline underline-offset-4 transition-colors duration-200"
            >
              {t('cta_link')}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
