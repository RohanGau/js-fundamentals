/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */

Promise.myAll =  function (iterable) {

  return new Promise(async (resolve, reject) => {
    if (!Array.isArray(iterable)) {
      return reject(new TypeError(iterable + " is not iterable"));
    }

    const result = [];
    let completed = 0;

    if(iterable.length === 0) {
      return resolve([]);
    } 

    iterable.forEach((item, index) => {
      Promise.resolve(item).then((res) => {
          completed++;
          result[index] = res;
          if(completed === iterable.length) {
            resolve(result);
          }
        }).catch((error) => reject(error));
    });
  })
}


const p0 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 200);
});

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(2);
    }, 100);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(3);
    }, 10);
});

Promise.myAll([p0, p1, p2]).then((values) => {
    console.log("p1: ", values[0]);
    console.log("p2 ", values[1]);
    console.log("p3 ", values[2]);
}).catch((error) => {
    console.error("Error in Promise.all:", error);
});

/**
 * --- Interview Context ---
 * 
 * This file contains a polyfill for JavaScript's Promise.all method, implemented as Promise.myAll.
 * 
 * Key Points to Discuss in Interviews:
 * 
 * 1. **Polyfill Purpose:**  
 *    - Demonstrates how to mimic the behavior of Promise.all.
 *    - Shows understanding of promises, asynchronous control flow, and error handling.
 * 
 * 2. **Input Validation:**  
 *    - Checks if the input is an array (iterable).
 *    - Rejects with a TypeError if not iterable, matching native behavior.
 * 
 * 3. **Empty Input Handling:**  
 *    - Resolves immediately with an empty array if the input array is empty.
 * 
 * 4. **Promise Resolution:**  
 *    - Iterates over all items, wrapping each in Promise.resolve to handle both promises and non-promises.
 *    - Collects results in the original order using the index.
 *    - Resolves only when all promises are fulfilled.
 * 
 * 5. **Error Handling:**  
 *    - If any promise rejects, the returned promise rejects immediately with that error.
 *    - Only the first rejection is reported, as in the native implementation.
 * 
 * 6. **Order Guarantee:**  
 *    - Ensures the resolved array maintains the order of the input promises, regardless of completion order.
 * 
 * --- Usage Example ---
 * 
 * // Example 1: All promises resolve
 * const p1 = Promise.resolve(1);
 * const p2 = Promise.resolve(2);
 * Promise.myAll([p1, p2]).then(console.log); // [1, 2]
 * 
 * // Example 2: One promise rejects
 * const p3 = Promise.reject('error');
 * Promise.myAll([p1, p3]).catch(console.error); // 'error'
 * 
 * // Example 3: Non-promise values
 * Promise.myAll([1, 2, 3]).then(console.log); // [1, 2, 3]
 * 
 * --- Interview Tip ---
 * Use this explanation to show your understanding of:
 * - Promises and asynchronous patterns in JavaScript
 * - Polyfilling native methods
 * - Edge case handling (empty input, non-promise values, order preservation)
 * - Writing robust, maintainable
 */
