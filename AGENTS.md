# AGENTS.md

> This file is the first document any future AI agent should read before modifying this project.

## 1. Project identity

Project name: **AI-Native Organization Learning Map**

Repository identity: this project MUST live in its own repository (recommended: `ai-native-organization-map`). It must not be merged into `personal-knowledge-management-solution`. See `docs/REPOSITORY_BOUNDARY.md`.

Purpose: a long-lived personal learning operating system for understanding how AI enters teams and organizations, how human-agent work is redesigned, and how organizations may evolve toward AI-native / agentic organizations.

Primary user profile relevant to this project:
- Non-developer / operations background.
- New to many software and agent concepts.
- Learns best through structured maps, comparisons, concrete products, and clickable modules rather than long linear essays.
- The goal is not to become a framework engineer. The goal is to build durable product/organization understanding and enough technical literacy to reason about implementation.

## 2. Core product principle

**Do not turn this site into a long scrolling article.**

The user explicitly finds waterfall-style information delivery difficult to retain. The interface must preserve spatial orientation and progressive disclosure:
- show the whole map first;
- let the user click into one module at a time;
- keep module boundaries visible;
- provide indexes for concepts and products;
- prefer tables, maps, cards, cross-links, filters, and concise summaries;
- avoid forcing the user to remember information from sections far above the viewport.

## 3. Knowledge scope

The long-term subject is:

**AI-Native Organization / Agentic Organization**

The current knowledge architecture is organized around these modules:
1. Workflow & Process Redesign
2. Context & Memory
3. Agent Architecture
4. Tool & System Connectivity
5. Multi-Agent & Orchestration
6. Agent Interoperability
7. Human-Agent Workspace
8. AI-native App / Living Software
9. Governance
10. Evaluation & AgentOps
11. AI Workforce & Agent Management
12. Organization Design & Transformation

The main mental chain is:

`Work -> Context -> Agent -> Coordination -> Workspace -> Governance -> Organization`

## 4. Content rules

When updating knowledge:
- Prefer durable concepts and product patterns over model benchmark news.
- Distinguish **concept / protocol / infrastructure / product / organization practice**.
- For every major module, include:
  - core question;
  - key concepts/patterns;
  - representative tools/products;
  - what the user should actually learn;
  - priority (P0/P1);
  - relation to adjacent modules.
- When adding a new product, answer: **what is its first-class object?** Examples: coworker, task, workflow, app, registry, runtime, memory layer.
- Avoid treating vendor marketing terms as independent categories unless they represent a distinct product abstraction.
- Multi-agent is an implementation pattern, not automatically the end-state product form.
- Agent identity, permissions, evaluation, ownership, and lifecycle are first-class enterprise topics.
- Context/Memory should be treated as organizational context infrastructure, not merely chat history.

## 5. UX rules

Preserve these behaviors unless there is a strong reason to redesign:
- overview map;
- module detail view;
- learning journey;
- concept index;
- product/tool index;
- 7-question analysis framework;
- full-site search/filter;
- local learning status stored in browser localStorage;
- "Ask AI" (问 AI): concept cards and deep key-concepts have a button that opens the user's preferred AI with the question pre-filled and copied to clipboard; the preferred AI is set once and stored in localStorage. Keep this backend-free (no API key, browser just opens the AI site).
- responsive mobile layout.

The site should remain easy to open as a local file. Avoid mandatory servers, build steps, databases, or authentication unless the project intentionally evolves beyond a personal knowledge map.

## 6. Technical rules

Current architecture is intentionally simple:
- static HTML/CSS/JavaScript;
- `content.js` holds all knowledge data (modules / products / concept definitions / per-module update dates); `app.js` holds interaction logic (render / hash routing / search / learning status). Content and logic are separated so future agents can update knowledge by editing only `content.js`;
- `tools/check-links.mjs` is a no-dependency Node script that verifies all external links are reachable (run on demand);
- no backend;
- no framework dependency;
- no build step;
- localStorage only for personal progress state.

Before editing:
1. Read `README.md`.
2. Read `docs/PROJECT_CONTEXT.md`.
3. Read `docs/CONTENT_GOVERNANCE.md`.
4. Inspect current `index.html` before changing structure.

After editing:
1. Open the site locally and verify navigation/search/module switching.
2. Check mobile layout at narrow width.
3. Preserve all existing knowledge unless intentionally superseded.
4. Update `CHANGELOG.md`.
5. Update the version shown in the footer for meaningful releases.

## 7. Change policy

Small content update:
- edit concepts/products/modules in place;
- do not redesign the whole UI.

New module:
- add only when the concept does not fit an existing module;
- update overview, indexes, learning journey, and documentation.

Major redesign:
- preserve information architecture and user learning constraints;
- explain the rationale in `CHANGELOG.md`;
- do not remove the modular browsing model.

## 8. Deployment

Deployment target: static hosting. The hosting provider is intentionally not fixed. A future agent should choose a provider the user can access reliably (for example GitHub Pages, Cloudflare Pages, Netlify, or another suitable static host).

The deployable root is this project directory and the entry file is `index.html`.

See `docs/DEPLOYMENT.md`.

## 9. Content editing standard (for future content updates)

Any agent asked to update, correct, or expand knowledge MUST follow this standard so the site keeps one consistent voice, structure, and quality. The step-by-step procedure is in `docs/CONTENT_UPDATE_GUIDE.md`; this section fixes the non-negotiable standards.

### 9.1 Where content lives
- All knowledge is in `content.js` (data only). Update knowledge by editing `content.js` — do not edit `app.js` to change content.
- `content.js` contains: `modules`, `products`, `conceptDefs`, and `moduleUpdated` (per-module last-updated dates).

### 9.2 Deep module structure (fixed order)
Every deep module (`deep`) uses this order and no other:
1. `intro` — in-depth understanding: why it matters, relation to adjacent modules.
2. `keyConcepts` — expanded key concepts: `[[name, explanation], ...]`, concrete and with scenarios.
3. `tools` — hands-on tools/products: each `{name, object, links, learn}`.
4. `links` — curated reading list: `[[title, url, why]]`, reading material (articles/guides/videos).
5. `path` — suggested learning path: ordered steps from "read this first" to "now try this".

### 9.3 Products must answer
For every product/tool, always state:
- **First-class object** (`object`): what is its primary abstraction — workflow, task, workspace, runtime, memory layer, coworker, registry, etc.
- **How to start** (`learn`): what to actually do / what to learn from it.

This is the site's core value: concepts must land on concrete tools. Do not list a product with only a one-line tag.

### 9.4 Link discipline
- Every URL MUST be verified reachable (HTTP 200 / valid redirect) before it is written in. **Never invent URLs from memory.**
- Separate reading material (`deep.links`) from tool official/doc links (`deep.tools[].links`).
- Run `node tools/check-links.mjs` after edits; fix or replace any dead links.

### 9.5 Writing voice
- Chinese; concise and concrete; conclusion/example first, then expand.
- Avoid long academic definitions before a concrete example; don't cram too many new terms into one screen.
- Prefer tables, cards, short explanations over walls of text.

### 9.6 Staleness management
- After a substantive change to a module, set that module's date in `moduleUpdated` to the edit date (`YYYY-MM-DD`); it shows in the module header.
- Record the change in `CHANGELOG.md` and bump the version (footer in `index.html` + "Current release" in `README.md`).

### 9.7 Hard limits (do not break)
- Stay static: no build step, no backend, no database, no framework.
- Keep modular browsing (overview → module → deep chapter); never turn it into one long scrolling article.
- Keep hash deep links (`#module-id`) working.
- Do not merge this repo into `personal-knowledge-management-solution` (see `docs/REPOSITORY_BOUNDARY.md`).
