/**
 * Deep clone common JavaScript values while preserving prototypes and symbol keys.
 * Not intended for DOM nodes / Map / Set (can be extended easily).
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
