'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/components/ui';
import { fadeUp, staggerContainer } from '@/lib/animations';

type ProjectId = 'p1' | 'p2' | 'p3';

type ProjectPreview = {
  key: ProjectId;
  image: string;
  imageAltKey:
    | 'projects_preview_alt_1'
    | 'projects_preview_alt_2'
    | 'projects_preview_alt_3';
};

const PROJECT_PREVIEWS: readonly ProjectPreview[] = [
  {
    key: 'p1',
    image: '/images/projects/project-trees.jpg',
    imageAltKey: 'projects_preview_alt_1',
  },
  {
    key: 'p2',
    image: '/images/projects/project-education-AFOR.jpg',
    imageAltKey: 'projects_preview_alt_2',
  },
  {
    key: 'p3',
    image: '/images/projects/project-entrepreneurship.jpg',
    imageAltKey: 'projects_preview_alt_3',
  },
] as const;

function ProjectCard({ project }: { project: ProjectPreview }) {
  const tHome = useTranslations('home');
  const tProjects = useTranslations('projects');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group overflow-hidden rounded-3xl border border-white/70 bg-white/70 backdrop-blur-sm shadow-[0_4px_24px_rgba(21,20,18,0.04)] hover:shadow-[0_20px_60px_rgba(21,20,18,0.12)] transition-shadow duration-500 cursor-pointer"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={project.image}
            alt={tHome(project.imageAltKey)}
            fill
            quality={100}
            className="object-cover"
            placeholder="empty"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/30 to-transparent" />

        {/* Floating stat badge */}
        <motion.div
          className="absolute bottom-4 right-4 rounded-xl bg-white/90 backdrop-blur-md px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-serif text-xl text-primary font-light">
            {tProjects(`${project.key}_stat` as 'p1_stat')}
          </span>
          <span className="text-xs text-charcoal-500 ml-1.5">
            {tProjects(`${project.key}_stat_label` as 'p1_stat_label')}
          </span>
        </motion.div>
      </div>

      <div className="p-6 md:p-7">
        <motion.p
          className="text-[0.7rem] uppercase tracking-[0.14em] text-primary-600 font-medium"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {tProjects(`${project.key}_region` as 'p1_region')}
        </motion.p>
        <h3 className="font-serif text-2xl text-charcoal-700 font-light mt-3 leading-tight group-hover:text-primary transition-colors duration-300">
          {tProjects(`${project.key}_title` as 'p1_title')}
        </h3>
        <p className="font-sans text-body-md text-charcoal-500 mt-3 leading-relaxed line-clamp-3">
          {tProjects(`${project.key}_body` as 'p1_body')}
        </p>
      </div>
    </motion.article>
  );
}

export function ProjectsPreviewSection() {
  const tHome = useTranslations('home');

  return (
    <section className="relative bg-[linear-gradient(180deg,#fffdf8_0%,#f7f2ea_100%)] py-20 md:py-28 lg:py-section overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-100 h-100 bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10">
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
            <p className="text-label uppercase tracking-[0.15em] text-primary-600">
              {tHome('projects_preview_kicker')}
            </p>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-display-lg font-light text-charcoal-700"
          >
            {tHome('projects_preview_title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-3xl text-body-lg leading-relaxed text-charcoal-500"
          >
            {tHome('projects_preview_body')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7"
        >
          {PROJECT_PREVIEWS.map((project) => (
            <ProjectCard key={project.key} project={project} />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 md:mt-14"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              href="/projects"
              variant="outline"
              className="w-full md:w-auto"
            >
              {tHome('projects_preview_cta')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectsPreviewSection;
