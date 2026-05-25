import { defineArrayMember, defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Article de blog',
  type: 'document',
  groups: [
    { name: 'editorial', title: 'Contenu', default: true },
    { name: 'media', title: 'Médias' },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Paramètres' },
  ],
  fields: [
    /* ── CONTENU ─────────────────────────────────────────── */
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      group: 'editorial',
      validation: (R) => R.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      group: 'editorial',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait / Chapô',
      type: 'text',
      rows: 3,
      group: 'editorial',
      description:
        'Utilisé dans les cartes et comme fallback meta description (150-220 caractères).',
      validation: (R) => R.required().min(50).max(220),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'editorial',
    }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogCategory' }] }],
      group: 'editorial',
    }),
    defineField({
      name: 'tags',
      title: 'Mots-clés / Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'editorial',
    }),
    defineField({
      name: 'body',
      title: "Corps de l'article",
      type: 'array',
      group: 'editorial',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Citation', value: 'blockquote' },
          ],
          lists: [
            { title: 'Liste à puces', value: 'bullet' },
            { title: 'Liste numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
              { title: 'Souligné', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (R) =>
                      R.required().uri({ allowRelative: true }),
                  }),
                  defineField({
                    name: 'blank',
                    title: 'Ouvrir dans un nouvel onglet',
                    type: 'boolean',
                    initialValue: false,
                  }),
                  defineField({
                    name: 'rel',
                    title: 'Attribut rel',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Aucun', value: '' },
                        { title: 'nofollow', value: 'nofollow' },
                        { title: 'sponsored', value: 'sponsored' },
                        { title: 'noopener', value: 'noopener' },
                      ],
                    },
                    initialValue: '',
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Légende',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'relatedTours',
      title: 'Circuits liés',
      type: 'array',
      group: 'editorial',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Nom du circuit',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'URL du circuit (ex: /circuits/samarcande-boukhara)',
              type: 'string',
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        }),
      ],
    }),

    /* ── MÉDIAS ──────────────────────────────────────────── */
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          validation: (R) => R.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Légende (optionnel)',
          type: 'string',
        }),
      ],
      validation: (R) => R.required(),
    }),

    /* ── SEO ─────────────────────────────────────────────── */
    defineField({
      name: 'seoTitle',
      title: 'SEO — Titre (balise title)',
      type: 'string',
      group: 'seo',
      description:
        "Idéalement 50-60 caractères. Laissez vide pour utiliser le titre de l'article.",
      validation: (R) => R.max(65),
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO — Meta description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description:
        "Idéalement 140-160 caractères. Laissez vide pour utiliser l'extrait.",
      validation: (R) => R.max(165),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'SEO — Mot-clé principal',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'SEO — Mots-clés secondaires',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'seo',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'SEO — Canonical URL (optionnel)',
      type: 'url',
      group: 'seo',
    }),
    defineField({
      name: 'robotsNoIndex',
      title: 'Masquer des moteurs de recherche (noindex)',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),
    defineField({
      name: 'robotsNoFollow',
      title: 'Bloquer le suivi de liens (nofollow)',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph — Titre',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph — Description',
      type: 'text',
      rows: 2,
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph — Image',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texte alternatif' }),
      ],
    }),
    defineField({
      name: 'twitterTitle',
      title: 'Twitter — Titre',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'twitterDescription',
      title: 'Twitter — Description',
      type: 'text',
      rows: 2,
      group: 'seo',
    }),

    /* ── PARAMÈTRES ──────────────────────────────────────── */
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      group: 'settings',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Mettre en avant (featured)',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString('fr-FR')
          : 'Sans date',
        media,
      };
    },
  },

  orderings: [
    {
      title: 'Date de publication (récent → ancien)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
