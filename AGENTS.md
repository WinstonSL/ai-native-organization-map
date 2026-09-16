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
- responsive mobile layout.

The site should remain easy to open as a local file. Avoid mandatory servers, build steps, databases, or authentication unless the project intentionally evolves beyond a personal knowledge map.

## 6. Technical rules

Current architecture is intentionally simple:
- static HTML/CSS/JavaScript;
- `app.js` currently contains the module/product/concept knowledge data as well as interaction logic;
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
