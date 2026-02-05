/**
 * Flatten an array of arbitrary depth without mutating the original.
 * Uses an explicit stack to avoid recursion depth limits.
 */
export function flatten<T>(input: any[]): T[] {
  const result: T[] = [];
  const stack = [...input];

  while (stack.length) {
    const value = stack.pop();
    if (Array.isArray(value)) {
      stack.push(...value);
    } else {
      result.push(value as T);
    }
  }

  return result.reverse();
}

export default flatten;
