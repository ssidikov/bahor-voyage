# Project Guidelines

## Code Style

- Use TypeScript with strict typing and avoid `any`.
- Keep imports tidy and prefer type-only imports where possible.
- Follow existing formatting and lint rules:
  - `npm run lint`
  - `npm run format:check`
- Use existing UI primitives from `components/ui` before adding new base components.

## Architecture

- This is a Next.js App Router project with locale routing under `app/[locale]`.
- Keep page composition in route files and section-level UI in `components/home`.
- Keep layout/navigation components in `components/layout`.
- Reuse shared animation variants from `lib/animations.ts` for consistent motion.
- Internationalization is powered by `next-intl`:
  - Routing config: `i18n/routing.ts`
  - Navigation wrappers: `i18n/navigation.ts`
  - Request config/messages loading: `i18n/request.ts`

## Build and Validate

- Install dependencies: `npm install`
- Local development: `npm run dev`
- Production build: `npm run build`
- Start production server: `npm run start`
- Lint: `npm run lint`
- Auto-fix lint issues: `npm run lint:fix`
- Format: `npm run format`
- Format check: `npm run format:check`
- No dedicated test suite is currently configured; rely on lint, build, and manual route checks.

## Conventions

- Locale behavior is URL-driven (`localeDetection: false`): do not add browser-language auto-redirects unless explicitly requested.
- Default locale is French with `localePrefix: 'as-needed'`:
  - French default routes omit `/fr`
  - English routes use `/en`
- Prefer server components by default; add `'use client'` only when interactivity/browser APIs are needed.
- For metadata and SEO, follow the localized metadata pattern used in `app/[locale]/layout.tsx` and `app/[locale]/page.tsx`.
- Treat `DESIGN.md` as the source of truth for visual tokens and rationale; keep UI styling changes aligned with it and validate with `npm run design:lint`.

## Common Pitfalls

- On Windows Git Bash, Husky hooks can fail when using `npx`; keep the direct Node invocation style used in `.husky/pre-commit`.
- Avoid duplicating animation definitions in feature components; use `lib/animations.ts` to prevent drift.

## Behavioral Operating Mode (Karpathy-Inspired)

These are behavior rules for AI coding agents in this repository.

### 1. Think Before Coding

- State assumptions explicitly before implementation.
- If the request is ambiguous, present interpretations instead of choosing silently.
- Prefer the simplest viable approach and call out tradeoffs.
- If requirements are unclear, ask for clarification before coding.

### 2. Simplicity First

- Implement only what was requested.
- Avoid speculative abstractions and optional flexibility unless requested.
- Avoid defensive complexity for impossible scenarios.
- If a solution can be dramatically smaller, rewrite it smaller.

### 3. Surgical Changes

- Touch only code directly related to the task.
- Do not perform drive-by refactors or style rewrites.
- Match existing style and local conventions.
- Clean up only artifacts introduced by your own changes.

### 4. Goal-Driven Execution

- Convert vague tasks into verifiable goals and checks.
- Prefer test-first or repro-first for bug fixes.
- For multi-step work, define a short plan with explicit verification per step.

Success signal: minimal diffs, fewer overengineered rewrites, and clarifying questions before implementation.
