/** Debounce: delays function execution until after wait ms have elapsed since the last call. */
export function debounce<T extends (...args: any[]) => void>(func: T, wait = 0) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debounced(this: unknown, ...args: Parameters<T>) {
    const context = this;
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      func.apply(context, args);
    }, wait);
  };
}

export default debounce;
