// depth-first approach (complete solution - sets ref for node if there is any child on right side at same level)
function traverseAndSetRefs(root) {
  if (!root) { throw new Error('`root` param is required.'); }

  root.closestRightSibling = null;
  let nextNode = root.left
    ? root.left
    : root.right;

  while (nextNode) {
    const sibling = findClosestRightSibling(nextNode, root);

    nextNode.closestRightSibling = sibling ? sibling : null;

    nextNode = findNextNodeToTraverse(nextNode, root)
  }
}

function findNextNodeToTraverse(prevNode, root) {
  if (!prevNode || !root) { throw new Error('`prevNode` and `root` params are required.'); }

  let isPrevNodeFound = false;

  function findNextNodeToTraverse_inner(prevNode, currNode) {
    if (!prevNode || !currNode) { throw new Error('`prevNode` and `currNode` params are required.'); }
  
    if (isPrevNodeFound) {
      return currNode;
    }
  
    if (currNode === prevNode) {
      isPrevNodeFound = true;
    }
  
    if (currNode.left) {
      const nextNode = findNextNodeToTraverse_inner(prevNode, currNode.left);
      if (nextNode) { return nextNode; }
    }
  
    if (currNode.right) {
      const nextNode = findNextNodeToTraverse_inner(prevNode, currNode.right);
      if (nextNode) { return nextNode; }
    }
  
    return null;
  }

  const nextNode = findNextNodeToTraverse_inner(prevNode, root);
  return nextNode;
}

function findClosestRightSibling(prevNode, root) {
  if (!prevNode || !root) {
    throw new Error('`prevNode` and `root` params are required.');
  }

  let isPrevNodeFound = false;
  let prevNodeDepth = null;

  function findClosestRightSibling_inner(prevNode, currNode, depth) {
    if (!prevNode || !currNode || !depth) {
      throw new Error('`prevNode` and `currNode` and `depth` params are required.');
    }
  
    if (isPrevNodeFound && prevNodeDepth === depth) {
      return currNode;
    }
  
    if (currNode === prevNode) {
      isPrevNodeFound = true;
      prevNodeDepth = depth;
    }
  
    if (currNode.left) {
      const sibling = findClosestRightSibling_inner(prevNode, currNode.left, depth + 1);
      if (sibling) { return sibling; }
    }
  
    if (currNode.right) {
      const sibling = findClosestRightSibling_inner(prevNode, currNode.right, depth + 1);
      if (sibling) { return sibling; }
    }
  
    return null;
  }

  const sibling = findClosestRightSibling_inner(prevNode, root, 1);
  return sibling;
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
 * 5 nodes - variant 2
 * 
 *        O
 *      /  \
 *     O    O
 *   /       \
 *  O         O
 * 
 */
(function test_5_2() {
  const right_right = {
    left: null,
    right: null,
    closestRightSibling: null,
  };

  const right = {
    left: null,
    right: right_right,
    closestRightSibling: null,
  };

  const left = {
    closestRightSibling: right,
    left: {
      left: null,
      right: null,
      closestRightSibling: right_right,
    },
    right: null,
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
      right: null,
    },
    right: {
      left: null,
      right: {
        left: null,
        right: null,
      },
    },
  };

  traverseAndSetRefs(actual);
  assertShapeEquality(actual, expected, '5 nodes - variant 2');
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

/**
 * 7 nodes - variant 1
 * 
 *         O
 *      /     \
 *     O       O
 *   /  \    /  \
 *  O    O  O    O
 * 
 */
(function test_8() {
  const right_right = {
    left: null,
    right: null,
    closestRightSibling: null,
  };

  const right_left = {
    left: null,
    right: null,
    closestRightSibling: right_right,
  };

  const right = {
    left: right_left,
    right: right_right,
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
      right: {
        left: null,
        right: null,
      },
    },
  };

  traverseAndSetRefs(actual);
  assertShapeEquality(actual, expected, '7 nodes - variant 1')
})();

// test helpers

function assertShapeEquality(actual, expected, text) {
  if (_.isEqual(actual, expected)) {
    console.log('✔️ ' + text);
  } else {
    console.warn('❌ ' + text);
  }
}
