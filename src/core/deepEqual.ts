const deepEqual = (valueA: unknown, valueB: unknown): boolean => {
    if(valueA === valueB) return true;

    if(typeof(valueA) !== typeof(valueB)) return false;

    console.log("valueA :", valueA, "valueB :", valueB);

    // handle array length mistach
    if(Array.isArray(valueA) && Array.isArray(valueB)) {
        if(valueA.length !== valueB.length) return false;

        for(let i = 0; i < valueA.length; i++) {
            if(!deepEqual(valueA[i], valueB[i])) return false;
        }
        return true;
    };

    // one is array, other is not
    if(Array.isArray(valueA) !== Array.isArray(valueB)) return false;

    // handle Object keys mismatch
    if(typeof(valueA) === 'object' && typeof(valueB) === 'object') {
        if(Object.keys(valueA as Record<string, any>).length !== Object.keys(valueB as Record<string, any>).length) return false;
        for(const key of Object.keys(valueA as Record<string, any>)) {
            if(!deepEqual((valueA as Record<string, any>)[key], (valueB as Record<string, any>)[key])) return false;
        }
        return true;
    }

    return false;
};

export default deepEqual;

// ## 1) What “deep equality” means

// **Deep equality** means two values are considered equal if:

// * primitives are equal by value (`1 === 1`, `"a" === "a"`)
// * arrays are equal if they have the **same length** and each element is deeply equal in order
// * objects are equal if they have the **same set of own keys** and each corresponding value is deeply equal

// You’re implementing **structural equality** (compare shape + contents), not reference equality.

// ---

// ## 2) The base case: strict equality

// ```ts
// if (valueA === valueB) return true;
// ```

// This is the “fast path” and also the correct base case for:

// * all primitives (`string`, `number`, `boolean`, `undefined`, `bigint`, `symbol`)
// * identical object references (same object in memory)

// **Note:** This also treats `-0` and `0` as equal, and treats `NaN` as **not equal** to itself (`NaN !== NaN`). Many deepEqual implementations use `Object.is` instead if they want `NaN` to equal `NaN`.

// ---

// ## 3) Type mismatch is immediate false

// ```ts
// if (typeof valueA !== typeof valueB) return false;
// ```

// If they’re not even the same primitive category, they can’t be deeply equal.

// **But**: `typeof null === "object"` is a JS quirk. If one is `null` and the other is `{}`, your later object logic must not crash.

// ---

// ## 4) Arrays: equality is order + length + element equality

// You correctly apply the array fundamentals:

// * arrays must both be arrays
// * same length
// * element-by-element deep comparison

// ```ts
// if (Array.isArray(valueA) && Array.isArray(valueB)) {
//   if (valueA.length !== valueB.length) return false;
//   for (let i = 0; i < valueA.length; i++) {
//     if (!deepEqual(valueA[i], valueB[i])) return false;
//   }
//   return true;
// }
// ```

// ### Fundamental rule:

// ✅ Arrays are **ordered lists**, so `{a:1,b:2}` order doesn’t matter, but `[1,2]` order does.

// ---

// ## 5) Reject “one array, one not array”

// ```ts
// if (Array.isArray(valueA) !== Array.isArray(valueB)) return false;
// ```

// This matters because arrays are objects in JS (`typeof [] === 'object'`), so without this, you’d accidentally treat an array like a normal object.

// ---

// ## 6) Objects: compare key sets + recurse on values

// For plain JSON objects, the fundamental approach is:

// 1. both must be non-null objects
// 2. they must have the same number of keys
// 3. they must have the same keys
// 4. values for each key must be deeply equal

// Your logic does the main part:

// ```ts
// if (typeof valueA === 'object' && typeof valueB === 'object') {
//   if (Object.keys(valueA as Record<string, any>).length !== Object.keys(valueB as Record<string, any>).length) return false;
//   for (const key of Object.keys(valueA as Record<string, any>)) {
//     if (!deepEqual((valueA as Record<string, any>)[key], (valueB as Record<string, any>)[key])) return false;
//   }
//   return true;
// }
// ```

// ### Fundamental rule:

// ✅ Objects are **unordered maps** of keys → values. We compare by keys, not by iteration order.

// ---

// ## 7) The recursion invariant (why this works)

// Your algorithm relies on this invariant:

// > If all “smaller parts” are equal, then the whole is equal.

// * arrays: elements are smaller parts
// * objects: property values are smaller parts

// Recursion terminates because JSON trees are finite depth.

// ---

// ## 8) What your function assumes (and what breaks outside JSON)

// Your problem statement says input is JSON-serializable, so you can assume:

// * no functions
// * no Date/Map/Set/RegExp
// * no class instances
// * no circular references

// If those exist, deepEqual needs extra rules.

// ---

// ## 9) Key pitfalls / things to fix in your code

// ### A) Null handling (critical)

// `typeof null === 'object'`, so this block can explode:

// ```ts
// Object.keys(valueA as Record<string, any>)
// ```

// If `valueA` is `null`, `Object.keys(null)` throws.

// ✅ Fix by adding:

// ```ts
// if (valueA === null || valueB === null) return valueA === valueB;
// ```

// Right after the `===` check.

// ---

// ### B) Key existence check (important)

// Right now, you only loop keys in A and compare values in B:

// ```ts
// for (const key of Object.keys(valueA)) {
//   if (!deepEqual(valueA[key], valueB[key])) return false;
// }
// ```

// If `valueB` is missing a key, `valueB[key]` becomes `undefined` and comparison might still pass in some cases.

// ✅ Add:

// ```ts
// if (!Object.prototype.hasOwnProperty.call(valueB, key)) return false;
// ```

// This enforces same key set (not just same key count).

// ---

// ### C) `NaN` behavior

// `NaN !== NaN`, so your function returns false for two `NaN`s.

// If you want mathematical equality semantics, consider:

// ```ts
// if (Object.is(valueA, valueB)) return true;
// ```

// instead of `===`.

// ---

// ### D) “Object keys length” uses two Object.keys calls

// Minor performance: you call `Object.keys` twice per object. Better to store.

// ---

// ## 10) A corrected version (still JSON-only)

// ```ts
// const deepEqual = (a: unknown, b: unknown): boolean => {
//   if (Object.is(a, b)) return true; // handles NaN correctly

//   if (typeof a !== typeof b) return false;

//   // null guard (typeof null === 'object')
//   if (a === null || b === null) return a === b;

//   // arrays
//   if (Array.isArray(a) || Array.isArray(b)) {
//     if (!Array.isArray(a) || !Array.isArray(b)) return false;
//     if (a.length !== b.length) return false;
//     for (let i = 0; i < a.length; i++) {
//       if (!deepEqual(a[i], b[i])) return false;
//     }
//     return true;
//   }

//   // objects (plain JSON objects)
//   if (typeof a === 'object' && typeof b === 'object') {
//     const aObj = a as Record<string, unknown>;
//     const bObj = b as Record<string, unknown>;

//     const aKeys = Object.keys(aObj);
//     const bKeys = Object.keys(bObj);

//     if (aKeys.length !== bKeys.length) return false;

//     for (const key of aKeys) {
//       if (!Object.prototype.hasOwnProperty.call(bObj, key)) return false;
//       if (!deepEqual(aObj[key], bObj[key])) return false;
//     }
//     return true;
//   }

//   return false;
// };

// export default deepEqual;
// ```

// ---

// ## The “fundamentals” recap (super recallable)

// * ✅ **Fast path**: if identical (`Object.is`) → true
// * ✅ **Type gate**: different types → false
// * ✅ **Null gate**: handle `null` explicitly
// * ✅ **Arrays**: same length + same order + deepEqual each element
// * ✅ **Objects**: same own keys + deepEqual each key’s value
// * ✅ **Recursion**: compare smaller parts until primitives
// * ✅ **Assumption**: no cycles / no special objects (JSON-only)

