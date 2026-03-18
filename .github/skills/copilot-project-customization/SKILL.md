---
name: copilot-project-customization
description: 'Create and maintain project-scoped Copilot customizations. Use whenever the user asks for skills, prompts, instructions, custom agents, trigger tuning, YAML frontmatter fixes, or troubleshooting why agent custom files are not invoked in this repository.'
argument-hint: 'What customization should be created or fixed?'
---

# Copilot Project Customization

Create reliable, discoverable customization files for this repository.

## When to Use

- User asks to create or update a SKILL.md file.
- User asks to add project instructions or prompt files.
- User asks why a customization is not triggering.
- User asks to improve skill discovery keywords.

## Standard Locations

- Skills: `.github/skills/<name>/SKILL.md`
- Instructions: `.github/instructions/*.instructions.md`
- Prompts: `.github/prompts/*.prompt.md`
- Agents: `.github/agents/*.agent.md`

## Procedure

1. Determine whether the request is better solved by instruction, prompt, agent, or skill.
2. Use workspace scope unless the user explicitly asks for personal scope.
3. Create frontmatter with valid YAML and strong description keywords.
4. Ensure skill folder name exactly matches frontmatter name.
5. Add procedural steps and completion criteria in the body.
6. Validate paths, syntax, and trigger language quality.

## Common Failure Prevention

- Quote descriptions containing colons.
- Avoid vague descriptions that reduce trigger reliability.
- Avoid over-broad always-on patterns when not needed.
- Keep each skill focused on one repeatable workflow.

## Completion Checks

- File is in the expected .github location.
- Frontmatter parses and has required fields.
- Description includes clear Use whenever trigger phrases.
- Body gives actionable, step-by-step instructions.
