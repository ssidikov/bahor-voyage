# AI Agent Setup for This Project

This project now includes Karpathy-inspired behavioral guidance adapted for multiple coding agents.

## What Was Added

- Shared behavioral principles in root instruction files:
  - `CLAUDE.md`
  - `AGENTS.md`
- Copilot integration:
  - `.github/copilot-instructions.md` (behavior section added)
  - `.github/skills/karpathy-guidelines/SKILL.md`
- Cursor integration:
  - `.cursor/rules/karpathy-guidelines.mdc` (alwaysApply)
- Antigravity integration:
  - `.agent/AGENTS.md`
  - `.agent/rules/karpathy-guidelines.md`
  - `.agent/skills/karpathy-guidelines/SKILL.md`
- Codex integration:
  - `.codex/skills/karpathy-guidelines/SKILL.md`

## Core Principles

1. Think Before Coding
2. Simplicity First
3. Surgical Changes
4. Goal-Driven Execution

## Agent-Specific Notes

### Copilot

- Always-on project constraints are in `.github/copilot-instructions.md`.
- The reusable skill is available at `.github/skills/karpathy-guidelines/SKILL.md`.

### Cursor

- Cursor reads project rules from `.cursor/rules/`.
- `karpathy-guidelines.mdc` is set with `alwaysApply: true`.

### Antigravity

- General behavior lives in `.agent/AGENTS.md` and `.agent/rules/`.
- Reusable skill is available at `.agent/skills/karpathy-guidelines/SKILL.md`.

### Codex

- Root `AGENTS.md` now includes the same behavioral rules.
- Reusable skill is available at `.codex/skills/karpathy-guidelines/SKILL.md`.

## Recommended Usage Pattern

Use this request pattern with any agent for better outcomes:

1. Define objective and constraints clearly.
2. Ask agent to list assumptions before implementation.
3. Ask for a minimal first version.
4. Require explicit verification checks.
5. Expand only after the first version is validated.

## Keep Files In Sync

If you update the four principles, sync these files:

- `CLAUDE.md`
- `AGENTS.md`
- `.cursor/rules/karpathy-guidelines.mdc`
- `.agent/skills/karpathy-guidelines/SKILL.md`
- `.codex/skills/karpathy-guidelines/SKILL.md`
- `.github/skills/karpathy-guidelines/SKILL.md`
