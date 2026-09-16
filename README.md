# AI-Native Organization Learning Map

A personal, evolving learning operating system for understanding how AI enters real teams and organizations.

## What this is

This is not a one-time article. It is a living map covering:
- AI-native workflow redesign
- context and memory infrastructure
- agent architecture and harnesses
- MCP and system connectivity
- multi-agent orchestration
- agent-to-agent interoperability
- human-agent workspaces
- agentic apps / living software
- governance
- evaluation and AgentOps
- AI workforce management
- organization design and transformation

## Why the interface is modular

The user is learning many unfamiliar concepts at once and finds long waterfall-style explanations hard to retain. The site therefore prioritizes:
- overview before detail;
- clickable module switching;
- concept/product indexes;
- progressive disclosure;
- a persistent mental model.

## Live site

Deployed on GitHub Pages: **https://winstonsl.github.io/ai-native-organization-map/**

The site is published from the `main` branch (root). Any push to `main` automatically redeploys the live site. See `docs/DEPLOYMENT.md`.

## Start here

For a human reader: open the live site above, or open `index.html` locally.

For an AI agent that will modify the project: **read `AGENTS.md` first**.

## Project files

- `index.html` — page structure
- `styles.css` — visual system and responsive layout
- `content.js` — all knowledge content (modules / products / concept definitions / per-module update dates)
- `app.js` — interaction logic (render, hash routing, search, learning status)
- `tools/check-links.mjs` — on-demand external-link health check (Node 18+, no dependencies)
- `AGENTS.md` — operating manual and constraints for future AI agents (incl. the content editing standard)
- `docs/PROJECT_CONTEXT.md` — background, user intent, and design rationale
- `docs/CONTENT_GOVERNANCE.md` — how to evolve the knowledge safely
- `docs/CONTENT_UPDATE_GUIDE.md` — step-by-step procedure for an AI agent updating the knowledge
- `docs/DEPLOYMENT.md` — hosting and update workflow
- `docs/REPOSITORY_BOUNDARY.md` — hard boundary between this website and the separate personal knowledge-management project
- `ROADMAP.md` — future improvements
- `CHANGELOG.md` — release history

## Design philosophy

The project tracks product forms and organizational patterns rather than chasing every new foundation model release.

A recurring analysis lens is:

1. Work — what work is being done?
2. Context — what does the system need to know?
3. Agent — who/what performs the work?
4. Coordination — how do multiple actors collaborate?
5. Workspace — where is shared work represented?
6. Governance — who owns and controls the agents?
7. Organization — how do roles and operating models change?

## Current release

v1.0.7 — 2026-09-16

## Repository boundary

This website lives in its own repository: `ai-native-organization-map`. Do not place it inside `personal-knowledge-management-solution`; they are separate long-lived projects with different purposes.
