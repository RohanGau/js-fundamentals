import { describe, expect, it } from "vitest";
import "../polyfills/arrayMap.js";
import "../polyfills/arrayFilter.js";
import "../polyfills/arrayReduce.js";

describe("array polyfills", () => {
  it("myMap doubles numbers", () => {
    expect([1, 2, 3].myMap((x) => x * 2)).toEqual([2, 4, 6]);
  });

  it("myFilter keeps even numbers", () => {
    expect([1, 2, 3, 4].myFilter((x) => x % 2 === 0)).toEqual([2, 4]);
  });

  it("myReduce sums values", () => {
    expect([1, 2, 3].myReduce((acc, x) => acc + x, 0)).toBe(6);
  });
});
