// we need to return a function can be invoked, we know that we will need a timer, and setTimeout is the first thing that comes to mind

/*
* 1. Debounce invocation
* It invokes the callback function only after a delay of wait. This is performed using setTimeout.
  Since we might need to clear the timer if the debounced function is called again while there's a pending invocation,
  we need to retain a reference to a timeoutID, which is the returned value of setTimeout.

* If the function is called again while there's a pending invocation, we should cancel existing timers and schedule a new timer for the delayed invocation with the full wait duration.
  We can cancel the timer via clearTimeout(timeoutID).

2. Calls the callback function with the right parameters
* Debounced functions are used like the original functions, so we should forward the value of this and function arguments when invoking the original callback functions.
* You may be tempted to use func(...args) but this will be lost if callback functions are invoked that way.
  Hence we have use Function.prototype.apply()/Function.prototype.call() which allows us to specify this as the first argument.
  
  * func.apply(thisArg, args)
  * func.call(thisArg, ...args)
  * 
*/

/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait = 0) {
  let timeoutID = null;
  return function (...args) {
    // Keep a reference to `this` so that
    // func.apply() can access it.
    const context = this;
    clearTimeout(timeoutID);

    timeoutID = setTimeout(function () {
      timeoutID = null; // Not strictly necessary but good to do this.
      func.apply(context, args);
    }, wait);
  };
}


/*

Edge cases
* The main pitfall in this question is invoking the callback function with the correct this,
* the value of this when the debounced function was called. Since the callback function will be invoked in a timeout,
* we need to ensure that the first argument to func.apply()/func.call() is the right value. There are two ways to achieve this:

* Use another variable to keep a reference to this and access this via that variable from within the setTimeout callback.
* This is the traditional way of preserving this before arrow functions existed.
* Use an arrow function to declare the setTimeout callback where the this value within it has lexical scope.
* The value of this within arrow functions is bound to the context in which the function is created,
  not to the environment in which the function is called. 
*/

/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait = 0) {
  let timeoutID = null;
  return function (...args) {
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      timeoutID = null; // Not strictly necessary but good to include.
      // Has the same `this` as the outer function's
      // as it's within an arrow function.
      func.apply(this, args);
    }, wait);
  };
}

/*
 Also, we should not implement the returned function using an arrow function for reasons mentioned above. 
 The this value of the returned function needs to be dynamically determined when executed.

 Notes

 clearTimeout() is a forgiving function and passing an invalid ID to clearTimeout() silently does nothing;
 no exception is thrown. Hence we don't have to check for timeoutID === null before using clearTimeout().
*/