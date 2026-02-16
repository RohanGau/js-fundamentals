# Contributing

Thank you for your interest in contributing to JS Fundamentals! This guide will help you add new topics, improve existing implementations, or enhance the practice workflow.

## How to Contribute

### 1. Adding a New Topic

#### Step 1: Implement the Feature

Create your implementation in the appropriate folder:

**For polyfills:**
```bash
# Create implementation
touch src/polyfills/yourTopic.ts
```

**For core concepts:**
```bash
# Create implementation
touch src/core/yourTopic.ts
```

#### Step 2: Write Tests

Add tests in `src/__tests__/`:

```typescript
// src/__tests__/yourTopic.test.ts
import { describe, it, expect } from 'vitest';
import { yourFunction } from '../polyfills/yourTopic';

describe('yourTopic', () => {
  it('should work correctly', () => {
    expect(yourFunction()).toBeDefined();
  });
  
  // Add edge cases
  it('should handle edge cases', () => {
    // Your tests
  });
});
```

#### Step 3: Update the Practice Topic Script

Add your topic to `practice-topic.sh`:

```bash
# In the POLYFILLS array (if it's a polyfill)
["yourTopic"]="src/polyfills/yourTopic.ts|src/__tests__/yourTopic.test.ts"

# OR in the CORE array (if it's a core concept)
["yourTopic"]="src/core/yourTopic.ts"
```

#### Step 4: Document It

Add your topic to `practice/TOPICS.md`:

```markdown
- **yourTopic** - Brief description
  - Reference: `src/polyfills/yourTopic.ts`
  - Tests: `src/__tests__/yourTopic.test.ts`
  - Practice: `./practice-topic.sh yourTopic`
```

#### Step 5: Add to Playground (Optional)

If you want it in the browser playground, update `playground/index.html`:

```html
<option value="yourTopic">yourTopic</option>
```

And add the demo:

```javascript
yourTopic: async () => {
  const { yourFunction } = await import("../dist/polyfills/yourTopic.js");
  return { result: yourFunction() };
}
```

### 2. Improving Existing Implementations

- Fork the repository
- Make your changes
- Add tests if needed
- Submit a pull request with:
  - Clear description of changes
  - Why the change is needed
  - Test results

### 3. Enhancing Documentation

- Fix typos or unclear explanations
- Add examples
- Improve practice guides
- Add diagrams or visuals

### 4. Improving the Practice Workflow

- Add new practice modes
- Improve the scripts
- Add better error messages
- Create templates

## Code Guidelines

### TypeScript

- Use TypeScript for all implementations
- Include proper type definitions
- Avoid `any` types unless absolutely necessary

### Testing

- Write comprehensive tests
- Cover edge cases
- Include error cases
- Use descriptive test names

### Style

- Follow existing code style
- Use clear, descriptive variable names
- Add comments for complex logic
- Keep functions focused and small

### Commits

Use clear commit messages:

```bash
# Good
git commit -m "Add Array.flat polyfill with depth support"
git commit -m "Fix edge case in promiseAll when empty array"

# Bad
git commit -m "update"
git commit -m "fix bug"
```

## Testing Your Changes

Before submitting:

```bash
# 1. Run all tests
npm test

# 2. Type check
npm run check

# 3. Build successfully
npm run build

# 4. Try practice mode
npm run practice
```

## Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to your branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### PR Checklist

- [ ] Tests pass (`npm test`)
- [ ] TypeScript compiles (`npm run check`)
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] Practice script updated (if adding new topic)
- [ ] No linting errors

## Ideas for Contributions

### New Topics to Add

**Polyfills:**
- Array methods: `find`, `findIndex`, `some`, `every`
- Promise methods: `race`, `allSettled`
- Object methods: `assign`, `entries`, `keys`, `values`
- String methods: `trim`, `padStart`, `padEnd`

**Core Concepts:**
- `memoize` - Function memoization
- `compose` / `pipe` - Function composition
- `eventEmitter` - Event system
- `retry` - Retry with backoff
- `promiseQueue` - Queue async operations

**Utility Functions:**
- `groupBy` - Group array items
- `chunk` - Split array into chunks
- `unique` - Remove duplicates
- `debouncePromise` - Debounce async functions

### Improvements Needed

- Add more edge case tests
- Performance benchmarks
- Visual diagrams for complex topics
- Video tutorials
- Interactive examples

## Questions or Issues?

- Open an issue for bugs or suggestions
- Start a discussion for questions
- Check existing issues before creating new ones

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn
- Celebrate progress

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

**Thank you for contributing! 🙏**
