/** Throttle: ensures func runs at most once every wait ms. */
export function throttle<T extends (...args: any[]) => void>(func: T, wait = 0) {
  let shouldThrottle = false;

  return function throttled(this: unknown, ...args: Parameters<T>) {
    if (shouldThrottle) return;
    shouldThrottle = true;

    setTimeout(() => {
      shouldThrottle = false;
    }, wait);

    func.apply(this, args);
  };
}

export default throttle;
