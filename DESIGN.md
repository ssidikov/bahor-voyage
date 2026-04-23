---
version: alpha
name: Bahor Voyage
description: Premium editorial travel brand for the Bahor Voyage website.
colors:
  primary: '#2F6E73'
  primary-hover: '#225254'
  primary-soft: '#F0FAFA'
  sand: '#FDFBF7'
  charcoal: '#2C2C2C'
  gold: '#C8A96E'
  on-action: '#FFFFFF'
typography:
  display-xl:
    fontFamily: 'Cormorant Garamond'
    fontSize: 3.5rem
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.02em
  heading-lg:
    fontFamily: 'Cormorant Garamond'
    fontSize: 2.5rem
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.015em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: 0.005em
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.08em
rounded:
  sm: 8px
  md: 12px
  pill: 9999px
spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-action}'
    typography: '{typography.label-md}'
    rounded: '{rounded.pill}'
    padding: '{spacing.sm}'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.on-action}'
  button-secondary:
    backgroundColor: '{colors.primary-soft}'
    textColor: '{colors.primary-hover}'
    typography: '{typography.label-md}'
    rounded: '{rounded.pill}'
    padding: '{spacing.sm}'
  card-default:
    backgroundColor: '{colors.sand}'
    textColor: '{colors.charcoal}'
    rounded: '{rounded.md}'
    padding: '{spacing.lg}'
  badge-primary:
    backgroundColor: '{colors.primary-soft}'
    textColor: '{colors.primary-hover}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.pill}'
    padding: '{spacing.xs}'
  divider-accent:
    backgroundColor: '{colors.gold}'
    textColor: '{colors.charcoal}'
    rounded: '{rounded.sm}'
    padding: '{spacing.xs}'
---

## Overview

Bahor Voyage blends an editorial travel aesthetic with premium warmth. The interface should feel calm, trustworthy, and curated, with expressive serif headlines over quiet, readable layouts.

## Colors

The palette uses Bahor teal for actions, warm sand for surfaces, deep charcoal for text hierarchy, and restrained gold accents for premium cues.

- Primary teal drives buttons and links.
- Sand backgrounds keep sections soft and approachable.
- Charcoal provides high-clarity body and heading contrast.
- Gold is decorative only and should not become the main call-to-action color.

## Typography

Typography balances classic storytelling with modern clarity.

- Cormorant Garamond is used for display and section headings.
- Inter is used for paragraph and UI utility text.
- Labels favor tighter tracking and medium weight for controls and metadata.

## Layout

Layouts should prioritize generous whitespace, readable line lengths, and section rhythm over dense content packing.

- Use a clear reading flow from hero to social proof to conversion points.
- Keep content blocks visually distinct through spacing before adding heavy borders.

## Elevation & Depth

Depth is subtle and intentional.

- Cards may use soft shadows to separate content from sand surfaces.
- Hover lift is minimal and should preserve a calm tone.

## Shapes

Rounded corners communicate approachability while keeping a polished profile.

- Pill radii are reserved for interactive controls such as buttons and badges.
- Medium rounding is preferred for cards and content containers.

## Components

Component tokens in front matter are normative for shared primitives.

- button-primary and button-secondary align with reusable button variants.
- card-default aligns with shared card surfaces.
- badge-primary aligns with category and status labels.

## Do's and Don'ts

- Do prefer token references over hard-coded ad hoc values.
- Do keep interaction states high-contrast and accessible.
- Do maintain visual consistency between locale routes.
- Don't introduce a new accent color without adding token rationale.
- Don't mix unrelated serif or sans families outside the typography tokens.
