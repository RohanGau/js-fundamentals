/** A Promise.any polyfill returning the first fulfilled value or AggregateError when all reject. */
export function promiseAny<T>(iterable: Iterable<T | Promise<T>>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const items = Array.from(iterable);
    if (items.length === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    const errors = new Array(items.length);
    let pending = items.length;

    items.forEach((item, index) => {
      Promise.resolve(item)
        .then(resolve)
        .catch((err) => {
          errors[index] = err;
          pending -= 1;
          if (pending === 0) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}

export default promiseAny;
