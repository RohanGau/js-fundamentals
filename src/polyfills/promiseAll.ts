/** A Promise.all polyfill with order preservation and short-circuit rejection. */
export function promiseAll<T>(iterable: Iterable<T | Promise<T>>): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    const items = Array.from(iterable);
    if (items.length === 0) return resolve([]);

    const results: T[] = new Array(items.length);
    let settled = 0;

    items.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = value;
          settled += 1;
          if (settled === items.length) {
            resolve(results);
          }
        })
        .catch((error) => reject(error));
    });
  });
}

export default promiseAll;
