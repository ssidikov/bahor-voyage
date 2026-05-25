import { defineField, defineType } from 'sanity';

export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Catégorie de blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO — Titre',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO — Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Image représentative',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
});
