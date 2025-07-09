/**
 * @template T
 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn
 * @param {any} [thisArg]
 * @return {Array<T>}
 */
Array.prototype.myFilter = function (callbackFn, thisArg) {
  if(typeof callbackFn !== "function") throw new Error(callbackFn + " is not a function");

  let O = Object(this);
  const len = O.length >>> 0;
  let A = [];
  let i = 0; 

  while(i < len) {
    if(i in O) {
      const isValid = callbackFn.call(thisArg, O[i], i, O);
      if(isValid) {
        A.push(O[i]);  
      }
    }
    i++;
  }

  return A;
};

/**
 * --- Interview Context ---
 * 
 * This file contains a polyfill for JavaScript's Array.prototype.filter method, implemented as Array.prototype.myFilter.
 * 
 * Key Points to Discuss in Interviews:
 * 
 * 1. **Polyfill Purpose:**  
 *    - Demonstrates how to extend native prototypes and mimic built-in array methods.
 *    - Shows understanding of JavaScript internals and compatibility.
 * 
 * 2. **Callback Handling:**  
 *    - Checks if the provided callback is a function.
 *    - Throws an error if the callback is not a function, matching native behavior.
 * 
 * 3. **Context (`thisArg`):**  
 *    - Supports passing a custom `this` context to the callback using `Function.prototype.call`.
 *    - Useful when you want the callback to access a specific object as `this`.
 * 
 * 4. **Sparse Arrays:**  
 *    - Uses `i in O` to skip holes in sparse arrays (arrays with missing elements).
 *    - Ensures only existing elements are processed, just like the native `filter`.
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
 * const arr = [1, 2, 3, 4];
 * const evens = arr.myFilter(x => x % 2 === 0); // [2, 4]
 * 
 * // Example 2: Using thisArg
 * const obj = { min: 3 };
 * function greaterThanMin(val) { return val > this.min; }
 * const result = [2, 3, 4, 5].myFilter(greaterThanMin, obj); // [4, 5]
 * 
 * // Example 3: Sparse array
 * const sparse = [1, , 3, 4];
 * const filtered = sparse.myFilter(x => x !== undefined); // [1, 3, 4]
 * 
 * --- Interview Tip ---
 * Use this explanation to show your understanding of:
 * - JavaScript prototypes and inheritance
 * - Array method polyfills
 * - Edge case handling (sparse arrays, callback validation, context)
 * - Writing robust, maintainable code
 */
