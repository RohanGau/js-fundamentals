import { describe, expect, it } from "vitest";
import { classNames } from "../polyfills/classNames.js";

describe("classNames", () => {
  it("concats strings and numbers", () => {
    expect(classNames("a", 2, "b")).toBe("a 2 b");
  });

  it("handles objects with truthy/falsy values", () => {
    expect(classNames({ a: true, b: false }, "c")).toBe("a c");
  });

  it("handles nested arrays", () => {
    expect(classNames(["a", ["b", { c: true }]])).toBe("a b c");
  });

  it("invokes functions lazily", () => {
    expect(classNames(() => "a", { b: true })).toBe("a b");
  });

  it("removes classes turned off later", () => {
    expect(classNames({ a: true }, { a: false }, "b")).toBe("b");
  });
});
