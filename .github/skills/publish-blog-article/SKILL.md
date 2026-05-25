---
name: publish-blog-article
description: 'Publish a new blog article to Bahor-Voyage Sanity CMS. Use when the user pastes article content (title, body text, images, keywords) and wants it published to the blog.'
argument-hint: 'Paste the article title, body text, cover image URL, and focus keyword.'
---

# Publish Blog Article — Bahor-Voyage CMS

Use this skill when the user says "publish article", "new blog post", "post this", or pastes article content to be published.

## Workflow

### 1. Collect input

Ask for anything missing:

| Field              | Required | Notes                                          |
| ------------------ | -------- | ---------------------------------------------- |
| Title (French)     | ✓        | Must include the focus keyword                 |
| Body text          | ✓        | Plain text or Markdown                         |
| Focus keyword      | ✓        | Main SEO keyword in French                     |
| Cover image URL    | ✓        | From Unsplash, Pexels, or user-provided        |
| Secondary keywords | optional | 3-5 related terms                              |
| Excerpt            | optional | Auto-generated from first 160 chars if missing |

### 2. Write `scripts/article-draft.json`

```json
{
  "title": "Article title here",
  "slug": "article-slug-here",
  "excerpt": "150-220 char summary with focus keyword.",
  "publishedAt": "2025-05-25T08:00:00.000Z",
  "isFeatured": false,
  "focusKeyword": "main seo keyword",
  "secondaryKeywords": ["keyword 2", "keyword 3"],
  "seoTitle": "SEO title 50-60 chars",
  "metaDescription": "Meta description 140-160 chars with keyword and CTA.",
  "ogTitle": "OG title",
  "ogDescription": "OG description",
  "twitterTitle": "Twitter title",
  "twitterDescription": "Twitter description",
  "coverImageUrl": "https://images.pexels.com/...",
  "coverImageAlt": "Descriptive alt text",
  "authorId": "author-bahor-voyage",
  "categoryIds": ["category-guide-voyage"],
  "tags": ["tag1", "tag2"],
  "relatedTours": [{ "label": "Circuit name", "href": "/circuits/slug" }],
  "body": "## H2 Heading\n\nParagraph with **bold** and [link](/circuits).\n\n- Bullet\n\n![Alt](https://img-url.jpg)"
}
```

### 3. Run

```bash
npm run blog:publish
```

### 4. Verify

Output shows `✅ Published!` with `→ Article : http://localhost:3000/blog/{slug}`

---

## Body Markdown Reference

| Syntax        | Result                                 |
| ------------- | -------------------------------------- |
| `## Heading`  | H2                                     |
| `### Heading` | H3                                     |
| `- item`      | Bullet list                            |
| `**bold**`    | Bold                                   |
| `*italic*`    | Italic                                 |
| `[text](url)` | Link                                   |
| `![alt](url)` | Inline image (auto-uploaded to Sanity) |
| `> quote`     | Blockquote                             |

## SEO Checklist

- [ ] Focus keyword in title (first 60 chars)
- [ ] Focus keyword in first paragraph
- [ ] Focus keyword in at least 2 H2 headings
- [ ] `seoTitle` 50-60 chars
- [ ] `metaDescription` 140-160 chars with CTA
- [ ] 3+ internal links to `/circuits/*`
- [ ] 1+ link to `/contact`

## Internal Links

- `/circuits` — tous les circuits
- `/circuits/samarcande-boukhara` — 8 jours
- `/circuits/grand-circuit-18j` — 18 jours
- `/circuits/immersion-totale-14j` — 14 jours
- `/circuits/voyage-solidaire-11j` — 11 jours solidaire
- `/contact` — nous contacter
