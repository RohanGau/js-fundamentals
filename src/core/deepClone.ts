/**
 * Deep clone common JavaScript values while preserving prototypes and symbol keys.
 * Not intended for DOM nodes / Map / Set (can be extended easily).
 */
export function deepClone<T>(value: T, cache: WeakMap<object, any> = new WeakMap()): T {
  if (typeof value !== "object" || value === null) return value;
  if (typeof value === "function") return value;

  if (cache.has(value as object)) {
    return cache.get(value as object);
  }

  if (value instanceof Date) return new Date(value) as unknown as T;
  if (value instanceof RegExp) return new RegExp(value) as unknown as T;

  if (Array.isArray(value)) {
    const arrCopy = value.map((item) => deepClone(item, cache)) as unknown as T;
    cache.set(value as unknown as object, arrCopy);
    return arrCopy;
  }

  const prototype = Object.getPrototypeOf(value);
  const clonedObj = Object.create(prototype);
  cache.set(value as unknown as object, clonedObj);

  for (const key of Reflect.ownKeys(value)) {
    const desc = Object.getOwnPropertyDescriptor(value, key);
    if (!desc) continue;
    if (desc.get || desc.set) {
      Object.defineProperty(clonedObj, key, desc);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clonedObj[key] = deepClone((value as any)[key], cache);
    }
  }

  return clonedObj;
}

export default deepClone;
