/**
 * @template T, U
 * @param { (value: T, index: number, array: Array<T>) => U } callbackFn
 * @param {any} [thisArg]
 * @return {Array<U>}
 */
Array.prototype.myMap = function (callbackFn, thisArg) {
  if(typeof callbackFn !== 'function') {
    throw new Error(callback + " is not a function");
  }
  // create new object
  const O = Object(this);
  const len = O.length >>> 0; 
  const A = new Array(len);
  let k = 0;
  while(k < len) {
    if(k in O) {
      A[k] = callbackFn.call(thisArg, O[k], k, O);
    }
    k++
  }
  return A;
};



/**
 * --- Interview Context ---
 * 
 * This file contains a polyfill for JavaScript's Array.prototype.map method, implemented as Array.prototype.myMap.
 * 
 * Key Points to Discuss in Interviews:
 * 
 * 1. **Polyfill Purpose:**  
 *    - Shows how to extend native prototypes and mimic built-in array methods.
 *    - Demonstrates understanding of JavaScript internals and compatibility.
 * 
 * 2. **Callback Handling:**  
 *    - Checks if the provided callback is a function.
 *    - Throws an error if the callback is not a function, matching native behavior.
 * 
 * Object(this) — Boxing Primitive Types: Ensures that this (the array or array-like object) is converted to an object if it’s a primitive.
 * Example: [].myMap.call('abc', cb) 
 * 
 *  len >>> 0 — Safe Length Extraction
 *  Unsigned right shift (>>> 0) ensures:
	•	Length is a non-negative integer
	•	Handles edge cases where length might be missing or non-numeric
	•	This makes it safe for array-like objects
 * 
 * 3. **Context (`thisArg`):**  
 *    - Supports passing a custom `this` context to the callback using `Function.prototype.call`.
 *    - Useful when you want the callback to access a specific object as `this`.
 * 
 * 4. **Sparse Arrays:**  
 *    - Uses `k in O` to skip holes in sparse arrays (arrays with missing elements).
 *    - Ensures only existing elements are processed, just like the native `map`.
 * 
 * 5. **Immutability:**  
 *    - Returns a new array, leaving the original array unchanged.
 *    - Follows functional programming principles.
 * 
 * 6. **Iteration:**  
 *    - Iterates using a while loop and applies the callback to each valid element.
 *    - Passes three arguments to the callback: value, index, and the original array.
 * 
 * --- Usage Example ---
 * 
 * // Example 1: Basic usage
 * const arr = [1, 2, 3];
 * const doubled = arr.myMap(x => x * 2); // [2, 4, 6]
 * 
 * // Example 2: Using thisArg
 * const obj = { factor: 10 };
 * function multiply(val) { return val * this.factor; }
 * const result = [1, 2, 3].myMap(multiply, obj); // [10, 20, 30]
 * 
 * // Example 3: Sparse array
 * const sparse = [1, , 3];
 * const mapped = sparse.myMap(x => x || 0); // [1, , 3] (hole remains)
 * 
 * --- Interview Tip ---
 * Use this explanation to show your understanding of:
 * - JavaScript prototypes and inheritance
 * - Array method polyfills
 * - Edge case handling (sparse arrays, callback validation, context)
 * - Writing robust, maintainable code
 */

