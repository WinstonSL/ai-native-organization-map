# Deployment Guide

## Current status

The project is deployment-ready as a static website, but **no hosting provider is fixed**.

The user may hand this repository to a future coding agent and ask it to deploy the site on any static hosting platform the user can access reliably.

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

## Updating the live site later

Preferred workflow:

`edit -> local verification -> commit -> push -> automatic/static redeploy`

Keep hosting configuration thin. The repository, not the hosting vendor, is the source of truth.

## If changing hosting provider

The site should remain portable because it is plain HTML/CSS/JavaScript. Remove obsolete provider-specific files when migrating and update this document and `CHANGELOG.md`.
