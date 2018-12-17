// linear solution based on BFS (breadth first order traverse)

function traverseAndSetRightLink(root) {
  if (!root) { throw new Error('root param is falsy.'); }

  root.nextSibling = null;
  let firstNodeOnLevel = root;

  while (firstNodeOnLevel) {
    firstNodeOnLevel = traverseNodesOnLevel(firstNodeOnLevel);
  };
}

function traverseNodesOnLevel(firstNodeOnCurrLevel) {
  let firstNodeOnNextLevel = null;
  let parent = firstNodeOnCurrLevel;
  let prevNode = null;
  let currNode = null;

  while (parent) {
    const nodes = [parent.left, parent.right];

    nodes.forEach(node => {
      if (!node) { return; }
      
      currNode = node;
      
      if (!firstNodeOnNextLevel) {
        firstNodeOnNextLevel = currNode;
      }

      if (prevNode) {
        prevNode.nextSibling = currNode;
      }

      prevNode = currNode;
    });

    parent = parent.nextSibling;
  };

  if (currNode) {
    currNode.nextSibling = null;
  }

  return firstNodeOnNextLevel;
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

const tree_3 = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: null,
      right: null,
    },
    right: {
      value: 5,
      left: null,
      right: null,
    },
  },
  right: {
    value: 3,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 7,
      left: null,
      right: null,
    },
  },
};

traverseAndSetRightLink(tree_3);

console.log(tree_3);

const tree_4 = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: null,
      right: null,
    },
    // right: {
    //   value: 5,
    //   left: null,
    //   right: null,
    // },
  },
  right: {
    value: 3,
    // left: {
    //   value: 6,
    //   left: null,
    //   right: null,
    // },
    right: {
      value: 7,
      left: null,
      right: null,
    },
  },
};

traverseAndSetRightLink(tree_4);

console.log(tree_4);
