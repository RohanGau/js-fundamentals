/**
 * 🎯 STARTER EXAMPLE - Array Methods Practice
 * 
 * Try implementing these array methods from scratch!
 * Run: npm run practice
 * Then save this file to see tests run automatically!
 */

/**
 * Sum all numbers in an array
 */
export function arraySum(arr: number[]): number {
  // TODO: Implement this
  return arr.reduce((sum, num) => sum + num, 0);
}

/**
 * Find the maximum number in an array
 */
export function arrayMax(arr: number[]): number {
  // TODO: Implement this
  if (arr.length === 0) return -Infinity;
  return Math.max(...arr);
}

/**
 * Remove duplicates from an array
 */
export function removeDuplicates<T>(arr: T[]): T[] {
  // TODO: Implement this
  return [...new Set(arr)];
}

/**
 * Chunk an array into smaller arrays of size n
 * Example: chunk([1,2,3,4,5], 2) => [[1,2], [3,4], [5]]
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  // TODO: Implement this
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
