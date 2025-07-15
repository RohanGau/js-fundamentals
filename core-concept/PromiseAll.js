
const promise1 = Promise.resolve(3);
const promsie2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promsie2, promise3]).then((values) => {
    console.log(values);
}).catch((error) => {
    console.error("Error in Promise.all:", error);
});

const p1 = Promise.all([2, 3, 4]);
const p2 = Promise.all([1, 2, 3, Promise.resolve(4)]);
const p3 = Promise.all([1, 2, 3, Promise.reject(new Error("bad"))]);

// Using setTimeout, we can execute code after the queue is empty
setTimeout(() => {
    console.log("p1:", p1);
    console.log("p2:", p2);
    console.log("p3:", p3);
});

// Logs:
// Promise { <state>: "fulfilled", <value>: Array[3] }
// Promise { <state>: "fulfilled", <value>: Array[4] }
// Promise { <state>: "rejected", <reason>: Error: bad }

const resolvePromiseArray = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

// Immediately logging the value of p
const p = Promise.all(resolvePromiseArray);

console.log("p:", p);

// Using setTimeout, we can execute code after the queue is empty
setTimeout(() => {
    console.log("the quweue is empty now");
    console.log(p);
});

// Logs, in order:
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }


const p4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("one"), 1000);
});
const p5 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("two"), 2000);
});
const p6 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("three"), 3000);
});
const p7 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("four"), 4000);
});
const p8 = new Promise((resolve, reject) => {
  reject(new Error("reject"));
});

Promise.all([p4, p5, p6, p7, p8])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.error(error.message);
  });


const p9 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("p9_delayed_resolution"), 1000);
});

const p10 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("p10_immediate_rejection")), 2000);
});

Promise.all([p9.catch(error => error), p10.catch(error => error)]).then((values) => {
    console.log("p9: ", values[0]);
    console.error("p10 ", values[1]);
}).catch((error) => {
    console.error("Error in Promise.all:", error);
});
