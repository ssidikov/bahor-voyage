---
name: nextjs-frontend-design
description: 'Create production-grade Next.js App Router UI for Bahor Voyage. Use whenever the user asks for landing page design, section redesign, component styling, responsive layout, framer-motion animations, or visual polish in app and components folders.'
argument-hint: 'What page or section should be designed or redesigned?'
---

# Next.js Frontend Design

Build distinctive, responsive UI that matches the existing project language while improving clarity and conversion.

## When to Use

- User asks to design or redesign homepage or section components.
- User asks to improve visual style, spacing, hierarchy, or interaction quality.
- User asks to add animations or modernize layout in Next.js components.
- User asks for mobile-first improvements in app routes or shared components.

## Project Anchors

- App Router and locale routes under `app/[locale]/`.
- Homepage sections under `components/home/`.
- Shared layout under `components/layout/`.
- UI primitives under `components/ui/`.
- Global styles in `app/globals.css` and `app/[locale]/globals.css`.
- Motion helpers in `lib/animations.ts`.

## Procedure

1. Inspect existing visual language first.
2. Reuse or extend existing primitives before adding new abstractions.
3. Keep semantic HTML and accessible heading structure.
4. Preserve i18n architecture by keeping copy in message files, not hardcoded in components.
5. Add only purposeful animation and keep reduced-motion friendliness in mind.
6. Validate desktop and mobile layouts before finishing.

## Quality Checks

- Clear visual hierarchy and readable typography.
- Spacing rhythm is consistent across sections.
- No regression in locale routing or translated text keys.
- Component remains composable and does not duplicate existing UI primitives.
- Lint passes for edited files.

## Output Style

- Provide code changes with short rationale.
- Mention file paths edited and the behavior change they introduce.
- If tradeoffs were made, state them explicitly.
