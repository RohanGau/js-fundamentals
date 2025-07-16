/**
 * --- Interview Context ---
 * 
 * This file demonstrates JavaScript generator functions and their use cases.
 * 
 * Key Points to Discuss in Interviews:
 * 
 * 1. **What is a Generator Function?**
 *    - A generator function is declared with `function*` syntax.
 *    - It can pause execution (`yield`) and resume later, maintaining its context.
 *    - Returns an iterator object with a `.next()` method.
 * 
 * 2. **Why Use Generators?**
 *    - **Lazy Evaluation:** Values are produced on demand, not all at once.
 *    - **Memory Efficiency:** Useful for large or infinite sequences (e.g., `idMaker`).
 *    - **Custom Iteration:** Enables custom iteration logic, including infinite or complex sequences.
 *    - **Control Flow:** Can simplify asynchronous or step-wise logic.
 * 
 * 3. **Yield and Return:**
 *    - `yield` pauses the function and returns a value.
 *    - `return` ends the generator and can return a final value (as `{ value, done: true }`).
 *    - Code after `return` is unreachable.
 * 
 * 4. **Delegating with `yield*`:**
 *    - `yield*` delegates to another generator or iterable, flattening nested generators.
 * 
 * 5. **Custom Iterables:**
 *    - Objects can define `[Symbol.iterator]` as a generator for easy iteration with `for...of`.
 * 
 * --- Usage Examples in This File ---
 * 
 * - `generator(i)`: Yields `i` and `i + 10`.
 * - `idMaker()`: Infinite sequence generator for unique IDs.
 * - `generator2(i)`: Demonstrates `yield*` to delegate to another generator.
 * - `yieldAndReturn()`: Shows difference between `yield` and `return` in generators.
 * - `createOwnIterable`: Custom iterable object using a generator for `[Symbol.iterator]`.
 * 
 * --- Interview Tip ---
 * Use these examples to show your understanding of:
 * - Iterators and iterable protocol
 * - Generator syntax and control flow
 * - Real-world use cases (lazy evaluation, custom iteration, infinite sequences)
 * - How generators can simplify complex iteration logic
 */

function* generator(i) {
    yield i;
    yield i + 10;
}

const gen = generator(10);

// console.log(gen.next().value);
// console.log(gen.next().value);

function* idMaker() {
    let index = 0;
    while(true) {
        yield index++;
    }
}

const gen1= idMaker();
// console.log(gen1.next().value);
// console.log(gen1.next().value);
// console.log(gen1.next().value);
// console.log(gen1.next().value);
// console.log(gen1.next().value);

function* anotherGenerator(i) {
    yield i + 1;
    yield i + 2;
    yield i + 3;
}

function* generator2(i) {
    yield i;
    yield* anotherGenerator(i);
    yield i + 10;
}

const gen2 = generator2(10);

function* yieldAndReturn() {
  yield "Y";
  return "R";
  yield "unreachable";
}

const gen3 = yieldAndReturn();
console.log(gen3.next()); // { value: "Y", done: false }
console.log(gen3.next()); // { value: "R", done: true }
console.log(gen3.next());


let createOwnIterable = {
  *[Symbol.iterator]() {
    yield 'a';
    yield 'b';
    yield 'c';
  }
}

for(let value of createOwnIterable) {
  console.log(value);
}