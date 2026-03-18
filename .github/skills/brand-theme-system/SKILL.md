---
name: brand-theme-system
description: 'Define and apply a coherent visual theme system for this website. Use whenever the user asks for color system updates, typography direction, design tokens, CSS variable cleanup, style consistency, or brand-level visual refinement across sections.'
argument-hint: 'What visual direction or brand change should be applied?'
---

# Brand Theme System

Translate visual direction into reusable styling decisions across the codebase.

## When to Use

- User asks to refresh look and feel.
- User asks for consistent colors, typography, or spacing.
- User asks to standardize section-level styling into shared tokens.

## Project Anchors

- Global theme layers in `app/globals.css` and `app/[locale]/globals.css`.
- Reusable UI tokens and patterns in `components/ui/`.
- Marketing sections in `components/home/`.

## Procedure

1. Audit current color, typography, spacing, and surface patterns.
2. Define a small token set first, then map components to tokens.
3. Use CSS variables for theme primitives to avoid one-off styling drift.
4. Apply changes incrementally to high-visibility sections first.
5. Verify readability, contrast, and interaction states.
6. Keep motion and decorative styling intentional rather than excessive.

## Quality Checks

- Theme decisions are visible in at least one shared primitive.
- Color and typography choices remain readable on mobile and desktop.
- Styling changes do not break locale layouts.
- New tokens reduce duplication compared with prior styles.

## Deliverable Expectations

- Summarize what changed in tokens versus component usage.
- Call out migration follow-ups for untouched sections.
