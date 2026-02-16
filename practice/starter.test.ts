import { describe, it, expect } from 'vitest';
import { arraySum, arrayMax, removeDuplicates, chunk } from './starter';

describe('Array Practice - Starter Examples', () => {
  describe('arraySum', () => {
    it('should sum an array of numbers', () => {
      expect(arraySum([1, 2, 3, 4])).toBe(10);
    });

    it('should return 0 for empty array', () => {
      expect(arraySum([])).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(arraySum([-1, -2, 3])).toBe(0);
    });
  });

  describe('arrayMax', () => {
    it('should find the maximum number', () => {
      expect(arrayMax([1, 5, 3, 9, 2])).toBe(9);
    });

    it('should handle negative numbers', () => {
      expect(arrayMax([-10, -5, -20])).toBe(-5);
    });

    it('should return -Infinity for empty array', () => {
      expect(arrayMax([])).toBe(-Infinity);
    });
  });

  describe('removeDuplicates', () => {
    it('should remove duplicate numbers', () => {
      expect(removeDuplicates([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    it('should remove duplicate strings', () => {
      expect(removeDuplicates(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty array', () => {
      expect(removeDuplicates([])).toEqual([]);
    });
  });

  describe('chunk', () => {
    it('should chunk array into groups of 2', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should chunk array into groups of 3', () => {
      expect(chunk([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    it('should handle empty array', () => {
      expect(chunk([], 2)).toEqual([]);
    });
  });
});
