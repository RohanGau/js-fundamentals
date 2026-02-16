# Practice Folder

Your dedicated workspace for learning JavaScript fundamentals through hands-on practice.

## Quick Start

### Try the Starter Example (First Time)

```bash
# 1. Start practice mode
npm run practice

# 2. Open practice/starter.ts in your editor
# 3. Modify any function and save
# 4. Watch tests run automatically in your terminal! ✨
```

### Practice a Specific Topic

```bash
# 1. Generate practice files
./practice-topic.sh arrayMap

# 2. Start watching
npm run practice

# 3. Edit, save, see results instantly!
```

---

## Practice Modes

### Guided Mode (Recommended)
Get test hints and implement the solution.

```bash
./practice-topic.sh arrayMap guided
```

**You get:**
- ✅ Empty implementation file
- ✅ Test guidance
- ✅ Reference to original implementation

**Best for:** Learning by implementing

### Blank Mode
Start completely from scratch.

```bash
./practice-topic.sh arrayMap blank
```

**You get:**
- ✅ Blank implementation file
- ✅ Blank test file
- ✅ Complete freedom

**Best for:** Advanced practice

### Study Mode
Copy working code to learn from it.

```bash
./practice-topic.sh arrayMap study
```

**You get:**
- ✅ Full working implementation
- ✅ Complete test suite
- ✅ Ready to modify and experiment

**Best for:** Understanding existing patterns

---

## Workflow

```
┌─────────────────────────────────────────────┐
│  1. Generate Practice Files                 │
│  $ ./practice-topic.sh <topic>              │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  2. Start Practice Mode (keep running)      │
│  $ npm run practice                         │
│                                              │
│  ✓ Watching for changes...                  │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  3. Code & Save                             │
│                                              │
│  • Edit .ts file                            │
│  • Edit .test.ts file                       │
│  • Save (Cmd+S)                             │
│  • Watch tests run automatically!           │
│                                              │
│  ✅ Pass = Success!                         │
│  ❌ Fail = Fix & try again                  │
└─────────────────────────────────────────────┘
```

---

## Files in This Folder

| File | Purpose |
|------|---------|
| `starter.ts` | Example implementations to try |
| `starter.test.ts` | Example tests (all passing) |
| `_template.ts` | Template for creating new topics |
| `_template.test.ts` | Template for creating new tests |
| `TOPICS.md` | List of all available topics |
| `README.md` | This file |

---

## Creating Custom Practice

### Method 1: Use Existing Topics
```bash
./practice-topic.sh promiseAll
```

### Method 2: Create from Template
```bash
cp _template.ts myTopic.ts
cp _template.test.ts myTopic.test.ts
# Edit files and start practicing!
```

### Method 3: Create from Scratch
```typescript
// myTopic.ts
export function myFunction() {
  // Your implementation
}
```

```typescript
// myTopic.test.ts
import { describe, it, expect } from 'vitest';
import { myFunction } from './myTopic';

describe('myFunction', () => {
  it('should work', () => {
    expect(myFunction()).toBeDefined();
  });
});
```

---

## Tips for Effective Practice

### ✅ DO

- **Focus on one topic at a time** - Deep learning beats breadth
- **Write tests first** - Understand the requirement before coding
- **Save frequently** - Tests run automatically
- **Read error messages** - They guide you to the solution
- **Check references when stuck** - Learning, not memorization
- **Experiment and break things** - This is your sandbox!

### ❌ DON'T

- Rush through topics - Take your time
- Copy-paste without understanding
- Skip writing tests - They're crucial for learning
- Get frustrated - Check the reference implementations

---

## Example Session

```bash
# Terminal: Generate practice files for Array.filter
$ ./practice-topic.sh arrayFilter guided

✅ Created GUIDED practice files:
   - practice/arrayFilter_20260213_120000.ts
   - practice/arrayFilter_20260213_120000.test.ts

# Terminal: Start practice mode
$ npm run practice

✓ Watching for file changes...

# Editor: Open arrayFilter_20260213_120000.ts
# Write your implementation...

export function myFilter<T>(
  arr: T[], 
  predicate: (item: T) => boolean
): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

# Save the file (Cmd+S)
# Terminal automatically shows:
✓ All tests passing! 🎉

# Now try edge cases, optimize, or move to next topic!
```

---

## Available Topics

See [TOPICS.md](TOPICS.md) for the complete list with:
- Reference implementations
- Test files
- Difficulty levels
- Learning paths

**Quick list:**
- `arrayMap`, `arrayFilter`, `arrayReduce`
- `classNames`, `flatten`
- `promiseAll`, `promiseAny`
- `debounce`, `throttle`
- `curry`, `deepClone`
- `generators`

---

## Commands Reference

```bash
# Practice mode (auto-run tests)
npm run practice

# Practice mode with UI
npm run practice:ui

# Run all tests once
npm test

# Generate practice files
./practice-topic.sh <topic> [mode]
```

---

## Troubleshooting

**Tests not running?**
- Ensure `npm run practice` is running
- Check that test file ends with `.test.ts`
- Save the file to trigger tests

**Can't find a topic?**
- Run `./practice-topic.sh` to see all available topics
- Check [TOPICS.md](TOPICS.md) for the full list

**Stuck on implementation?**
- Check the reference implementation in `src/` folder
- Look at the test file for expected behavior
- Start with simpler cases first

---

## Learning Path

### Week 1: Foundations
- Day 1-2: `arrayMap`
- Day 3-4: `arrayFilter`
- Day 5-7: `arrayReduce`

### Week 2: Utilities
- Day 1-2: `classNames`
- Day 3-4: `flatten`
- Day 5-7: `deepClone`

### Week 3: Async Patterns
- Day 1-3: `promiseAll`
- Day 4-5: `promiseAny`
- Day 6-7: `debounce`, `throttle`

### Week 4: Advanced
- Day 1-3: `curry`
- Day 4-7: `generators`

---

## Success Metrics

You're making progress when you:
- ✅ Can implement without looking at references
- ✅ Understand why tests fail and how to fix them
- ✅ Write your own test cases
- ✅ Optimize your implementations
- ✅ Explain concepts to others

---

**Happy Learning! Keep practicing, stay curious! 🚀**
