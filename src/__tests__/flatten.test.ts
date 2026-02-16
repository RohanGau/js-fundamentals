import { describe, expect, it } from "vitest";
import { flatten } from "../polyfills/flatten.js";

describe("flatten", () => {
  it("flattens nested arrays", () => {
    expect(flatten([1, [2, [3]], 4])).toEqual([1, 2, 3, 4]);
  });

  it("handles empty array", () => {
    expect(flatten([])).toEqual([]);
  });
});
