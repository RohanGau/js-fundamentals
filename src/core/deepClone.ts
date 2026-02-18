/**
 * ============================================================
 * DEEP CLONE — HARD  (Senior / MAANG Level)
 * ============================================================
 *
 * ─────────────────────────────────────────────
 * FUNDAMENTAL: What is a deep clone?
 * ─────────────────────────────────────────────
 * JavaScript assignment copies references, not values.
 *
 *   const a = { x: { y: 1 } };
 *   const b = a;           // b and a point to the SAME object in memory
 *   b.x.y = 99;
 *   console.log(a.x.y);   // 99 — a was mutated!
 *
 * A shallow clone (Object.assign / spread) copies the top level only.
 * A deep clone creates a completely new structure at EVERY level —
 * no shared references anywhere in the tree.
 *
 * ─────────────────────────────────────────────
 * FUNDAMENTAL: The memory model
 * ─────────────────────────────────────────────
 * Primitives (string, number, boolean, null, undefined, symbol, bigint)
 * are stored BY VALUE on the stack. Copying them is inherently safe.
 *
 * Objects, arrays, functions are stored BY REFERENCE on the heap.
 * The variable only holds a pointer to the heap location.
 * Deep clone must follow every pointer and allocate new heap memory.
 *
 * ─────────────────────────────────────────────
 * EDGE CASE 1 — Circular references
 * ─────────────────────────────────────────────
 * Problem:
 *   const a: any = { name: 'root' };
 *   a.self = a;          // a.self points back to a
 *   deepClone(a);        // naive recursion → infinite loop → stack overflow
 *
 * Fix: WeakMap cache
 *   Before cloning any object, store it in a WeakMap.
 *   When we encounter an object we've already started cloning,
 *   return the in-progress clone instead of recursing again.
 *
 *   cache.set(value, clonedObj)   ← register BEFORE recursing into children
 *   if (cache.has(value)) return cache.get(value)   ← detect cycle
 *
 * Why WeakMap over Map?
 *   Map holds strong references — the original objects can never be GC'd
 *   as long as the Map exists. WeakMap holds WEAK references — if the
 *   original object has no other references, it can be garbage collected.
 *   This prevents memory leaks, especially in large object graphs.
 *
 * ─────────────────────────────────────────────
 * EDGE CASE 2 — Prototype chain preservation
 * ─────────────────────────────────────────────
 * Problem:
 *   class Animal { speak() { return 'roar'; } }
 *   const dog = new Animal();
 *   const clone = { ...dog };          // plain object, loses Animal prototype
 *   clone instanceof Animal;           // false
 *   clone.speak();                     // TypeError: not a function
 *
 * Fix: Object.create(Object.getPrototypeOf(value))
 *   This creates a new EMPTY object whose internal [[Prototype]] is set
 *   to the same prototype as the original — so instanceof and inherited
 *   methods all still work on the clone.
 *
 * ─────────────────────────────────────────────
 * EDGE CASE 3 — Symbol keys
 * ─────────────────────────────────────────────
 * Problem:
 *   const ID = Symbol('id');
 *   const obj = { [ID]: 42, name: 'Rohan' };
 *   Object.keys(obj);        // ['name']   ← Symbol key is invisible!
 *
 * Fix: Reflect.ownKeys(value)
 *   Returns ALL own property keys: strings + symbols,
 *   enumerable + non-enumerable. Nothing is missed.
 *
 * ─────────────────────────────────────────────
 * EDGE CASE 4 — Accessor properties (getters / setters)
 * ─────────────────────────────────────────────
 * Problem:
 *   const obj = {
 *     _x: 0,
 *     get x() { return this._x * 2; },
 *     set x(v) { this._x = v; }
 *   };
 *   const clone = {};
 *   clone.x = obj.x;   // reads the getter (gets 0), stores 0 as a plain value
 *                       // the getter/setter BEHAVIOUR is lost on the clone
 *
 * Fix: Object.getOwnPropertyDescriptor + Object.defineProperty
 *   getOwnPropertyDescriptor reveals if a property has get/set.
 *   defineProperty re-attaches the descriptor verbatim — the clone
 *   has the same getter/setter logic, not just a frozen snapshot value.
 *
 * ─────────────────────────────────────────────
 * EDGE CASE 5 — Special built-in types
 * ─────────────────────────────────────────────
 * Date:
 *   const d = new Date('2024-01-01');
 *   const bad = { ...d };       // {} — Date's internal [[DateValue]] slot is not a plain property
 *   bad.getTime();              // TypeError
 *   Fix: new Date(original)     — copies the internal time value correctly
 *
 * RegExp:
 *   const r = /abc/gi;
 *   const bad = { ...r };       // {} — loses source and flags
 *   Fix: new RegExp(original)   — copies source + flags correctly
 *
 * NOT handled (can be extended):
 *   - Map / Set     → need to clone entries/values recursively
 *   - ArrayBuffer   → use buffer.slice()
 *   - DOM nodes     → use node.cloneNode(true)
 *   - Functions     → intentionally returned as-is (shared reference)
 *
 * ─────────────────────────────────────────────
 * INTERVIEW QUICK-FIRE Q&A
 * ─────────────────────────────────────────────
 * Q: Why not JSON.parse(JSON.stringify(obj))?
 * A: Loses: undefined, functions, Symbol keys, Date (becomes string),
 *    RegExp (becomes {}), circular refs throw an error, prototypes lost.
 *    Fine for simple data, dangerous in real systems.
 *
 * Q: Why register in cache BEFORE recursing into children?
 * A: If a child references the parent (cycle), the cache hit is needed
 *    DURING the recursion of that parent — not after. Registering early
 *    breaks the cycle at the right moment.
 *
 * Q: What's the difference between own and inherited properties?
 * A: Own = defined directly on the object.
 *    Inherited = on the prototype chain.
 *    Deep clone should only copy own properties — never inherited ones.
 *    That's why Reflect.ownKeys (own only) beats for...in (own + inherited).
 *
 * Q: What is a property descriptor?
 * A: Every property has a hidden descriptor: { value, writable, enumerable,
 *    configurable } for data properties, or { get, set, enumerable,
 *    configurable } for accessor properties. Object.keys only sees
 *    enumerable data properties. getOwnPropertyDescriptor sees everything.
 *
 * Time:  O(n) — each node visited exactly once (WeakMap prevents re-visits)
 * Space: O(n) — WeakMap entries + cloned object graph
 */
export function deepClone<T>(value: T, cache: WeakMap<object, any> = new WeakMap()): T {
  if (typeof value !== "object" || value === null) return value;
  if (typeof value === "function") return value;

  if (cache.has(value as object)) {
    return cache.get(value as object);
  }

  if (value instanceof Date) return new Date(value) as unknown as T;
  if (value instanceof RegExp) return new RegExp(value) as unknown as T;

  if (Array.isArray(value)) {
    const arrCopy = value.map((item) => deepClone(item, cache)) as unknown as T;
    cache.set(value as unknown as object, arrCopy);
    return arrCopy;
  }

  const prototype = Object.getPrototypeOf(value);
  const clonedObj = Object.create(prototype);
  cache.set(value as unknown as object, clonedObj);

  for (const key of Reflect.ownKeys(value)) {
    const desc = Object.getOwnPropertyDescriptor(value, key);
    if (!desc) continue;
    if (desc.get || desc.set) {
      Object.defineProperty(clonedObj, key, desc);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clonedObj[key] = deepClone((value as any)[key], cache);
    }
  }

  return clonedObj;
}

/**
 * ============================================================
 * DEEP CLONE — MEDIUM  (Mid-level Interview)
 * ============================================================
 *
 * ─────────────────────────────────────────────
 * WHAT THIS SOLVES
 * ─────────────────────────────────────────────
 * Handles the three most common cases an interviewer expects at mid-level:
 *
 *   1. Primitives  → return as-is (already copied by value)
 *   2. Arrays      → recursively clone each element into a new array
 *   3. Plain objects → recursively clone each string-keyed property
 *
 * This is what most interviewers mean when they say "implement deepClone"
 * unless they specifically ask about edge cases.
 *
 * ─────────────────────────────────────────────
 * FUNDAMENTAL: Why primitives need no cloning
 * ─────────────────────────────────────────────
 * Primitives are immutable and copied by value automatically:
 *
 *   let a = 42;
 *   let b = a;   // b gets a copy of 42, not a reference
 *   b = 99;
 *   console.log(a); // still 42 — a is unaffected
 *
 * There is no "reference" to break. Returning them directly is correct.
 *
 * ─────────────────────────────────────────────
 * FUNDAMENTAL: typeof null === 'object' — the classic JS bug
 * ─────────────────────────────────────────────
 * null is a primitive but typeof null returns 'object'.
 * This is a historical bug in JavaScript from 1995 that was never fixed
 * for backwards compatibility reasons.
 *
 * So the null check MUST come before the typeof check:
 *
 *   if (value === null || typeof value !== 'object') return value;
 *               ↑
 *   Without this, null flows into the object/array cloning logic and crashes.
 *
 * ─────────────────────────────────────────────
 * FUNDAMENTAL: typeof [] === 'object' — arrays are objects
 * ─────────────────────────────────────────────
 * Arrays in JS are objects. typeof gives no distinction:
 *
 *   typeof []    // 'object'
 *   typeof {}    // 'object'
 *
 * If you forget Array.isArray() and treat arrays as plain objects:
 *   - Array methods (push, map, filter) are lost on the clone
 *   - Array length property behaves differently
 *   - The cloned "array" is actually a plain object with numeric keys
 *
 * Always check Array.isArray(value) BEFORE the generic object branch.
 *
 * ─────────────────────────────────────────────
 * FUNDAMENTAL: Shallow vs Deep — the real difference
 * ─────────────────────────────────────────────
 * Shallow copy (Object.assign / spread):
 *   const a = { nested: { x: 1 } };
 *   const b = { ...a };
 *   b.nested.x = 99;
 *   console.log(a.nested.x); // 99 — shared reference, still mutated!
 *
 * Deep copy (this function):
 *   const b = deepCloneMedium(a);
 *   b.nested.x = 99;
 *   console.log(a.nested.x); // 1 — independent copy, not mutated
 *
 * The key: every nested object gets its own new allocation.
 *
 * ─────────────────────────────────────────────
 * WHAT'S INTENTIONALLY MISSING (and why that's OK at medium level)
 * ─────────────────────────────────────────────
 * 1. Circular references
 *    const a: any = {}; a.self = a;
 *    deepCloneMedium(a); // → RangeError: Maximum call stack size exceeded
 *    Not expected at medium unless interviewer specifically asks.
 *    Fix: WeakMap cache (see deepClone above)
 *
 * 2. Prototype preservation
 *    class Foo { greet() { return 'hi'; } }
 *    const f = new Foo();
 *    const c = deepCloneMedium(f);
 *    c instanceof Foo;  // false — prototype chain is lost
 *    c.greet();         // TypeError
 *    This is acceptable at medium level. Senior level must handle it.
 *
 * 3. Symbol keys
 *    const sym = Symbol('key');
 *    const obj = { [sym]: 'hidden' };
 *    deepCloneMedium(obj); // {} — Symbol key silently dropped
 *    Object.keys() only returns string-keyed enumerable properties.
 *
 * 4. Special built-ins (Date, RegExp, Map, Set)
 *    const d = new Date();
 *    const c = deepCloneMedium(d);
 *    c.getTime(); // TypeError — cloned as plain {}, internal slot lost
 *    Must use: new Date(original) to preserve the internal [[DateValue]].
 *
 * ─────────────────────────────────────────────
 * COMMON INTERVIEW MISTAKES AT THIS LEVEL
 * ─────────────────────────────────────────────
 * ✗ Forgetting null check → crashes on null input
 * ✗ No Array.isArray check → arrays cloned as plain objects
 * ✗ Using for...in instead of Object.keys → picks up inherited properties
 * ✗ Not recursing into values → produces a shallow copy instead of deep
 * ✗ Mutating the original → result[key] = value[key] without recursion
 *
 * ─────────────────────────────────────────────
 * WHAT A STRONG MEDIUM ANSWER DEMONSTRATES
 * ─────────────────────────────────────────────
 * ✓ Knows primitives need no special handling
 * ✓ Catches the typeof null === 'object' bug proactively
 * ✓ Distinguishes arrays from objects with Array.isArray
 * ✓ Recurses correctly — full tree, not just top level
 * ✓ Uses Object.keys (own, enumerable, string keys) intentionally
 * ✓ Can articulate what's missing and how to extend it
 *
 * Time:  O(n) — n = total number of nodes in the object tree
 * Space: O(d) — d = max depth (call stack), O(n) for the cloned structure
 */
export function deepCloneMedium<T>(value: T): T {

  // handle primitive + null
  if(value === null || typeof(value) !== 'object') {
    return value;
  }

  // handle array
  if(Array.isArray(value)) {
    return value.map((item) => deepClone(item)) as unknown as T;
  }

  // handle object
  const result: Record<string, any> = {};
  for (const key of Object.keys(value)) {
    result[key] = deepClone((value as Record<string, any>)[key]);
  }

  return result as T;
}

export default deepClone;



// # 🧬 Prototype Pollution — Practical Documentation

// ## 1️⃣ Core Mental Model

// Every JavaScript object has an internal link to a **prototype object**.

// ```ts
// const obj = {};
// ```

// `obj` internally links to:

// ```ts
// Object.prototype
// ```

// So when you do:

// ```ts
// obj.toString()
// ```

// It works because `toString` lives on `Object.prototype`.

// ---

// ## 2️⃣ What Is Prototype Pollution?

// Prototype pollution happens when someone injects properties into `Object.prototype`, causing those properties to appear on **all objects**.

// ### Example:

// ```ts
// Object.prototype.isAdmin = true;

// const user = {};
// console.log(user.isAdmin); // true 😨
// ```

// Now every object appears to have `isAdmin`.

// That’s dangerous.

// ---

// # 🧨 How Prototype Pollution Happens

// It usually happens when:

// * Merging user-controlled input
// * Using unsafe `for...in`
// * Not guarding against `__proto__`
// * Writing deep merge / deep clone utilities incorrectly

// ---

// ## 3️⃣ The Dangerous Key: `__proto__`

// This key can modify the prototype chain.

// Example:

// ```ts
// const payload = {
//   "__proto__": {
//     hacked: true
//   }
// };

// const obj = {};
// Object.assign(obj, payload);

// console.log({}.hacked); // true 💀
// ```

// Now all objects are polluted.

// ---

// # 🔍 Why `for...in` Is Risky

// Your original code:

// ```ts
// for (const key in value) {
//   obj[key] = deepClone(value[key]);
// }
// ```

// Problem:

// `for...in` iterates over:

// * Own properties
// * Inherited properties

// If the prototype was polluted:

// ```ts
// Object.prototype.hacked = '💀';

// const input = { name: 'Rohan' };
// ```

// Then:

// ```ts
// for (const key in input) {
//   console.log(key);
// }
// ```

// Output:

// ```
// name
// hacked
// ```

// Your deep clone would copy `hacked`.

// That spreads pollution further.

// ---

// # 🛡 Safe Iteration Patterns

// ### ✅ Use `Object.keys()`

// ```ts
// for (const key of Object.keys(value)) {
//   obj[key] = deepClone(value[key]);
// }
// ```

// Only copies own properties.

// ---

// ### ✅ Use `Object.entries()`

// ```ts
// for (const [key, val] of Object.entries(value)) {
//   obj[key] = deepClone(val);
// }
// ```

// Cleaner and safer.

// ---

// ### 🔒 Extra Defensive Pattern

// ```ts
// if (Object.prototype.hasOwnProperty.call(value, key)) {
//   ...
// }
// ```

// Prevents prototype override tricks.

// ---

// # 🚨 Real-World Exploit Scenario

// Many libraries had vulnerabilities like this:

// ```ts
// deepMerge({}, userInput);
// ```

// If `userInput` contained:

// ```json
// {
//   "__proto__": {
//     "admin": true
//   }
// }
// ```

// Now:

// ```ts
// ({}).admin === true
// ```

// This affected:

// * Express middleware
// * Config systems
// * Auth checks
// * Permission logic

// This was a real production vulnerability across npm ecosystem.

// ---

// # 🧠 How Deep Clone Should Defend Against It

// If you’re building a deep clone for real-world use, you should:

// 1. Only copy own properties
// 2. Ignore dangerous keys:

//    * `__proto__`
//    * `constructor`
//    * `prototype`

// Example defensive check:

// ```ts
// const forbiddenKeys = ['__proto__', 'constructor', 'prototype'];

// for (const key of Object.keys(value)) {
//   if (forbiddenKeys.includes(key)) continue;
//   result[key] = deepClone(value[key]);
// }
// ```

// ---

// # 📦 Safe Deep Clone (Interview-Ready + Secure)

// ```ts
// export default function deepClone<T>(value: T): T {
//   if (value === null || typeof value !== 'object') {
//     return value;
//   }

//   if (Array.isArray(value)) {
//     return value.map(deepClone) as unknown as T;
//   }

//   const result: Record<string, unknown> = {};
//   const forbidden = new Set(['__proto__', 'constructor', 'prototype']);

//   for (const key of Object.keys(value)) {
//     if (forbidden.has(key)) continue;

//     result[key] = deepClone(
//       (value as Record<string, unknown>)[key]
//     );
//   }

//   return result as T;
// }
// ```

// ---

// # 🎯 Interview Recall Cheat Sheet

// If asked about prototype pollution, say:

// > Prototype pollution occurs when properties are injected into `Object.prototype`, causing them to appear on all objects.
// > It often happens due to unsafe object merging or iteration using `for...in`.
// > To prevent it, use `Object.keys()` or `Object.entries()` and guard against keys like `__proto__`.

// That’s a strong answer.

// ---

// # 🧠 Quick Memory Model (Easy Recall)

// Remember this 3-step rule:

// ### 🧩 "Prototype Pollution = Unsafe Merge + `__proto__` + for...in"

// If you remember that phrase, you’ll recall everything.

// ---

// # 🔬 Bonus: Why JSON.parse(JSON.stringify()) Is Safe Here

// Because JSON:

// * Ignores functions
// * Ignores prototype chain
// * Does not serialize `__proto__` behaviorally

// But it fails for:

// * Date
// * Map
// * Set
// * undefined
// * circular references

// ---

// # 🏁 Final Mental Model

// Think of it this way:

// Deep clone is not just copying values.

// It is:

// * Protecting boundaries
// * Avoiding reference sharing
// * Avoiding inherited properties
// * Avoiding prototype injection

// That’s what separates junior recursion from senior-level defensive coding.
