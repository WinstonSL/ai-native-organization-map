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
