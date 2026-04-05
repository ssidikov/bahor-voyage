'use client';

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

export function ProjectsPreviewSection() {
  const tHome = useTranslations('home');
  const tProjects = useTranslations('projects');

  return (
    <section className="bg-white py-16 md:py-20 lg:py-section">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 md:mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-label uppercase tracking-[0.15em] text-primary-400 mb-4"
          >
            {tHome('projects_preview_kicker')}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-display-lg text-charcoal-700 font-light max-w-3xl"
          >
            {tHome('projects_preview_title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-sans text-body-lg text-charcoal-400 mt-4 max-w-3xl leading-relaxed"
          >
            {tHome('projects_preview_body')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7"
        >
          {PROJECT_PREVIEWS.map((project) => (
            <motion.article
              key={project.key}
              variants={fadeUp}
              className="rounded-3xl border border-border-soft overflow-hidden bg-surface-default"
            >
              <div className="relative aspect-4/3">
                <Image
                  src={project.image}
                  alt={tHome(project.imageAltKey)}
                  fill
                  className="object-cover"
                  placeholder="empty"
                />
              </div>

              <div className="p-6 md:p-7">
                <p className="text-label uppercase tracking-[0.12em] text-primary-400">
                  {tProjects(`${project.key}_region` as 'p1_region')}
                </p>
                <h3 className="font-serif text-2xl text-charcoal-700 font-light mt-3 leading-tight">
                  {tProjects(`${project.key}_title` as 'p1_title')}
                </h3>
                <p className="font-sans text-body-md text-charcoal-400 mt-4 leading-relaxed">
                  {tProjects(`${project.key}_body` as 'p1_body')}
                </p>
                <div className="mt-6 flex items-end gap-2">
                  <span className="font-serif text-display-sm text-gold">
                    {tProjects(`${project.key}_stat` as 'p1_stat')}
                  </span>
                  <span className="text-body-sm text-charcoal-400 pb-1">
                    {tProjects(`${project.key}_stat_label` as 'p1_stat_label')}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-10 md:mt-12"
        >
          <Button
            href="/projects"
            variant="outline"
            className="w-full md:w-auto"
          >
            {tHome('projects_preview_cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectsPreviewSection;
