/*
A throttled function can be in two states: it's either:

1. Idle: The throttled function was not invoked in the last wait duration.
   Calling the throttled function will immediately execute the callback function without any need to throttle.
   After this happens, the function enters the "Active" state.

2. Active: The throttled function was invoked within the last wait duration.
  Subsequent calls should not execute the callback function until wait is over.

* Given that there's a wait duration before the function can be invoked again,
  we know that we will need a timer, and setTimeout is the first thing that comes to mind.
  Since there are only two states, we can use a boolean variable to model the state.

* We will also need to return a function which contains logic surrounding when to invoke the func.
  This function needs to do a few things:

1. Throttle invocation
* The callback function is invoked immediately and doesn't allow only invocations again until a duration of wait has passed.
  As mentioned earlier, we can use a boolean variable shouldThrottle to model the states.

* When the function is called in the "Idle" state, a few things are done:

1. shouldThrottle is set to true. The function is now in the "Active" state.
2. Invoke func with the appropriate arguments.
3. Use setTimeout to schedule releasing of the lock (shouldThrottle = false) after wait duration.

While the lock is active, calls to the throttled function will not invoke func because of the shouldThrottle check at the top of the function.

2. Invoke func with the appropriate arguments

* Throttled functions are used like the original functions, so we should forward the value of this and function arguments when invoking the original callback functions.
* Invoking the original callback function func has to preserve the reference to this. Therefore:
  - Arrow functions cannot be used to declare the inner function due to lexical binding of this.
  - Invoking the original callback function via func(...args) will not forward the correct this reference and cannot be used.
* Hence we have to use Function.prototype.apply()/Function.prototype.call() which allows us to specify this as the first argument:
  - func.apply(thisArg, args)
  - func.call(thisArg, ...args)

*/

/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait = 0) {
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) {
      return;
    }

    shouldThrottle = true;
    setTimeout(function () {
      shouldThrottle = false;
    }, wait);

    func.apply(this, args);
  };
}

/* 
Note that there are many variations of throttle and this implementation only covers the most common behavior. Some other variations:

1. Have leading and trailing options, including methods to flush and cancel delayed func invocations, like Lodash's _.throttle.
2. Collect all the throttled invocations and spread them out by executing them at every wait intervals in the future,
   respecting the rule that there can only be at most one invocation every wait duration.
   In contrast, this current implementation ignores all throttled function invocations when the lock is active.

Techniques
1. Using setTimeout.
2. Closures.
3. How this works.
4. Invoking functions via Function.prototype.apply()/Function.prototype.call()
*/