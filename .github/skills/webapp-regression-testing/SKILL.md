---
name: webapp-regression-testing
description: 'Run practical regression checks for this Next.js site. Use whenever the user asks to test UI behavior, validate responsive layout, verify locale routes, debug visual regressions, or confirm homepage sections and navigation behavior before release.'
argument-hint: 'What pages, locales, or interactions should be verified?'
---

# Webapp Regression Testing

Verify user-visible behavior for Bahor Voyage with focused functional and visual checks.

## When to Use

- User asks to test recent frontend changes.
- User asks to verify mobile and desktop behavior.
- User asks to confirm locale route integrity.
- User asks for pre-release smoke testing.

## Test Scope

- Locale entry points (for example `/en` and `/fr`).
- Header and footer navigation.
- Home sections rendering order and basic interaction.
- CTA buttons and expected links.
- Responsive behavior for small, medium, and large widths.

## Procedure

1. Start the app with project standard scripts.
2. Open target routes in browser automation or manual browser flow.
3. Validate structure, text visibility, and interactive elements.
4. Check at least one narrow mobile viewport and one desktop viewport.
5. Capture evidence when a failure is found.
6. Report reproducible steps and expected versus actual behavior.

## Quality Checks

- No client-side crash on load.
- No obvious layout overflow or clipped content.
- Navigation works in both locales tested.
- No broken CTA links in edited sections.
- Any regression report includes route, viewport, and exact action sequence.

## Output Format

Use this structure for reports:

1. Scope tested
2. Passed checks
3. Failed checks
4. Reproduction steps
5. Suggested fix direction
