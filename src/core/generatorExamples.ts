// A concise set of generator examples with type safety.

export function* generator(i: number) {
  yield i;
  yield i + 10;
}

export function* idMaker(start = 0) {
  let index = start;
  while (true) {
    yield index++;
  }
}

function* anotherGenerator(i: number) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

export function* generatorWithDelegate(i: number) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

export function* yieldAndReturn() {
  yield "Y" as const;
  return "R" as const;
}

export const customIterable = {
  *[Symbol.iterator]() {
    yield "a" as const;
    yield "b" as const;
    yield "c" as const;
  },
};

