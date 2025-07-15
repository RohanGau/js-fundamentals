/*
* Clarification questions
* Do we have to support the tagName = '*' case?
*    No, not for this question.
* Will the tag name argument be all lower case?
*   Not necessarily. E.g. document.getElementsByTagName(element, 'Div') is valid.

* Element.tagName which returns an uppercase string of an element's tag name (e.g. 'DIV', 'SPAN').
* Element.children which returns a live HTMLCollection of the child elements.
  We use this over Node.childNodes which returns a live NodeList of child Nodes because childNodes will include non-element nodes like text and comment nodes, which are not relevant in this question.
* However HTMLCollection does not have .forEach, so we have to iterate through it using traditional for loops.
* We can maintain an elements array to collect the matching elements while recursively traversing the root element.
  A depth-first traversal is performed.

  Remember that the element argument itself is not included in the results.

Edge cases
* Element argument is not included in the results even if it matches the tag name.
* Non-lowercase tag name arguments.

Techniques
* Recursion
* DOM APIs
   * How to check an Element's tag name
   * How to traverse an Element's children
*/

function getElementsByTagName(el, tagName) {
    const result = [];
    tagName = tagName.toLowerCase();

    if(tagName === "body") return result;

    function traverse(node) {
        if (node.tagName && node.tagName.toLowerCase() === tagName) {
            result.push(node);
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

const divs = getElementsByTagName(doc.body, 'div');
const expected = doc.body.getElementsByTagName('div');

console.log("divs :", divs);
console.log("expected :", expected);