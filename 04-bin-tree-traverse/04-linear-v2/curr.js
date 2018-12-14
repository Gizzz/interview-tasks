function traverseAndSetRightLink(root) {
  if (!root) { throw new Error('root param is falsy.'); }

  root.nextSibling = null;

  // if (root.left && root.right) {
  //   root.left.nextSibling = root.right;
  // }

  // if (root.right) {
  //   root.right.nextSibling = null;
  // }

  // let firstNodeOnLevel = root.left ? root.left : root.right;

  // if (!firstNodeOnLevel) { return; }

  // let currNode = firstNodeOnLevel;

  // while (currNode.nextSibling) {

  // }

  let parent = root;
  let currNode = root.left ? root.left : root.right;
  
  if (currNode === parent.left && parent.right !== null) {
    currNode.nextSibling = parent.right;
  }

  
}

// ===========================================================================
// tests
// ===========================================================================

const tree_1 = {
  value: 1,
  left: null,
  right: null,
};

traverseAndSetRightLink(tree_1);

console.log(tree_1);

const tree_2 = {
  value: 1,
  left: {
    value: 2,
    left: null,
    right: null,
  },
  right: {
    value: 3,
    left: null,
    right: null,
  },
};

traverseAndSetRightLink(tree_2);

console.log(tree_2);
