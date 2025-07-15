/*
* Element.classList which returns a live DOMTokenList of class attributes of the element.
* This is preferred over className because className is a string and needs to be manually parsed.
* Element.children which returns a live HTMLCollection of the child elements.
* We use this over Node.childNodes which returns a live NodeList of child Nodes because childNodes will include non-element nodes like text and comment nodes, which are not relevant in this question.
* However HTMLCollection does not have .forEach, so we have to iterate through it using traditional for loops.

* For the class name to match, they have to be a subset of the classList of an element.
* The matching is also case-sensitive and duplicate class names (in both the input and on the elements) do not matter.

* We can maintain an elements array to collect the matching elements while recursively traversing the root element.
* A depth-first traversal is performed.
*/


function getElementsByClassName(el, classNames) {
    const result = [];

    if(classNames && classNames === "") return result;

    function traverse(node) {
        const classNamesArr = classNames.split(" ").filter((item) => item !== "");
        const allPresent = classNamesArr.every(item => node.className.split(" ").includes(item));
        if(allPresent) {
            result.push(node)
        }
        for (let child of node.children) {
            traverse(child);
        }
    }
    traverse(el);
    return result;
}

const doc = new DOMParser().parseFromString(
      `<div>
        <!-- Here's a comment -->
        <div>Hello</div>
      </div>`,
      'text/html',
    );

const divs = getElementsByClassName(doc.body, 'div');
const expected = doc.body.getElementsByClassName('div');

console.log("divs :", divs);
console.log("expected :", expected);