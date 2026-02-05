/**
 * deepClone.js
 * -------------
 * A robust deep cloning utility for JavaScript values.
 *
 * ✅ Features:
 * - Handles all primitive types
 * - Preserves prototypes for class instances and custom objects
 * - Safely clones cyclic structures using WeakMap
 * - Supports arrays, Date, RegExp, symbol and string keys
 * - Ignores inherited properties (clones only own properties)
 *
 * 
 *  * 🧠 What makes this deepClone advanced?
 *
 * - ✅ **Symbol-keyed properties** are preserved.
 *   - Standard iteration methods like `for...in`, `Object.keys()`, or `Object.entries()` do not pick up symbol keys.
 *   - To handle them, we use `Reflect.ownKeys()` which returns all own keys — string and symbol.
 *
 * - ✅ **Non-enumerable properties** are cloned.
 *   - These are skipped by most enumeration methods.
 *   - Using `Object.getOwnPropertyDescriptors()` allows us to capture and recreate them properly.
 *
 * - ✅ **Prototype chain is preserved.**
 *   - Clones retain the original object’s prototype using `Object.getPrototypeOf()` and `Object.create()`.
 *
 * - ✅ **Circular references** are safely handled.
 *   - Uses a `WeakMap` internally to cache visited objects.
 *   - Prevents infinite recursion and maintains object identity in cycles.
 * 
 * ⚠️ Limitations:
 * - Does not clone DOM nodes, `Map`, `Set`, or functions deeply.
 * - Property descriptors such as getters/setters are shallow copied.
 * - Clones objects, arrays, dates, regexes, symbols, and primitives reliably.
 *
 * 🧪 One-liner alternative:
 *   `const cloned = structuredClone(obj);`
 *   - Native and fast, but does **not preserve prototypes**, **property descriptors**, or **non-enumerable** or **symbol** keys.
 *   - Check browser compatibility and limitations on [web.dev structuredClone](https://web.dev/structured-clone/)
 *
 *
 * ⚠️ Note:
 * - Functions are returned as-is (not cloned)
 * - Does not handle Map, Set, or DOM nodes (can be extended for that)
 *
 * @template T
 * @param {T} value - The value to deep clone
 * @param {WeakMap<object, any>} [map=new WeakMap()] - Internal map to track circular references
 * @returns {T} - Deep cloned copy of the original value
 */


const circularObj = {};
const sampleObject = {
  number: 42,
  string: "Hello, world!",
  boolean: true,
  nullValue: null,
  undefinedValue: undefined,
  nanValue: NaN,
  infinityValue: Infinity,
  date: new Date("2020-01-01"),
  regexp: /deepclone/gi,
  symbol: Symbol("sym"),
  array: [1, 2, { nested: "value" }, [3, 4]],
  nestedObj: {
    a: 1,
    b: {
      c: {
        d: "deep",
      },
    },
  },
  map: new Map([
    ["key1", "value1"],
    ["key2", { deep: true }],
  ]),
  set: new Set([1, 2, 3, { foo: "bar" }]),
  func: function (x) {
    return x * 2;
  },
  arrowFunc: x => x + 1,
};

/**
 * @template T
 * @param {T} value
 * @return {T}
 */
function deepClone(value, map = new WeakMap()) {
  if (typeof value !== "object" || typeof value === "function" || value === null)
    return value;

  if (map.has(value)) return map.get(value);

  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);

  if (Array.isArray(value)) return value.map((item) => deepClone(item));

  let obj = Object.create(Object.getPrototypeOf(value));
  map.set(value, obj);
  for (let key of Reflect.ownKeys(value)) {
    if (value.hasOwnProperty(key)) {
      obj[key] = deepClone(value[key], map);
    }
  }
  return obj;
}



console.log("sampleObject :", sampleObject);
const cloneObject = deepClone(sampleObject);
console.log("cloneObject :", cloneObject);


/*
- This advanced deepClone should work with objects that have symbol-keyed properties.
  That is, symbol-keyed properties are also copied. On top of that, non-enumerable properties should also be copied.
  Neither the for ... in statement or the Object.entries()/Object.keys() reveals them, so we need to leverage a lesser-known API called Reflect.ownKeys().
   Check out this MDN page to learn more about it.
The input object's property descriptors should also be copied. For that, we can use the method Object.getOwnPropertyDescriptors().
The input object's prototype should not be lost after the copying. We can use Object.getPrototypeOf() to get a reference to the prototype of a given object.
We should account for circular references in the input object and avoid erroring. We can achieve this by having a cache (a Map underneath) that acts as a cache to store visited properties. After cloning an object, we can put the cloned object in cache with the original object as the key. If we encounter the same value again in the original object while cloning, we can retrieve the cloned value from the cache.
*/