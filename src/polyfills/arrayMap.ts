/**
 * Typed polyfill for Array.prototype.map implemented as myMap.
 * Mirrors native semantics for holes, thisArg, and callback validation.
 */
export function myMap<T, U>(
  array: ArrayLike<T>,
  callbackFn: (value: T, index: number, array: T[]) => U,
  thisArg?: any,
): U[] {
  if (typeof callbackFn !== "function") {
    throw new TypeError("callbackFn is not a function");
  }

  const O = Object(array);
  const len = O.length >>> 0;
  const A = new Array<U>(len);

  for (let k = 0; k < len; k++) {
    if (k in O) {
      A[k] = callbackFn.call(thisArg, O[k] as T, k, O as T[]);
    }
  }

  return A;
}

declare global {
  interface Array<T> {
    myMap<U>(
      callbackFn: (value: T, index: number, array: T[]) => U,
      thisArg?: any,
    ): U[];
  }
}

if (!Array.prototype.myMap) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.myMap = function myMapPolyfill<T, U>(
    this: T[],
    callbackFn: (value: T, index: number, array: T[]) => U,
    thisArg?: any,
  ): U[] {
    return myMap(this, callbackFn, thisArg);
  };
}

export default myMap;
