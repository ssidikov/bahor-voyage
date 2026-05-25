require('dotenv/config');

const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

/* ── Sanity client ───────────────────────────────────────────────── */

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) { console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID'); process.exit(1); }
if (!process.env.SANITY_API_WRITE_TOKEN) { console.error('Missing SANITY_API_WRITE_TOKEN'); process.exit(1); }

/* ── Slug generator ──────────────────────────────────────────────── */

function toSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

/* ── Image uploader ──────────────────────────────────────────────── */

async function uploadImage(url, filename) {
  console.log(`  Uploading image: ${filename}`);
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Cannot fetch image ${url} — HTTP ${resp.status}`);
  const buffer = Buffer.from(await resp.arrayBuffer());
  const contentType = resp.headers.get('content-type') || 'image/jpeg';
  const asset = await client.assets.upload('image', buffer, { filename, contentType });
  return asset._id;
}

/* ── Inline markdown parser → Portable Text spans ───────────────── */

function parseInline(text, baseKey) {
  const spans = [];
  const markDefs = [];
  let remaining = text;
  let i = 0;
  let linkCount = 0;

  while (remaining.length > 0) {
    const lk = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (lk) {
      const key = `${baseKey}-lk${++linkCount}`;
      const isExternal = !lk[2].startsWith('/');
      markDefs.push({ _key: key, _type: 'link', href: lk[2], blank: isExternal, rel: isExternal ? 'noopener' : '' });
      spans.push({ _type: 'span', _key: `${baseKey}-s${++i}`, text: lk[1], marks: [key] });
      remaining = remaining.slice(lk[0].length);
      continue;
    }
    const bold = remaining.match(/^\*\*(.+?)\*\*/);
    if (bold) {
      spans.push({ _type: 'span', _key: `${baseKey}-s${++i}`, text: bold[1], marks: ['strong'] });
      remaining = remaining.slice(bold[0].length);
      continue;
    }
    const em = remaining.match(/^\*(.+?)\*/) || remaining.match(/^_(.+?)_/);
    if (em) {
      spans.push({ _type: 'span', _key: `${baseKey}-s${++i}`, text: em[1], marks: ['em'] });
      remaining = remaining.slice(em[0].length);
      continue;
    }
    const next = remaining.search(/\[|\*|_/);
    if (next < 0) {
      spans.push({ _type: 'span', _key: `${baseKey}-s${++i}`, text: remaining, marks: [] });
      remaining = '';
    } else if (next === 0) {
      spans.push({ _type: 'span', _key: `${baseKey}-s${++i}`, text: remaining[0], marks: [] });
      remaining = remaining.slice(1);
    } else {
      spans.push({ _type: 'span', _key: `${baseKey}-s${++i}`, text: remaining.slice(0, next), marks: [] });
      remaining = remaining.slice(next);
    }
  }

  return { spans, markDefs };
}

/* ── Markdown body → Portable Text blocks (with image placeholders) */

function parseMarkdown(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let counter = 0;
  const k = (prefix) => `${prefix}-${++counter}`;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith('# ')) continue; // skip H1 — it's the doc title

    if (line.startsWith('## ')) {
      const text = line.slice(3).trim();
      blocks.push({ _type: 'block', _key: k('h2'), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: k('s'), text, marks: [] }] });
      continue;
    }
    if (line.startsWith('### ')) {
      const text = line.slice(4).trim();
      blocks.push({ _type: 'block', _key: k('h3'), style: 'h3', markDefs: [], children: [{ _type: 'span', _key: k('s'), text, marks: [] }] });
      continue;
    }
    if (line.startsWith('> ')) {
      const text = line.slice(2).trim();
      blocks.push({ _type: 'block', _key: k('bq'), style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: k('s'), text, marks: [] }] });
      continue;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const bk = k('bl');
      const { spans, markDefs } = parseInline(line.slice(2).trim(), bk);
      blocks.push({ _type: 'block', _key: bk, style: 'normal', listItem: 'bullet', level: 1, markDefs, children: spans });
      continue;
    }
    const numbered = line.match(/^\d+\.\s+(.+)/);
    if (numbered) {
      const bk = k('nl');
      const { spans, markDefs } = parseInline(numbered[1], bk);
      blocks.push({ _type: 'block', _key: bk, style: 'normal', listItem: 'number', level: 1, markDefs, children: spans });
      continue;
    }
    // Inline image → pending placeholder resolved after upload
    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (img) {
      blocks.push({ _type: '__pendingImage__', _key: k('img'), alt: img[1], url: img[2] });
      continue;
    }
    // Regular paragraph
    const bk = k('p');
    const { spans, markDefs } = parseInline(line, bk);
    if (spans.length > 0) {
      blocks.push({ _type: 'block', _key: bk, style: 'normal', markDefs, children: spans });
    }
  }

  return blocks;
}

/* ── Main ────────────────────────────────────────────────────────── */

async function publish() {
  const draftPath = path.join(__dirname, 'article-draft.json');
  if (!fs.existsSync(draftPath)) {
    console.error('scripts/article-draft.json not found. Create it first (see skill: publish-blog-article).');
    process.exit(1);
  }

  const draft = JSON.parse(fs.readFileSync(draftPath, 'utf8'));

  const slug = draft.slug || toSlug(draft.title);
  const publishedAt = draft.publishedAt || new Date().toISOString();

  /* Parse markdown body into Portable Text blocks */
  let body = typeof draft.body === 'string'
    ? parseMarkdown(draft.body)
    : draft.body; // already Portable Text array

  /* Collect all image URLs to upload */
  const pendingImages = body.filter(b => b._type === '__pendingImage__');
  const allImageUploads = [];

  if (draft.coverImageUrl) {
    allImageUploads.push({ key: '__cover__', url: draft.coverImageUrl, filename: `cover-${slug}.jpg` });
  }
  for (const img of pendingImages) {
    const ext = img.url.split('?')[0].split('.').pop() || 'jpg';
    allImageUploads.push({ key: img._key, url: img.url, filename: `${img._key}-${slug}.${ext}` });
  }

  /* Upload all images in parallel */
  const uploadedRefs = {};
  if (allImageUploads.length > 0) {
    console.log(`Uploading ${allImageUploads.length} image(s)...`);
    await Promise.all(
      allImageUploads.map(async ({ key, url, filename }) => {
        uploadedRefs[key] = await uploadImage(url, filename);
      })
    );
  }

  /* Replace pending image placeholders with real Sanity image blocks */
  body = body.map(block => {
    if (block._type !== '__pendingImage__') return block;
    const assetRef = uploadedRefs[block._key];
    if (!assetRef) return null;
    return {
      _type: 'image',
      _key: block._key,
      asset: { _type: 'reference', _ref: assetRef },
      alt: block.alt || '',
      caption: block.caption || '',
    };
  }).filter(Boolean);

  /* Build cover image field */
  const coverImage = uploadedRefs['__cover__']
    ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: uploadedRefs['__cover__'] },
        alt: draft.coverImageAlt || draft.title,
        caption: draft.coverImageCaption || '',
      }
    : undefined;

  /* Build the Sanity document */
  const docId = `blog-${slug}`;
  const doc = {
    _id: docId,
    _type: 'blogPost',
    title: draft.title,
    slug: { _type: 'slug', current: slug },
    excerpt: draft.excerpt || '',
    publishedAt,
    isFeatured: draft.isFeatured ?? false,
    tags: draft.tags || [],
    body,
    ...(coverImage && { coverImage }),
    ...(draft.relatedTours && {
      relatedTours: draft.relatedTours.map((t, i) => ({
        _type: 'object', _key: `rt${i}`, label: t.label, href: t.href,
      })),
    }),
    /* SEO */
    ...(draft.seoTitle        && { seoTitle: draft.seoTitle }),
    ...(draft.metaDescription && { metaDescription: draft.metaDescription }),
    ...(draft.focusKeyword    && { focusKeyword: draft.focusKeyword }),
    ...(draft.secondaryKeywords && { secondaryKeywords: draft.secondaryKeywords }),
    ...(draft.ogTitle         && { ogTitle: draft.ogTitle }),
    ...(draft.ogDescription   && { ogDescription: draft.ogDescription }),
    ...(draft.twitterTitle    && { twitterTitle: draft.twitterTitle }),
    ...(draft.twitterDescription && { twitterDescription: draft.twitterDescription }),
  };

  /* Author ref */
  if (draft.authorId) {
    doc.author = { _type: 'reference', _ref: draft.authorId };
  }
  /* Category refs */
  if (draft.categoryIds && draft.categoryIds.length > 0) {
    doc.categories = draft.categoryIds.map(id => ({ _type: 'reference', _ref: id }));
  }

  console.log(`Publishing article: "${draft.title}"`);
  const result = await client.createOrReplace(doc);

  console.log(`\n✅ Published!`);
  console.log(`   Document ID : ${result._id}`);
  console.log(`   Slug        : ${slug}`);
  console.log(`\n→ Studio  : http://localhost:3000/studio`);
  console.log(`→ Article : http://localhost:3000/blog/${slug}`);
}

publish().catch(err => { console.error(err.message); process.exit(1); });
