'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button, PageHero } from '@/components/ui';
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

  return (
    <>
      {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
      <PageHero
        image={{
          src: 'https://cdn.bahorvoyage.com/images/about.jpg',
          alt: 'BAHOR Voyage — le voyage comme rencontre',
        }}
        kicker={t('hero_kicker')}
        title={t('hero_title')}
        subtitle={t('hero_subtitle')}
        containerClassName="h-[72vh] min-h-125"
      />

      {/* ═══ ORIGIN — Uzbek childhood ═══════════════════════════════════════ */}
      <section className="py-16 md:py-20 lg:py-section bg-white">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* text */}
            <motion.div variants={slideRight}>
              <div className="w-8 h-px bg-gold mb-6" />
              <h2 className="font-serif text-display-lg text-charcoal-700 font-light leading-snug mb-6">
                {t('origin_title')}
              </h2>
              <p className="font-sans text-body-md text-charcoal-500 leading-relaxed mb-5">
                {t('origin_p1')}
              </p>
              <p className="font-sans text-body-md text-charcoal-400 leading-relaxed">
                {t('origin_p2')}
              </p>
            </motion.div>

            {/* image */}
            <motion.div variants={slideLeft}>
              <div className="relative aspect-4/3 overflow-hidden rounded-sm">
                <Image
                  src="https://cdn.bahorvoyage.com/images/about/uzbek-bazaar.png"
                  alt="Bazar ouzbek — couleurs, soie et thé partagé"
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ LYON — Silk connection ═══════════════════════════════════════ */}
      <section className="py-16 md:py-20 lg:py-section bg-[#fafafa]">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center lg:grid-flow-dense"
          >
            {/* image — left on desktop */}
            <motion.div variants={slideRight}>
              <div className="relative aspect-4/3 overflow-hidden rounded-sm">
                <Image
                  src="https://cdn.bahorvoyage.com/images/about/lyon-silk.png"
                  alt="Atelier de tissage de soie — Lyon, Croix-Rousse"
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* text — right on desktop */}
            <motion.div variants={slideLeft} className="lg:col-start-2">
              <div className="w-8 h-px bg-gold mb-6" />
              <h2 className="font-serif text-display-lg text-charcoal-700 font-light leading-snug mb-6">
                {t('lyon_title')}
              </h2>
              <p className="font-sans text-body-md text-charcoal-500 leading-relaxed">
                {t('lyon_body')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ENTERPRISE — Full-width image band ═══════════════════════════ */}
      <section className="relative bg-[#fafafa] py-6">
        <div className="mx-2 rounded-3xl overflow-hidden relative min-h-[50vh]">
          {/* Background image */}
          <Image
            src="https://cdn.bahorvoyage.com/images/ateliers-bahor.webp"
            alt="Ateliers BAHOR — projets communautaires"
            fill
            quality={90}
            className="object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-charcoal-900/65" />

          {/* Content */}
          <div className="relative z-10 max-w-content mx-auto px-8 md:px-14 py-16 md:py-24">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="max-w-2xl"
            >
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-8 bg-gold" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-serif text-display-lg text-white font-light leading-snug mb-6"
              >
                {t('enterprise_title')}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="font-sans text-body-md text-white/80 leading-relaxed"
              >
                {t('enterprise_body')}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ MISSION — Centered blockquote ═══════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
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
              {'"'}
              {t('mission_quote')}
              {'"'}
            </motion.blockquote>
            <motion.p
              variants={fadeUp}
              className="mt-8 font-sans text-body-md text-charcoal-500 leading-relaxed"
            >
              {t('mission_p1')}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-4 font-sans text-body-md text-charcoal-400 leading-relaxed"
            >
              {t('mission_p2')}
            </motion.p>
            <div className="divider-gold-center mt-8" />
          </motion.div>
        </div>
      </section>

      {/* ═══ IMMERSION — Image + text ═════════════════════════════════════ */}
      <section className="py-16 md:py-20 lg:py-section bg-[#fafafa]">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* text */}
            <motion.div variants={slideRight}>
              <div className="w-8 h-px bg-gold mb-6" />
              <h2 className="font-serif text-display-lg text-charcoal-700 font-light leading-snug mb-6">
                {t('immersion_title')}
              </h2>
              <p className="font-sans text-body-md text-charcoal-500 leading-relaxed mb-5">
                {t('immersion_p1')}
              </p>
              <p className="font-sans text-body-md text-charcoal-400 leading-relaxed mb-5">
                {t('immersion_p2')}
              </p>
              <p className="font-sans text-body-md text-charcoal-400 leading-relaxed">
                {t('immersion_p3')}
              </p>
            </motion.div>

            {/* image */}
            <motion.div variants={slideLeft}>
              <div className="relative aspect-4/3 overflow-hidden rounded-sm">
                <Image
                  src="https://cdn.bahorvoyage.com/images/voyage-solidaire.avif"
                  alt="Rencontres authentiques — artisans et voyageurs"
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ IMPACT — Cards ══════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 lg:py-section bg-white">
        <div className="max-w-content mx-auto px-6 md:px-10">
          {/* header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-14 md:mb-20"
          >
            <motion.div variants={fadeUp} className="w-8 h-px bg-gold mb-6" />
            <motion.h2
              variants={fadeUp}
              className="font-serif text-display-lg text-charcoal-700 font-light max-w-2xl mb-5"
            >
              {t('impact_title')}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-sans text-body-md text-charcoal-400 max-w-2xl leading-relaxed mb-4"
            >
              {t('impact_p1')}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-sans text-body-md text-charcoal-400 max-w-2xl leading-relaxed mb-4"
            >
              {t('impact_p2')}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-sans text-body-md text-charcoal-400 max-w-2xl leading-relaxed"
            >
              {t('impact_p3')}
            </motion.p>
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
              title={t('impact_e1_title')}
              body={t('impact_e1_body')}
            />
            <CommitCard
              icon={<IconCompass />}
              title={t('impact_e2_title')}
              body={t('impact_e2_body')}
            />
            <CommitCard
              icon={<IconLeaf />}
              title={t('impact_e3_title')}
              body={t('impact_e3_body')}
            />
          </motion.div>
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
              imageSrc="https://cdn.bahorvoyage.com/images/Navbakhor-BUDOT.jpg"
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

      {/* ═══ CLOSING — BAHOR = Printemps ═════════════════════════════════ */}
      <section className="bg-[#fafafa] py-6">
        <div className="mx-2 rounded-3xl overflow-hidden relative">
          {/* Background image — spring blossoms */}
          <Image
            src="https://cdn.bahorvoyage.com/images/about/spring.jpg"
            alt="Printemps en Ouzbékistan — fleurs et architecture"
            fill
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-900/70" />

          <div className="relative z-10 max-w-content mx-auto px-6 md:px-10 py-16 md:py-24 lg:py-section">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.h2
                variants={fadeUp}
                className="font-serif text-display-lg text-white font-light mb-6"
              >
                {t('closing_headline')}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="font-sans text-body-lg text-white/80 leading-relaxed mb-4"
              >
                {t('closing_p1')}
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-sans text-body-md text-white/70 leading-relaxed mb-8"
              >
                {t('closing_p2')}
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-sans text-body-md text-white/70 leading-relaxed mb-10"
              >
                {t('closing_p3')}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="divider-gold-center mb-10"
              />

              <motion.p
                variants={fadeUp}
                className="font-serif text-display-md text-gold font-light italic mb-3"
              >
                {t('closing_bahor')}
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-sans text-body-md text-white/70 leading-relaxed mb-10"
              >
                {t('closing_bahor_body')}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="divider-gold-center mb-10"
              />

              <motion.p
                variants={fadeUp}
                className="font-serif text-display-md text-white font-light mb-3"
              >
                {t('closing_welcome')}
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-sans text-body-md text-white/60 leading-relaxed mb-10"
              >
                {t('closing_welcome_body')}
              </motion.p>

              <motion.div variants={fadeUp}>
                <Button
                  href="/contact"
                  variant="inverted"
                  size="lg"
                  className="group text-label uppercase tracking-widest"
                >
                  {t('closing_cta')}
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
