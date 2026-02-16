# JavaScript Fundamentals

Production-grade implementations of core JavaScript concepts, polyfills, and interview-ready patterns -- all in TypeScript with tests.

## Setup

```bash
npm install
```

## Usage

### Write code, test it

```bash
npm test              # run all tests once
npm run test:watch    # re-run tests on every file save
```

### Run in browser

```bash
npm run serve         # builds + opens playground at http://localhost:3000
```

Or manually:

```bash
npm run build
npx http-server -p 3000
# open http://localhost:3000/playground/index.html
```

### Other commands

```bash
npm run check         # type-check only (no build output)
npm run build         # compile TypeScript to dist/
npm run clean         # remove dist/
```

## Project Structure

```
src/
├── polyfills/        # Array, Promise, utility polyfills
│   ├── arrayMap.ts
│   ├── arrayFilter.ts
│   ├── arrayReduce.ts
│   ├── promiseAll.ts
│   ├── promiseAny.ts
│   ├── classNames.ts
│   └── flatten.ts
├── core/             # Core JS patterns
│   ├── debounce.ts
│   ├── throttle.ts
│   ├── curry.ts
│   ├── deepClone.ts
│   ├── dataMerge.ts
│   ├── generatorExamples.ts
│   └── promiseAllDemo.ts
├── __tests__/        # Vitest test suites
│   ├── arrayPolyfills.test.ts
│   ├── promisePolyfills.test.ts
│   ├── classNames.test.ts
│   └── flatten.test.ts
└── index.ts          # barrel export

playground/
└── index.html        # browser demo (uses dist/)
```

## How to Add a New Topic

1. Create your implementation:

```bash
# For a polyfill
touch src/polyfills/myTopic.ts

# For a core concept
touch src/core/myTopic.ts
```

2. Write your test:

```bash
touch src/__tests__/myTopic.test.ts
```

3. Run tests:

```bash
npm run test:watch
# edit & save files -- tests re-run automatically
```

That's it. Write code, test it, move on.

## What's Covered

| Category | Topics |
|----------|--------|
| **Array Polyfills** | `map`, `filter`, `reduce` |
| **Promise Polyfills** | `Promise.all`, `Promise.any` |
| **Utilities** | `classNames`, `flatten` |
| **Core Patterns** | `debounce`, `throttle`, `curry`, `deepClone` |
| **Advanced** | generators, data merge |

## Tech

- TypeScript (strict mode)
- ESM modules
- Vitest for testing
- No framework dependencies

## License

ISC
