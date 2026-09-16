# Changelog

## v1.0.0 — 2026-09-16

- Created the interactive AI-Native Organization learning map.
- Added 12 learning modules from workflow redesign through organization transformation.
- Added concept and product indexes.
- Added learning journey and 7-question analysis framework.
- Added browser-local learning status.
- Added agent handoff documentation, content governance, deployment guide, and roadmap.

## v1.0.1 — 2026-09-16
- Clarified that the learning-map website must live in a repository separate from `personal-knowledge-management-solution`.
- Added `docs/REPOSITORY_BOUNDARY.md` for future-agent handoff safety.
- Removed Vercel-specific configuration and made deployment provider-neutral.

## v1.0.2 — 2026-09-16
- Deployed the site to GitHub Pages (publish source: `main` branch root); live at https://winstonsl.github.io/ai-native-organization-map/.
- Chose GitHub Pages "deploy from a branch" over a GitHub Actions workflow to keep the setup minimal and vendor-neutral; pushes to `main` now auto-redeploy.
- Added the live URL to `README.md` and recorded the provider, publish source, and re-enable steps in `docs/DEPLOYMENT.md`.
- Verified live site: 12 modules, 6-view navigation, search, P0/P1 filter, localStorage learning status, and concept/product indexes all functioning; no code changes were required (existing code and docs were consistent).

## v1.0.3 — 2026-09-16
- Content: filled in definitions for all remaining concepts in the concept index. Previously 68 of 89 concepts showed only a fallback note; now every concept has a concise definition (concept index fallback count is 0).
- Accessibility: module cards are now keyboard-reachable (`tabindex`, `role="button"`, `aria-label`) and open on Enter/Space; added visible `:focus-visible` outlines for cards, nav, filters, search, and status select; added `aria-label` and `type="search"` to the search box.
- SEO / sharing: added `meta description`, Open Graph and Twitter Card tags, `theme-color`, canonical link, and an inline SVG favicon so the site previews correctly when shared and is indexable.

## v1.0.4 — 2026-09-16
- Started the "deep chapter" content upgrade, beginning with Module 01 (Workflow & Process Redesign) as the template.
- Each deep module now renders: an in-depth intro, expanded key-concept explanations, hands-on tool/product cards (first-class object + how to start + verified official/doc links), a curated reading list, and a suggested learning path.
- Emphasized tools/products as the real learning destination: every tool card carries verified official site and documentation links (all links checked reachable before inclusion).
- Modules without deep content yet degrade gracefully to a short placeholder; the remaining 11 modules will be filled to this template.

## v1.0.5 — 2026-09-16
- Added hash-based deep linking: opening a module sets the URL to `#<module-id>` (e.g. `#workflow`), and views set `#<view-id>`.
- Shared/bookmarked links now open directly to the intended module or view; page refresh preserves position; browser back/forward navigate between visited modules/views.
- Unknown hashes fall back to the overview map. Keyboard (Enter/Space) and click both route through the hash so behavior is consistent.

## v1.0.6 — 2026-09-16
- Knowledge-update system (so the "big book" can be maintained long-term, mainly by future AI agents):
  - Separated content from code: all knowledge moved to `content.js`; `app.js` is now interaction logic only.
  - Added per-module last-updated dates (`moduleUpdated`), shown in each module header, so stale sections are visible.
  - Added `tools/check-links.mjs`: a no-dependency Node script that checks all external links are reachable (run on demand; verified 10/10 links reachable).
  - Added `docs/CONTENT_UPDATE_GUIDE.md`: a step-by-step procedure an AI agent follows to update knowledge safely.
  - Fixed the content editing standard into `AGENTS.md` §9 (deep-module structure, "products must state first-class object + how to start", link-verification discipline, staleness rules, hard limits) so future agents keep one consistent voice and format.
  - Updated `README.md` file list and `docs/CONTENT_GOVERNANCE.md` maintenance rhythm accordingly.

## v1.0.7 — 2026-09-16
- Filled deep-chapter content for all 7 remaining P0 modules (Context & Memory, Agent Architecture, Tool & System Connectivity, Human-Agent Workspace, Governance, Evaluation & AgentOps, Organization Design), following the AGENTS.md §9 template.
- Each now has: in-depth intro, expanded key concepts, hands-on tool cards (first-class object + how to start + verified links), curated reading list, and learning path.
- All external links verified reachable via `tools/check-links.mjs` (39/39 reachable); replaced links that failed verification (Moxt, Google Cloud pages, unstable Microsoft marketing URL) with reachable official/doc alternatives; omitted links that could not be confirmed reachable from this environment rather than guessing.
- The 4 P1 modules (Multi-Agent, Interoperability, AI-native App, AI Workforce) still show the placeholder and will be filled in the next batch.
