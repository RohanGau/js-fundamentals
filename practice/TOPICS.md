# 📚 Available Topics to Practice

All topics below already have implementations in `src/` folder that you can reference!

## 🔧 Polyfills

### Array Methods
- **arrayMap** - Implement `Array.prototype.map` from scratch
  - Reference: `src/polyfills/arrayMap.ts`
  - Tests: `src/__tests__/arrayPolyfills.test.ts`
  - Practice: `./practice-topic.sh arrayMap`

- **arrayFilter** - Implement `Array.prototype.filter` from scratch
  - Reference: `src/polyfills/arrayFilter.ts`
  - Tests: `src/__tests__/arrayPolyfills.test.ts`
  - Practice: `./practice-topic.sh arrayFilter`

- **arrayReduce** - Implement `Array.prototype.reduce` from scratch
  - Reference: `src/polyfills/arrayReduce.ts`
  - Tests: `src/__tests__/arrayPolyfills.test.ts`
  - Practice: `./practice-topic.sh arrayReduce`

### Utility Functions
- **classNames** - Build a utility to merge CSS class names
  - Reference: `src/polyfills/classNames.ts`
  - Tests: `src/__tests__/classNames.test.ts`
  - Practice: `./practice-topic.sh classNames`

- **flatten** - Flatten nested arrays to any depth
  - Reference: `src/polyfills/flatten.ts`
  - Tests: `src/__tests__/flatten.test.ts`
  - Practice: `./practice-topic.sh flatten`

### Promise Methods
- **promiseAll** - Implement `Promise.all` from scratch
  - Reference: `src/polyfills/promiseAll.ts`
  - Tests: `src/__tests__/promisePolyfills.test.ts`
  - Practice: `./practice-topic.sh promiseAll`

- **promiseAny** - Implement `Promise.any` from scratch
  - Reference: `src/polyfills/promiseAny.ts`
  - Tests: `src/__tests__/promisePolyfills.test.ts`
  - Practice: `./practice-topic.sh promiseAny`

## ⚡ Core Concepts

### Performance Optimization
- **debounce** - Delay function execution until after a pause
  - Reference: `src/core/debounce.ts`
  - Practice: `./practice-topic.sh debounce`

- **throttle** - Limit function execution rate
  - Reference: `src/core/throttle.ts`
  - Practice: `./practice-topic.sh throttle`

### Functional Programming
- **curry** - Transform multi-arg functions to curried form
  - Reference: `src/core/curry.ts`
  - Practice: `./practice-topic.sh curry`

- **deepClone** - Deep clone objects and arrays
  - Reference: `src/core/deepClone.ts`
  - Practice: `./practice-topic.sh deepClone`

### Advanced Patterns
- **generators** - Generator functions and iteration patterns
  - Reference: `src/core/generatorExamples.ts`
  - Practice: `./practice-topic.sh generators`

---

## 🎯 How to Practice These Topics

### Method 1: Guided Practice (Recommended)
Start with tests, implement to make them pass:
```bash
./practice-topic.sh arrayMap guided
npm run practice
# Implement until tests pass!
```

### Method 2: Blank Canvas
Start completely from scratch:
```bash
./practice-topic.sh arrayMap blank
npm run practice
# Write tests AND implementation!
```

### Method 3: Study Mode
Copy existing code to study and modify:
```bash
./practice-topic.sh arrayMap study
npm run practice
# Experiment with the working code!
```

---

## 📖 Practice Modes Explained

| Mode | What You Get | Best For |
|------|--------------|----------|
| **guided** | Empty implementation + test hints | Learning by implementing |
| **blank** | Completely empty files | Advanced practice |
| **study** | Full implementation + tests | Understanding existing code |

---

## 💡 Suggested Learning Path

### Week 1: Array Fundamentals
1. `arrayMap` - Start here!
2. `arrayFilter` - Build on map knowledge
3. `arrayReduce` - Most powerful array method

### Week 2: Utility Functions
4. `classNames` - String/object manipulation
5. `flatten` - Recursion practice
6. `deepClone` - Object traversal

### Week 3: Async Patterns
7. `promiseAll` - Promise coordination
8. `promiseAny` - Race conditions
9. `debounce` - Timing control
10. `throttle` - Rate limiting

### Week 4: Advanced Concepts
11. `curry` - Function composition
12. `generators` - Lazy iteration

---

## 🚀 Quick Start

Pick any topic and run:
```bash
./practice-topic.sh <topic-name>
npm run practice
```

Example:
```bash
# Practice implementing Array.map
./practice-topic.sh arrayMap

# Start watching
npm run practice

# Code and save - tests run automatically!
```

---

## 📝 Notes

- All reference implementations are production-ready
- Tests cover edge cases and spec compliance
- Compare your solution with the reference
- Don't be afraid to peek at references when stuck!
- The goal is learning, not perfection

Happy Learning! 🎉
