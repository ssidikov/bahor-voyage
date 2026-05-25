---
description: Publish a new blog article to Bahor-Voyage Sanity CMS. Use when the user pastes article content (title, body text, images, keywords) and wants it published to the blog.
---

# Publish Blog Article — Bahor-Voyage

Use this workflow when the user says "publish article", "new blog post", "post this", or pastes article content to be published.

## Step 1 — Collect input

Ask for anything missing:

| Field              | Required | Notes                                          |
| ------------------ | -------- | ---------------------------------------------- |
| Title (French)     | ✓        | Must include the focus keyword                 |
| Body text          | ✓        | Plain text or Markdown (see format below)      |
| Focus keyword      | ✓        | Main SEO keyword in French                     |
| Cover image URL    | ✓        | From Unsplash, Pexels, or user-provided        |
| Secondary keywords | optional | 3-5 related terms                              |
| Excerpt            | optional | Auto-generated from first 160 chars if missing |
| Publish date       | optional | Defaults to today                              |

## Step 2 — Write `scripts/article-draft.json`

Create this file with the following schema:

```json
{
  "title": "Article title here",
  "slug": "article-slug-here",
  "excerpt": "150-220 char summary. Must include focus keyword.",
  "publishedAt": "2025-05-25T08:00:00.000Z",
  "isFeatured": false,
  "focusKeyword": "main seo keyword",
  "secondaryKeywords": ["keyword 2", "keyword 3", "keyword 4"],
  "seoTitle": "SEO title — 50-60 chars with keyword",
  "metaDescription": "Meta description 140-160 chars with keyword and CTA.",
  "ogTitle": "Open Graph title",
  "ogDescription": "Open Graph description",
  "twitterTitle": "Twitter card title",
  "twitterDescription": "Twitter card description",
  "coverImageUrl": "https://images.pexels.com/...",
  "coverImageAlt": "Descriptive alt text for cover image",
  "authorId": "author-bahor-voyage",
  "categoryIds": ["category-guide-voyage"],
  "tags": ["tag1", "tag2", "tag3"],
  "relatedTours": [{ "label": "Circuit name", "href": "/circuits/slug" }],
  "body": "## Section Heading\n\nParagraph text with **bold** and [internal link](/circuits).\n\n- Bullet item\n\n![Alt text](https://image-url.jpg)"
}
```

## Step 3 — Run the publisher

// turbo

```bash
npm run blog:publish
```

## Step 4 — Verify

Console output will show:

```
✅ Published!
   Document ID : blog-{slug}
   Slug        : {slug}
→ Article : http://localhost:3000/blog/{slug}
```

---

## Body Markdown Reference

The `body` field in `article-draft.json` accepts Markdown. The publisher converts it to Sanity Portable Text automatically.

| Syntax                   | Result                                     |
| ------------------------ | ------------------------------------------ |
| `## Heading`             | H2 section heading                         |
| `### Heading`            | H3 sub-heading                             |
| `Regular paragraph`      | Body text block                            |
| `- item`                 | Bullet list item                           |
| `1. item`                | Numbered list item                         |
| `**bold**`               | Bold/strong text                           |
| `*italic*` or `_italic_` | Italic/em text                             |
| `[text](url)`            | Link (internal `/circuits` or external)    |
| `![alt](url)`            | Inline image — auto-uploaded to Sanity CDN |
| `> quote`                | Blockquote                                 |

**Note:** `# Title` lines are skipped (title comes from the `title` field).

---

## SEO Checklist

Before writing `article-draft.json`, verify:

- [ ] Focus keyword appears in `title` (preferably in first 60 chars)
- [ ] Focus keyword appears in first paragraph of `body`
- [ ] Focus keyword appears in at least 2 H2 headings
- [ ] `seoTitle` is 50-60 chars and contains focus keyword
- [ ] `metaDescription` is 140-160 chars with keyword + call to action
- [ ] At least 3 internal links in body (circuits, contact)
- [ ] At least 1 link to `/contact`
- [ ] Article targets 1200+ words for competitive keywords

---

## Internal Links — Always Suggest

Include relevant internal links from this list in the article body:

- `/circuits` — tous les circuits Ouzbékistan
- `/circuits/samarcande-boukhara` — Circuit Samarcande-Boukhara 8 jours
- `/circuits/grand-circuit-18j` — Grand Circuit 18 jours
- `/circuits/immersion-totale-14j` — Immersion totale 14 jours
- `/circuits/voyage-solidaire-11j` — Voyage solidaire 11 jours
- `/contact` — Nous contacter / Demande de devis

---

## Slug Generation Rule

Lowercase → remove French accents → spaces to hyphens → max 60 chars

Examples:

- "Guide de Samarcande 2025" → `guide-de-samarcande-2025`
- "Visa Ouzbékistan : tout savoir" → `visa-ouzbekistan-tout-savoir`

---

## Photo Sources (royalty-free)

- **Unsplash** (free, no account): `https://unsplash.com/s/photos/uzbekistan`
- **Pexels** (free, no account): `https://www.pexels.com/search/uzbekistan/`
- Verify the URL returns 200 before using — do not guess photo IDs
