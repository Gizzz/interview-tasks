// // depth-first approach (limited solution - sets ref only if node is left child and its parent has right child)
// // mutative solution
// function traverseAndSetRefs(node, parent = null) {
//   if (!node) { return; }

//   node.closestRightSibling = parent && parent.right && node !== parent.right
//     ? parent.right
//     : null;
  
//   if (node.left) {
//     traverseAndSetRefs(node.left, node);
//   }

//   if (node.right) {
//     traverseAndSetRefs(node.right, node);
//   }
// }

// breadth-first approach
function traverseAndSetRefs(root) {
  if (!root) { throw new Error('`root` param is required.'); }

  root.closestRightSibling = null;
  let nextNode = root.left
    ? root.left
    : root.right;

  while (nextNode) {
    const sibling = findClosestRightSibling(root, nextNode);

    nextNode.closestRightSibling = sibling ? sibling : null;

    nextNode = findNextNodeToTraverse(nextNode, root)
  }
}

function findNextNodeToTraverse(prevNode, root) {
  if (!prevNode || !root) { throw new Error('`prevNode` and `root` params are required.'); }

  const [ _, nextNode] = findNextNodeToTraverse_inner(prevNode, root, false);
  return nextNode;
}

function findNextNodeToTraverse_inner(prevNode, currNode, isPrevNodeFound = false) {
  if (!prevNode || !currNode) { throw new Error('`prevNode` and `currNode` params are required.'); }

  if (isPrevNodeFound) {
    return [true, currNode]
  }

  let isPrevNodeFound_local = isPrevNodeFound;
  if (currNode === prevNode) {
    isPrevNodeFound_local = true;
  }

  if (currNode.left) {
    const [isPrevNodeFound_result, nextNode] = findNextNodeToTraverse_inner(prevNode, currNode.left, isPrevNodeFound_local);
    if (isPrevNodeFound_result && nextNode) {
      return [true, nextNode];
    } else {
      isPrevNodeFound_local = isPrevNodeFound_result;
    }
  }

  if (currNode.right) {
    const [isPrevNodeFound_result, nextNode] = findNextNodeToTraverse_inner(prevNode, currNode.right, isPrevNodeFound_local);
    if (isPrevNodeFound_result && nextNode) {
      return [true, nextNode];
    } else {
      isPrevNodeFound_local = isPrevNodeFound_result;
    }
  }

  return [isPrevNodeFound_local, null];
}

// ===========================================================================
// tests
// ===========================================================================

console.log('curr - test results:');

/**
 * only root:
 * 
 *      O
 *    /   \
 *  null  null
 * 
 */
(function test_1() {
  const expected = {
    left: null,
    right: null,
    closestRightSibling: null,
  };

  const actual = { left: null, right: null };
  traverseAndSetRefs(actual);

  if (_.isEqual(actual, expected)) {
    console.log('✔️ only root');
  } else {
    console.warn('❌ only root');
  }
})();

/**
 * 2 nodes - root with left:
 * 
 *      O
 *    /  \
 *   O  null
 * 
 */
(function test_2() {
  const expected = {
    closestRightSibling: null,
    left: {
      closestRightSibling: null,
      left: null,
      right: null,
    },
    right: null,
  };

  const actual = {
    left: {
      left: null,
      right: null,
    },
    right: null,
  };

  traverseAndSetRefs(actual);
  if (_.isEqual(actual, expected)) {
    console.log('✔️ root with left');
  } else {
    console.warn('❌ root with left');
  }
})();

/**
 * 2 nodes - root with right:
 * 
 *      O
 *    /  \
 *  null  O
 * 
 */
(function test_3() {
  const expected = {
    closestRightSibling: null,
    left: null,
    right: {
      closestRightSibling: null,
      left: null,
      right: null,
    },
  };

  const actual = {
    left: null,
    right: {
      left: null,
      right: null,
    },
  };

  traverseAndSetRefs(actual);
  if (_.isEqual(actual, expected)) {
    console.log('✔️ root with right');
  } else {
    console.warn('❌ root with right');
  }
})();

/**
 * 3 nodes - root with left and right:
 * 
 *      O
 *    /  \
 *   O    O
 * 
 */
(function test_4() {
  const right = {
    left: null,
    right: null,
    closestRightSibling: null,
  };
  const left = {
    closestRightSibling: right,
    left: null,
    right: null,
  }

  const expected = {
    closestRightSibling: null,
    left,
    right,
  };

  const actual = {
    left: {
      left: null,
      right: null,
    },
    right: {
      left: null,
      right: null,
    },
  };

  traverseAndSetRefs(actual);
  if (_.isEqual(actual, expected)) {
    console.log('✔️ root with left and right');
  } else {
    console.warn('❌ root with left and right');
  }
})();

/**
 * 4 nodes - variant 1:
 * 
 *        O
 *      /  \
 *     O    O
 *   /
 *  O
 * 
 */
(function test_5() {
  const right = {
    left: null,
    right: null,
    closestRightSibling: null,
  };

  const left = {
    closestRightSibling: right,
    left: {
      left: null,
      right: null,
      closestRightSibling: null,
    },
    right: null,
  };

  const expected = {
    closestRightSibling: null,
    left,
    right,
  };

  const actual = {
    left: {
      left: {
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      left: null,
      right: null,
    },
  };

  traverseAndSetRefs(actual);
  if (_.isEqual(actual, expected)) {
    console.log('✔️ 4 nodes - variant 1');
  } else {
    console.warn('❌ 4 nodes - variant 1');
  }
})();

/**
 * 5 nodes - variant 1:
 * 
 *        O
 *      /  \
 *     O    O
 *   /  \
 *  O    O
 * 
 */
(function test_6() {
  const right_1 = {
    left: null,
    right: null,
    closestRightSibling: null,
  };

  const right_2 = {
    left: null,
    right: null,
    closestRightSibling: null,
  };

  const left_1 = {
    closestRightSibling: right_1,
    left: {
      left: null,
      right: null,
      closestRightSibling: right_2,
    },
    right: right_2,
  };

  const expected = {
    closestRightSibling: null,
    left: left_1,
    right: right_1,
  };

  const actual = {
    left: {
      left: {
        left: null,
        right: null,
      },
      right: {
        left: null,
        right: null,
      },
    },
    right: {
      left: null,
      right: null,
    },
  };

  traverseAndSetRefs(actual);
  if (_.isEqual(actual, expected)) {
    console.log('✔️ 5 nodes - variant 1');
  } else {
    console.warn('❌ 5 nodes - variant 1');
  }
})();

/**
 * 6 nodes - variant 1:
 * 
 *         O
 *      /     \
 *     O       O
 *   /  \    /
 *  O    O  O
 * 
 */
(function test_7() {
  const right_left = {
    left: null,
    right: null,
    closestRightSibling: null,
  };

  const right = {
    left: right_left,
    right: null,
    closestRightSibling: null,
  };

  const left_right = {
    left: null,
    right: null,
    closestRightSibling: right_left,
  };

  const left = {
    closestRightSibling: right,
    left: {
      left: null,
      right: null,
      closestRightSibling: left_right,
    },
    right: left_right,
  };

  const expected = {
    closestRightSibling: null,
    left: left,
    right: right,
  };

  const actual = {
    left: {
      left: {
        left: null,
        right: null,
      },
      right: {
        left: null,
        right: null,
      },
    },
    right: {
      left: {
        left: null,
        right: null,
      },
      right: null,
    },
  };

  traverseAndSetRefs(actual);
  if (_.isEqual(actual, expected)) {
    console.log('✔️ 6 nodes - variant 1');
  } else {
    console.warn('❌ 6 nodes - variant 1');
  }
})();
