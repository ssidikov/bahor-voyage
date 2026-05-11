'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/components/ui';
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
} from '@/lib/animations';

/* ─── inline SVG icons ─────────────────────────────────────────────────────── */
function IconHeart() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-7 h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-7 h-7"
    >
      <circle cx="12" cy="12" r="9" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 7.5l-2.25 4.5-4.5 2.25 2.25-4.5 4.5-2.25z"
      />
    </svg>
  );
}

function IconLeaf() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-7 h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.249 2.249 0 0017.5 15.5M19.5 16.5a9 9 0 01-1.5 1.5"
      />
    </svg>
  );
}

/* ─── timeline step ────────────────────────────────────────────────────────── */
type TimelineStepProps = {
  label: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
};

function TimelineStep({
  label,
  title,
  body,
  imageSrc,
  imageAlt,
  reverse,
}: TimelineStepProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}
    >
      {/* image */}
      <motion.div
        variants={reverse ? slideLeft : slideRight}
        className={reverse ? 'lg:col-start-2' : ''}
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-sm">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            quality={100}
            className="object-cover"
          />
          {/* gold label overlay */}
          <div className="absolute bottom-0 left-0 px-5 py-3 bg-charcoal-800/80 backdrop-blur-sm">
            <span className="font-serif italic text-gold text-xl">{label}</span>
          </div>
        </div>
      </motion.div>

      {/* text */}
      <motion.div
        variants={reverse ? slideRight : slideLeft}
        className={reverse ? 'lg:col-start-1 lg:row-start-1' : ''}
      >
        <div className="w-8 h-px bg-gold mb-6" />
        <h3 className="font-serif text-display-md text-charcoal-700 font-light leading-snug mb-5">
          {title}
        </h3>
        <p className="font-sans text-body-md text-charcoal-500 leading-relaxed">
          {body}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── team card ────────────────────────────────────────────────────────────── */
type TeamCardProps = {
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
};

function TeamCard({ name, role, bio, imageSrc }: TeamCardProps) {
  return (
    <motion.div variants={fadeUp} className="group flex flex-col">
      {/* portrait */}
      <div
        className="relative aspect-3/4 overflow-hidden mb-5"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.25)' }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            quality={100}
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          /* elegant placeholder */
          <div className="w-full h-full bg-sand-100 flex items-end justify-center pb-8">
            <svg
              viewBox="0 0 80 100"
              className="w-24 text-sand-300"
              fill="currentColor"
            >
              <circle cx="40" cy="32" r="18" />
              <path d="M0 100 Q0 60 40 60 Q80 60 80 100Z" />
            </svg>
          </div>
        )}
      </div>
      {/* info */}
      <p className="font-serif text-xl text-charcoal-700 mb-1">{name}</p>
      <p className="text-label-lg uppercase tracking-widest text-gold mb-3">
        {role}
      </p>
      <p className="font-sans text-body-md text-charcoal-400 leading-relaxed">
        {bio}
      </p>
    </motion.div>
  );
}

/* ─── commitment card ──────────────────────────────────────────────────────── */
type CommitCardProps = { icon: React.ReactNode; title: string; body: string };

function CommitCard({ icon, title, body }: CommitCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white border border-sand-200 p-8 flex flex-col gap-5 hover:shadow-card-hover transition-shadow duration-300"
      style={{ borderRadius: 'var(--radius-card)' }}
    >
      <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-400">
        {icon}
      </div>
      <h3 className="font-serif text-display-md text-charcoal-700 font-light">
        {title}
      </h3>
      <div className="w-6 h-px bg-gold" />
      <p className="font-sans text-body-md text-charcoal-400 leading-relaxed">
        {body}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                             */
/* ═══════════════════════════════════════════════════════════════════════════ */

export function AboutPage() {
  const t = useTranslations('about');

  /* parallax hero */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* history images – destructured so TS knows every element is defined */
  const [historyImg0, historyImg1, historyImg2] = [
    { src: '/images/afor-voyage.jpg', alt: 'Fondation AFOR Lyon 2012' },
    {
      src: '/images/tours/Registan.jpg',
      alt: 'Premier voyage solidaire \u2013 Route de la Soie',
    },
    {
      src: '/images/afor-voyage-2.jpeg',
      alt: 'Projets communautaires \u00e0 Khorezm',
    },
  ] as const;

  return (
    <>
      {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative bg-[#fafafa] py-6">
        <div className="mx-2 rounded-3xl overflow-hidden relative h-[72vh] min-h-125">
          {/* parallax image */}
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <Image
              src="/images/afor-voyage.jpg"
              alt="AFOR – Association France Ouzbékistan Racines"
              fill
              priority
              quality={100}
              className="object-cover"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/80 via-charcoal-800/30 to-transparent" />
          </motion.div>

          {/* headline */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute bottom-0 left-0 right-0 z-10 pb-10 md:pb-14 px-8 md:px-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-primary/40" />
              <p className="text-label uppercase tracking-[0.18em] text-white/70">
                {t('hero_kicker')}
              </p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="font-serif text-display-xl text-white font-light leading-tight max-w-3xl"
            >
              {t('hero_title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-sans text-body-lg text-white/70 mt-4 max-w-xl"
            >
              {t('hero_subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="w-14 h-px bg-gold mt-8 origin-left"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══ QUOTE ═════════════════════════════════════════════════════════ */}
      <section className="bg-[#fafafa] py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="divider-gold-center mb-8" />
            <motion.blockquote
              variants={fadeUp}
              className="font-serif text-display-md text-charcoal-700 font-light leading-relaxed italic"
            >
              {'“'}
              {t('quote')}
              {'”'}
            </motion.blockquote>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-label uppercase tracking-[0.12em] text-gold"
            >
              — {t('quote_attribution')}
            </motion.p>
            <div className="divider-gold-center mt-8" />
          </motion.div>
        </div>
      </section>

      {/* ═══ HISTORY ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 lg:py-section bg-white">
        <div className="max-w-content mx-auto px-6 md:px-10">
          {/* section header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-14 md:mb-20"
          >
            <motion.p
              variants={fadeUp}
              className="text-label uppercase tracking-[0.15em] text-gold mb-3"
            >
              {t('history_kicker')}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-display-lg text-charcoal-700 font-light max-w-2xl"
            >
              {t('history_title')}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 font-sans text-body-md text-charcoal-400 max-w-2xl leading-relaxed"
            >
              {t('history_intro')}
            </motion.p>
          </motion.div>

          {/* timeline steps */}
          <div className="flex flex-col gap-16 md:gap-24">
            <TimelineStep
              label={t('h1_label')}
              title={t('h1_title')}
              body={t('h1_body')}
              imageSrc={historyImg0.src}
              imageAlt={historyImg0.alt}
            />
            <TimelineStep
              label={t('h2_label')}
              title={t('h2_title')}
              body={t('h2_body')}
              imageSrc={historyImg1.src}
              imageAlt={historyImg1.alt}
              reverse
            />
            <TimelineStep
              label={t('h3_label')}
              title={t('h3_title')}
              body={t('h3_body')}
              imageSrc={historyImg2.src}
              imageAlt={historyImg2.alt}
            />
          </div>
        </div>
      </section>

      {/* ═══ TEAM ══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 lg:py-section bg-[#fafafa]">
        <div className="max-w-content mx-auto px-6 md:px-10">
          {/* header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-14 md:mb-20"
          >
            <motion.p
              variants={fadeUp}
              className="text-label uppercase tracking-[0.15em] text-gold mb-3"
            >
              {t('team_kicker')}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-display-lg text-charcoal-700 font-light"
            >
              {t('team_title')}
            </motion.h2>
          </motion.div>

          {/* team grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-10"
          >
            <TeamCard
              name={t('t1_name')}
              role={t('t1_role')}
              bio={t('t1_bio')}
              imageSrc="/images/Navbakhor-BUDOT.jpg"
            />
            <TeamCard
              name={t('t2_name')}
              role={t('t2_role')}
              bio={t('t2_bio')}
            />
            <TeamCard
              name={t('t3_name')}
              role={t('t3_role')}
              bio={t('t3_bio')}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══ COMMITMENTS ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 lg:py-section bg-white">
        <div className="max-w-content mx-auto px-6 md:px-10">
          {/* header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-14 md:mb-20"
          >
            <motion.p
              variants={fadeUp}
              className="text-label uppercase tracking-[0.15em] text-gold mb-3"
            >
              {t('commitments_kicker')}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-display-lg text-charcoal-700 font-light max-w-2xl mx-auto"
            >
              {t('commitments_title')}
            </motion.h2>
          </motion.div>

          {/* cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <CommitCard
              icon={<IconHeart />}
              title={t('e1_title')}
              body={t('e1_body')}
            />
            <CommitCard
              icon={<IconCompass />}
              title={t('e2_title')}
              body={t('e2_body')}
            />
            <CommitCard
              icon={<IconLeaf />}
              title={t('e3_title')}
              body={t('e3_body')}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══ PARTNERS ══════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-[#fafafa]">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-label uppercase tracking-[0.15em] text-gold mb-3"
            >
              {t('partners_kicker')}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-display-md text-charcoal-700 font-light mb-4"
            >
              {t('partners_title')}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-sans text-body-md text-charcoal-400 max-w-2xl mx-auto mb-12"
            >
              {t('partners_body')}
            </motion.p>

            <motion.ul
              variants={staggerContainer}
              className="flex flex-col items-center gap-6"
            >
              {(['p1', 'p2', 'p3', 'p4', 'p5'] as const).map((key, i) => (
                <motion.li
                  key={key}
                  variants={fadeUp}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="font-sans text-charcoal-500 tracking-wide">
                    {t(key)}
                  </span>
                  {i < 4 && <div className="w-px h-5 bg-sand-300" />}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#fafafa] py-6">
        <div className="mx-2 rounded-3xl overflow-hidden bg-charcoal-800">
          <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-20 lg:py-section">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-center max-w-2xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                className="font-serif text-display-lg text-white font-light mb-5"
              >
                {t('cta_title')}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="font-sans text-body-md text-charcoal-200 leading-relaxed mb-10"
              >
                {t('cta_body')}
              </motion.p>
              <motion.div variants={fadeUp}>
                <Button
                  href="/contact"
                  variant="inverted"
                  size="lg"
                  className="group text-label uppercase tracking-widest"
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
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
