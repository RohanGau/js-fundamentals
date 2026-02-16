# JavaScript Fundamentals

A comprehensive collection of JavaScript/TypeScript fundamentals with polyfills, core concepts, and a streamlined practice workflow for learning.

## Features

- ✅ **Production-ready implementations** of Array, Promise polyfills and utilities
- ✅ **Core patterns**: debounce, throttle, curry, deep clone, generators
- ✅ **Comprehensive test coverage** with Vitest
- ✅ **Practice workflow** for hands-on learning with instant feedback
- ✅ **TypeScript-first** with full type safety
- ✅ **Browser playground** for interactive demos

---

## Quick Start

### Installation
```bash
npm install
```

### Practice Mode (Recommended for Learning)
The fastest way to learn - write code and see results instantly!

```bash
# Start practice mode (auto-runs tests on save)
npm run practice

# Try the starter examples
# Edit practice/starter.ts and save to see tests run!
```

**Learn a specific topic:**
```bash
# Practice implementing Array.map
./practice-topic.sh arrayMap

# Then start watching
npm run practice
```

See the [Practice Guide](practice/README.md) for full workflow.

---

## Available Topics

### Polyfills
- **Array Methods**: `arrayMap`, `arrayFilter`, `arrayReduce`
- **Promise Methods**: `promiseAll`, `promiseAny`
- **Utilities**: `classNames`, `flatten`

### Core Concepts
- **Performance**: `debounce`, `throttle`
- **Functional**: `curry`, `deepClone`
- **Advanced**: `generators`

See [practice/TOPICS.md](practice/TOPICS.md) for detailed topic list with references.

---

## Project Structure

```
js-fundamentals/
├── src/
│   ├── polyfills/          # Array, Promise polyfills
│   ├── core/               # Core patterns and utilities
│   └── __tests__/          # Test suites
├── practice/               # 👈 Your practice workspace
│   ├── starter.ts          # Example implementations
│   ├── starter.test.ts     # Example tests
│   ├── _template.ts        # Template for new topics
│   ├── README.md           # Practice workflow guide
│   └── TOPICS.md           # All available topics
├── playground/             # Browser demo
│   └── index.html
├── practice-topic.sh       # Generate practice files from topics
└── dist/                   # Build output
```

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run practice` | **Practice mode** - Auto-run tests on save |
| `npm test` | Run all tests once |
| `npm run test:watch` | Run all tests in watch mode |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run check` | Type-check without building |
| `./practice-topic.sh <topic>` | Create practice files from existing topics |

---

## Practice Workflow

### 1. Pick a Topic
```bash
# See available topics
./practice-topic.sh

# Practice Array.map (guided mode)
./practice-topic.sh arrayMap
```

### 2. Start Practice Mode
```bash
npm run practice
```

### 3. Code & Learn
- Edit the generated practice files
- Save your changes
- Tests run automatically
- Fix issues and save again
- Repeat until all tests pass! ✅

**Modes:**
- `guided` (default) - Get test hints, implement solution
- `blank` - Start from scratch
- `study` - Copy working code to study

---

## Browser Playground

Try implementations in your browser:

```bash
# Build the project
npm run build

# Start a local server
python3 -m http.server 8000
# OR
npx http-server -p 8000

# Open browser
open http://localhost:8000/playground/index.html
```

Select a module from the dropdown and click "Run Demo" to see it in action!

---

## Learning Path

**Beginner:**
1. `arrayMap` - Start here!
2. `arrayFilter` - Build on map knowledge  
3. `classNames` - String manipulation

**Intermediate:**
4. `arrayReduce` - Most powerful array method
5. `flatten` - Recursion practice
6. `debounce` / `throttle` - Timing control

**Advanced:**
7. `promiseAll` / `promiseAny` - Async patterns
8. `curry` - Function composition
9. `deepClone` - Object traversal
10. `generators` - Lazy iteration

---

## How to Study

### Option 1: Practice Implementation
Use practice mode to implement concepts from scratch with test guidance.

### Option 2: Read & Modify
Explore implementations in `src/` folder and modify them to learn.

### Option 3: Browser Testing
Build the project and use the playground to see code in action.

---

## Examples

### Practice Array.map
```bash
./practice-topic.sh arrayMap guided
npm run practice
# Implement in the generated file, save, watch tests run!
```

### Study Existing Implementation
```bash
./practice-topic.sh promiseAll study
# Opens working implementation + tests for you to explore
```

### Create Custom Practice
```bash
# Copy template
cp practice/_template.ts practice/myTopic.ts
cp practice/_template.test.ts practice/myTopic.test.ts

# Start watching
npm run practice
```

---

## Contributing

PRs welcome for:
- New implementations or concepts
- Performance improvements
- Additional test cases
- Documentation improvements

---

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Vitest** - Fast unit testing
- **ESM** - Modern module system
- **Node.js** - Runtime

---

## License

ISC

---

## Links

- [Practice Guide](practice/README.md) - Detailed practice workflow
- [Available Topics](practice/TOPICS.md) - All topics with references
- [Repository](https://github.com/RohanGau/js-fundamentals)

---

**Happy Learning! 🚀**
