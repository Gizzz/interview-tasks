function traverseAndSetRightLink(tree) {
  if (!tree) { throw new Error('`tree` param is falsy.') }
  
  const levelsWithNodes = [];

  function traverseAndCollectNodes(node, depth = 0) {
    if (!node) { throw new Error('`node` param is falsy.') }

    if (!levelsWithNodes[depth]) {
      levelsWithNodes[depth] = [];
    }

    levelsWithNodes[depth].push(node);

    if (node.left) {
      traverseAndCollectNodes(node.left, depth + 1);
    }

    if (node.right) {
      traverseAndCollectNodes(node.right, depth + 1);
    }
  }

  traverseAndCollectNodes(tree);

  for (let i = 0; i < levelsWithNodes.length; i++) {
    const nodesOnLevel = levelsWithNodes[i];

    for (let j = 0; j < nodesOnLevel.length; j++) {
      const node = nodesOnLevel[j];
      const nextNode = nodesOnLevel[j + 1];
      node.nextRightSibling = nextNode ? nextNode : null;
    }
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
