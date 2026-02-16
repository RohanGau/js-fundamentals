import { describe, expect, it } from "vitest";
import { promiseAll } from "../polyfills/promiseAll.js";
import { promiseAny } from "../polyfills/promiseAny.js";

describe("promise polyfills", () => {
  it("promiseAll resolves in order", async () => {
    const res = await promiseAll([Promise.resolve(1), Promise.resolve(2), 3]);
    expect(res).toEqual([1, 2, 3]);
  });

  it("promiseAll rejects on first error", async () => {
    await expect(promiseAll([Promise.resolve(1), Promise.reject("boom")])).rejects.toBe("boom");
  });

  it("promiseAny returns first fulfilled", async () => {
    const res = await promiseAny([Promise.reject("x"), Promise.resolve(2)]);
    expect(res).toBe(2);
  });

  it("promiseAny aggregates errors when all reject", async () => {
    await expect(promiseAny([Promise.reject("x"), Promise.reject("y")])).rejects.toBeInstanceOf(AggregateError);
  });
});
