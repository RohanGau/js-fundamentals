/*
The following are good questions to ask the interviewer to demonstrate your thoughtfulness. Depending on their response,
you might need to adjust the implementation accordingly.

If a class is turned off within a nested array, will it be turned off overall?

It depends on the position that the classes within the input, regardless of nested level. Classes that appear later will take precedence.

Solution
- The tricky part of this solution is the recursive nature of the function. Hence we can separate out the solution into two parts:

1. Handling of each data type.
2. Recursing for array type.
3. Because the final result should only contain unique classnames and we need to turn classes on/off as we process each argument,
 we need a data structure that handles uniqueness; Sets come to mind.

Classes that appear later will take precedence, regardless of nested level. This means that a pure recursive approach will not work as we need to know what classes exist in the classes that have been processed so far. We'll use the approach where an inner recursive helper modifies the external classes set. The inner recursive helper does not return anything, it's main purpose is to process each argument and add them to classes.

Here's how we will handle each data type:

1. Falsey values: Ignore.
2. String: Add it to the classes set.
3. Number: Add it to the classes set.
4. Array: Recursively invoke the classNames function or inner recursive function.
5. Function: Invoke the value and add it to classes if it's truthy.
6. Object: Loop through the key/value pairs. If the value is truthy, add it the classes set. Otherwise, delete it from the classes set.

*/


function classNames(...args) {
  const set = new Set();
  function traverse(arr) {
    console.log("arr :", arr);
    for(let item of arr) {
      if(Array.isArray(item)) {
        traverse(item)
      } else if(item && typeof item === 'object') {
        for(let key in item) {
            if(item[key]) {
                set.add(key)
            } else {
                set.delete(key);
            }
        }
      } else if(item && typeof item === 'function') {
        const res = item();
        if(res) {
            set.add(res.toString());
        }
      } else if(item && item !== "") {
        set.add(item);
      }
    }
  }
  traverse(args);
  console.log("set :", set);
  return [...set].join(" ");
}

const result = classNames(['foo', 'bar', 'baz']);
console.log("result :", result);

/*
Techniques
    Familiar with JavaScript value types and how to check for them
    Recursion
    Conversion of Sets to Arrays
    Handling of variadic arguments

Notes
 - typeof [] gives 'object', so you need to handle arrays before objects.
 - You are probably not expected to handle these scenario, but you should mention them:
 - Possibility of stack overflow. This applies to any recursive solution.
 - Possibility of circular references for arrays and objects. This applies to any input which has arbitrary depth.
*/