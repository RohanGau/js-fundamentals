/** Curry a function by accumulating arguments until arity is reached. */
export function curry<T extends (...args: any[]) => any>(func: T) {
  return function curried(this: unknown, ...args: any[]): any {
    if (args.length >= func.length) {
      return func.apply(this, args as Parameters<T>);
    }
    return (...rest: any[]) => curried.apply(this, [...args, ...rest]);
  };
}

export default curry;
