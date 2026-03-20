'use client';

import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import TourCTA from './TourCTA';
import TourHero from './TourHero';
import TourIncludes from './TourIncludes';
import TourIntro from './TourIntro';
import TourPracticals from './TourPracticals';
import TourProgramme from './TourProgramme';
import type { TourData } from './types';

interface TourPageProps {
  data: TourData;
  /** Optional bullet-point keys to show inside the intro highlight card */
  introBulletKeys?: readonly string[];
}

/**
 * Generic tour page template.
 *
 * Usage:
 * ```tsx
 * import TourPage from '@/components/circuits/tour/TourPage';
 * import { samarkandBoukhara } from '@/components/circuits/tour/data/samarkand-boukhara';
 *
 * export default function SamarkandBukharaPage() {
 *   return <TourPage data={samarkandBoukhara} />;
 * }
 * ```
 */
export default function TourPage({ data, introBulletKeys }: TourPageProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <main>
      {/* 1. Hero */}
      <section ref={heroRef} style={{ position: 'relative' }}>
        <TourHero
          prefix={data.prefix}
          heroImage={data.heroImage}
          heroParallax={heroParallax}
          facts={data.facts}
        />
      </section>

      {/* 2. Intro / overview */}
      <TourIntro
        prefix={data.prefix}
        introImage={data.introImage}
        introImageAlt={data.introImageAlt}
        routeLabel={data.routeLabel}
        stats={data.stats}
        introBulletKeys={introBulletKeys}
      />

      {/* 3. Day-by-day programme */}
      <TourProgramme prefix={data.prefix} days={data.days} />

      {/* 4. Includes / Excludes */}
      <TourIncludes
        prefix={data.prefix}
        includes={data.includes}
        excludes={data.excludes}
      />

      {/* 5. Practical info */}
      <TourPracticals prefix={data.prefix} practicals={data.practicals} />

      {/* 6. CTA */}
      <TourCTA prefix={data.prefix} />
    </main>
  );
}
