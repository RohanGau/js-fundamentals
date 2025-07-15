
Promise.myAny = function(iterable) {
   return new Promise((resolve, reject) => {
    if (!Array.isArray(iterable)) {
      return reject(new TypeError("Argument is not iterable"));
    }

    if (iterable.length === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    let pending = iterable.length;
    const errors = new Array(iterable.length);

    iterable.forEach(async (item, index) => {
      try {
        const value = await item;
        resolve(value);
      } catch (err) {
        errors[index] = err;
        pending--;

        if (pending === 0) {
          reject(new AggregateError(errors));
        }
      }
    });
  });
}

const promise1 = new Promise((_, reject) => {
    reject(2);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "Done eventually");
});

const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "Done quick");
});


const p0 = new Promise((resolve) => {
    setTimeout(() => {
    resolve(1);
    }, 100);
});
const p1 = new Promise((_, reject) => {
    setTimeout(() => {
    reject(2);
    }, 10);
});
const p2 = new Promise((resolve) => {
    setTimeout(() => {
    reject(3);
    }, 200);
});

const promises = [promise1, promise2, promise3];
const promises2 = [p1, p2];

Promise.myAny([promises2]).then((value) => {
  console.log("value*** :", value);
}).catch((error) => {
    console.log("error :", error);
});


/**
 * --- Interview Context ---
 * Promise.any is very similar to Promise.all, but the resolves and rejects are swapped around.
 * There are a few aspects to this question we need to bear in mind and handle:
 *  - Promises are meant to be chained, so the function needs to return a Promise.
 *  - If the input array is empty, an AggregateError is returned with errors set to an empty array.
 *  - The returned Promise resolved immediately with the first input value that is resolved.
 * The returned Promise is rejected with an AggregateError containing an array of errors values in the same order as the input array if all of them are rejected.
 * The input array can contain non-Promises.
 * 
 * 
 * We'll return a Promise at the top level of the function. We first check if the input array is empty, and reject with an empty AggregateError (new AggregateError([])) if so.
 * We then need to attempt resolving every item in the input array. This can be achieved using Array.prototype.forEach or Array.prototype.map.
 * If any of the items are fulfilled, we resolve the top-level Promise immediately with that value without waiting for any other pending promises.
 * As we encounter rejections, we need to keep them in an errors array in case all the promises turn out to be rejected.
 * As the returned errors will need to preserve the order of the input array, we create an errors array and slot the value in the right place using its index within the input array.
 * To know when all the input array values are no longer pending,
 * we keep track of how many pending promises there are by initializing a counter of pending values and decrementing it whenever a value is rejected. When the counter reaches 0,
 * we can reject with an AggregateError using the errors. There is no need to modify the pending counter when a value is resolved because the overall promise will be resolved.
 * One thing to note here is that because the input array can contain non-Promise values,
 * if we are not await-ing them, we need to wrap each value with Promise.resolve() which allows us to use .then() on each of them and we don't have to differentiate between Promise vs non-Promise values and whether they need to be resolved.
 */

