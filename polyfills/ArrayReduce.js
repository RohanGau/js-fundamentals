/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */

Array.prototype.myReduce = function (callbackFn, initialValue) {
  if(typeof callbackFn !== 'function') {
    throw new Error(callbackFn + " is not a function");
  }
  
  let O = Object(this);
  const len = O.length >>> 0;
  let i = 0;
  let result = initialValue;
  if(arguments.length < 2) {
    let k = 0;
    let kPresent = false;
    while(k < len) {
      if(k in O) {
        result = O[k];
        i+=1;
        kPresent = true;
        break;
      }
      k++;
    }

    if(!kPresent && len === 0) throw new Error("reduce has empty array with no initialValue");
    if(!kPresent && len > 0) throw new Error("reduce has empty array with no initialValue");
  }
  
  while(i < len) {
    if(i in O) {
      result = callbackFn(result, O[i], i, O);
    }
    i++;
  }

  return result;
};

const array = [3, 4, 5, 6, 7];
const sum = array.myReduce((acc, val) => acc + val, 2);
console.log("sum :", sum);


/**
 * --- Interview Context ---
 * 
 * This file contains a polyfill for JavaScript's Array.prototype.reduce method, implemented as Array.prototype.myReduce.
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
 * 3. **Initial Value Handling:**  
 *    - Handles cases where an initial value is or isn't provided.
 *    - If no initial value, finds the first present element to use as the initial accumulator.
 *    - Throws an error if the array is empty and no initial value is provided.
 * 
 * 4. **Sparse Arrays:**  
 *    - Uses `k in O` and `i in O` to skip holes in sparse arrays.
 *    - Ensures only existing elements are processed, just like the native `reduce`.
 * 
 * 5. **Iteration:**  
 *    - Iterates through the array, applying the callback to the accumulator and each valid element.
 *    - Passes four arguments to the callback: accumulator, current value, index, and the original array.
 * 
 * --- Usage Example ---
 * 
 * // Example 1: Basic usage
 * const arr = [1, 2, 3, 4];
 * const sum = arr.myReduce((acc, val) => acc + val, 0); // 10
 * 
 * // Example 2: No initial value
 * const arr2 = [5, 6, 7];
 * const product = arr2.myReduce((acc, val) => acc * val); // 210
 * 
 * // Example 3: Sparse array
 * const sparse = [1, , 3];
 * const total = sparse.myReduce((acc, val) => acc + (val || 0), 0); // 4
 * 
 * --- Interview Tip ---
 * Use this explanation to show your understanding of:
 * - JavaScript prototypes and inheritance
 * - Array method polyfills
 * - Edge case handling (sparse arrays, initial value, callback validation)
 * - Writing robust, maintainable code
 */
