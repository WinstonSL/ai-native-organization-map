# Deployment Guide

## Current status

**Live.** The site is deployed on **GitHub Pages**.

- Live URL: **https://winstonsl.github.io/ai-native-organization-map/**
- Provider: GitHub Pages
- Source: `Deploy from a branch` → branch `main`, folder `/ (root)`
- Build step: none (GitHub Pages serves the static files directly)

Because the publishing source is the `main` branch root, **any push to `main` automatically redeploys the live site** within a minute or two. The repository is the source of truth; there is no separate hosting config to maintain.

GitHub Pages was chosen because the code already lives on GitHub, it is free, requires no build pipeline or vendor lock-in, and a future agent can understand and maintain it with no extra tooling. No GitHub Actions workflow is used — the built-in "deploy from a branch" mode is sufficient for a plain static site and keeps the setup minimal.

## How to enable Pages again (if ever reset)

1. Open `https://github.com/WinstonSL/ai-native-organization-map/settings/pages`.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. Wait 1–2 minutes; the live URL appears at the top of the same page.

## For a different provider

The user may instead hand this repository to a future coding agent and ask it to deploy on any static hosting platform they can access reliably.

## Deployment contract

- Entry file: `index.html`
- Build step: none
- Backend: none
- Required environment variables: none
- Static assets: `styles.css`, `app.js`
- Browser storage: localStorage for learning progress

Any host capable of serving static files is sufficient.

## Suitable deployment options

A future agent may evaluate, among others:

- GitHub Pages
- Cloudflare Pages
- Netlify
- another accessible static host
- self-hosted static web server

Do **not** assume Vercel is available to the user.

## Recommended deployment workflow

1. Read `AGENTS.md` and `docs/REPOSITORY_BOUNDARY.md` first.
2. Confirm the repository is the dedicated website repository, not `personal-knowledge-management-solution`.
3. Verify `index.html` works locally.
4. Pick a static host the user can log into and maintain.
5. Connect deployment to the repository's default branch so that pushes trigger site updates where supported.
6. Record the live URL and provider in this file after deployment.
7. Add provider-specific configuration only after the provider is chosen.

(Steps above are the general contract. This project has already completed them on GitHub Pages — see "Current status".)

## Updating the live site later

Preferred workflow:

`edit -> local verification -> commit -> push -> automatic/static redeploy`

Keep hosting configuration thin. The repository, not the hosting vendor, is the source of truth.

## If changing hosting provider

The site should remain portable because it is plain HTML/CSS/JavaScript. Remove obsolete provider-specific files when migrating and update this document and `CHANGELOG.md`.
