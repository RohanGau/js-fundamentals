/**
 * Typed polyfill for Array.prototype.reduce implemented as myReduce.
 * Handles holes and missing initialValue per the ECMAScript spec.
 */
export function myReduce<T, U>(
  array: ArrayLike<T>,
  callbackFn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
  initialValue?: U,
): U {
  if (typeof callbackFn !== "function") {
    throw new TypeError("callbackFn is not a function");
  }

  const O = Object(array);
  const len = O.length >>> 0;

  let k = 0;
  let accumulator: U;

  if (arguments.length >= 3) {
    accumulator = initialValue as U;
  } else {
    let found = false;
    while (k < len && !found) {
      if (k in O) {
        accumulator = O[k] as unknown as U;
        found = true;
      }
      k++;
    }
    if (!found) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
  }

  for (; k < len; k++) {
    if (k in O) {
      accumulator = callbackFn(accumulator!, O[k] as T, k, O as T[]);
    }
  }

  return accumulator!;
}

declare global {
  interface Array<T> {
    myReduce<U>(
      callbackFn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
      initialValue?: U,
    ): U;
  }
}

if (!Array.prototype.myReduce) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.myReduce = function myReducePolyfill<T, U>(
    this: T[],
    callbackFn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
    initialValue?: U,
  ): U {
    return myReduce(this, callbackFn, initialValue as U);
  };
}

export default myReduce;
