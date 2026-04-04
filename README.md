# Bahor Voyage

Bahor Voyage is a multilingual Next.js App Router website for curated Uzbekistan travel circuits and solidarity projects.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- next-intl for localization
- Framer Motion for shared motion patterns

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open http://localhost:3000

## Build and Quality Commands

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run build
npm run start
```

## Routing and Localization

- Locale routes are under app/[locale]
- Default locale is French with URL behavior configured in i18n/routing.ts
- French uses prefix as-needed (root route /)
- English routes use /en
- Locale detection is URL-driven and should remain explicit

Relevant files:

- i18n/routing.ts
- i18n/navigation.ts
- i18n/request.ts
- app/[locale]/layout.tsx

## Project Structure

- app/[locale]: route composition and page metadata
- components/home: homepage sections
- components/circuits: circuits listing and tour pages
- components/projects: solidarity projects pages
- components/layout: header and footer
- components/ui: reusable primitives (Button, Card, Badge, Section)
- lib/animations.ts: shared motion variants
- messages/\*.json: translation dictionaries

## Design System Setup

The design system is token-first and component-driven.

### Theme Source of Truth

- Primary theme tokens live in app/[locale]/globals.css
- Reusable components should use semantic aliases (action, surface, border, focus) instead of legacy one-off token names

### Core Primitive Layer

Use and extend existing primitives before introducing new ad-hoc styles:

- components/ui/Button.tsx
- components/ui/Card.tsx
- components/ui/Badge.tsx
- components/ui/Section.tsx

### Current Migration Direction

1. Replace deprecated utility names (for example: primary-light, primary-dark)
2. Normalize CTA patterns to shared Button variants
3. Keep layout sections on consistent surface and border tokens
4. Reuse motion variants from lib/animations.ts instead of local one-off animation configs

### Validation Checklist

1. Lint passes for edited files
2. Format check passes
3. Header and homepage CTAs are primitive-based
4. Locale routes / and /en have visual parity for migrated sections
5. No deprecated token names remain in primitives

## Contribution Notes

- Prefer Server Components unless client-side behavior is required
- Keep translations in messages/en.json and messages/fr.json
- Use type-only imports where possible
- Avoid duplicating motion variants across feature components
- Preserve existing visual language and spacing rhythm when extending sections
