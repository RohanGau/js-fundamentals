/** Demonstrates Promise.all behavior (native) for teaching purposes. */
export async function promiseAllDemo() {
  const p1 = Promise.resolve(3);
  const p2 = 42;
  const p3 = new Promise((resolve) => setTimeout(resolve, 100, "foo"));

  return Promise.all([p1, p2, p3]);
}

export default promiseAllDemo;
