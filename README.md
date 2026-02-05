# JavaScript Fundamentals (TypeScript Edition)

A **MAANG-grade** JS/TS fundamentals kit: idiomatic implementations of core concepts, polyfills, and interview-ready snippets with tests you can run locally or in CI.

## What’s inside

- Polyfills with spec-accurate behavior: `Array.prototype` helpers, `Promise.all`, `Promise.any`, `flatten`, `classNames`.
- Core patterns: `debounce`, `throttle`, `curry`, `deepClone`, generator patterns.
- All code is TypeScript-first, ESM, and ship-ready via `dist/`.
- Vitest test suite for quick validation.

## Quickstart

```bash
npm install
npm run test         # run unit tests
npm run check        # type-check only
npm run build        # emit JS + d.ts to dist/
```

### Browser playground
- Build once: `npm run build`
- Serve the repo root (any static server). Easiest: `python3 -m http.server 4173`
- Open http://localhost:4173/playground and pick a module from the dropdown to run its demo in the browser.

## Project layout

- `src/polyfills/*` – spec-inspired polyfills with typings.
- `src/core/*` – core concepts and interview-friendly utilities.
- `src/__tests__/*` – vitest specs covering the surface area.
- `dist/` – build output (generated).

## How to study

1) Open the implementation, then the matching test to see expected behavior.
2) Modify or extend, run `npm test` to validate.
3) Use `npm run check` to keep types tight.

## Contribution welcome

PRs for new concepts, performance tweaks, or additional edge-case tests are encouraged.
