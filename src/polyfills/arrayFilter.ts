/**
 * Typed polyfill for Array.prototype.filter implemented as myFilter.
 * Matches native behavior: skips holes and validates callback.
 */
export function myFilter<T>(
  array: ArrayLike<T>,
  callbackFn: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any,
): T[] {
  if (typeof callbackFn !== "function") {
    throw new TypeError("callbackFn is not a function");
  }

  const O = Object(array);
  const len = O.length >>> 0;
  const result: T[] = [];

  for (let i = 0; i < len; i++) {
    if (i in O) {
      if (callbackFn.call(thisArg, O[i] as T, i, O as T[])) {
        result.push(O[i] as T);
      }
    }
  }

  return result;
}

declare global {
  interface Array<T> {
    myFilter(callbackFn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
  }
}

if (!Array.prototype.myFilter) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.myFilter = function myFilterPolyfill<T>(
    this: T[],
    callbackFn: (value: T, index: number, array: T[]) => boolean,
    thisArg?: any,
  ): T[] {
    return myFilter(this, callbackFn, thisArg);
  };
}

export default myFilter;
