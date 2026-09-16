# Repository Boundary

## This project must stay independent

This repository is the **AI-Native Organization Learning Map** website project.

It is **not** the same project as the user's `personal-knowledge-management-solution` repository.

### Relationship between the two projects

- `personal-knowledge-management-solution`: the user's general personal AI knowledge-management system / migration and knowledge-governance solution.
- `ai-native-organization-map`: a concrete, user-facing learning website for studying how AI enters teams and organizations.

The learning map may conceptually draw on the user's broader knowledge-management thinking, but its code, UI, release history, deployment, and product decisions must remain independent.

## Rules for future agents

1. Do not merge this repository into `personal-knowledge-management-solution`.
2. Do not treat the personal knowledge-management repository as this website's source tree.
3. If information needs to flow between the two projects, use explicit documents, links, exports, or APIs rather than repository merging.
4. Website-specific work belongs here: UI, content map, learning state, deployment, product indexes, release history.
5. General personal knowledge-management architecture belongs in the separate knowledge-management repository.
6. If a future redesign changes the site's technology stack, preserve this repository identity and the learning constraints documented in `AGENTS.md`.

## Recommended repository name

`ai-native-organization-map`

A longer alternative is `ai-native-organization-learning-map`.
