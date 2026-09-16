# Content Governance

This document defines how the learning map should evolve as AI products change quickly.

## 1. Content hierarchy

Use this hierarchy to avoid concept sprawl:

**Domain -> Module -> Pattern/Concept -> Product/Tool -> Example**

Do not create a new module merely because a vendor invents a new marketing phrase.

## 2. What deserves inclusion

Prefer items that satisfy at least one:
- define a durable architectural pattern;
- represent an important open protocol;
- create a new product abstraction;
- materially affect how enterprises deploy/govern agents;
- are strong representative products for learning a module;
- show a meaningful organizational operating model.

Avoid:
- model-release churn with no product/organization implication;
- speculative hype with no usable implementation pattern;
- many near-duplicate products that add no new learning value.

## 3. Evidence discipline

For time-sensitive product claims, future agents should verify current vendor documentation before updating the map.

When a product changes substantially:
- update its description;
- note if the old pattern is deprecated;
- preserve historical context in `CHANGELOG.md` if the change affects the mental model.

## 4. Learning priority

P0 = foundational or directly important to AI entering organizations.
P1 = important after the P0 mental model is stable.

Do not promote something to P0 only because it is fashionable.

## 5. Product taxonomy

When classifying a product, identify its primary abstraction:
- workflow engine
- memory/context layer
- harness/runtime
- tool connectivity layer
- multi-agent orchestrator
- interoperability protocol
- agent-native workspace
- agentic app builder
- governance/control plane
- observability/evaluation layer
- AI workforce manager
- organizational operating model

A product may span several modules, but it should still have a primary learning value.

## 6. Writing style

The user prefers concise but concrete explanations.

Good:
- short definition;
- simple diagram;
- one realistic example;
- product/tool references;
- what to learn vs what not to learn.

Avoid:
- long academic definitions before a concrete example;
- too many new terms in one screen;
- claiming technologies are fundamentally different when they are mostly different product packaging.

## 7. Release rhythm

Recommended maintenance rhythm:
- minor update when a major new product/pattern appears;
- quarterly review of product/tool examples;
- larger architecture review only when the mental model itself needs changing.
