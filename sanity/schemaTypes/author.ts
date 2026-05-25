import { defineField, defineType } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Auteur',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle / Titre',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Biographie courte',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'avatar',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          validation: (R) => R.required(),
        }),
      ],
    }),
    defineField({
      name: 'url',
      title: 'Lien profil / social',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'avatar' },
  },
});
