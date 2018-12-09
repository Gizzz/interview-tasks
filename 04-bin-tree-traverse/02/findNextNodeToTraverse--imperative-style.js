// imperative style solution, uses function level global var to store the state

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

// ===========================================================================
// tests
// ===========================================================================

console.log('findNextNodeToTraverse - test results:');

/**
 * 1 node: next node from root
 * 
 *      O
 *    /   \
 *  null  null
 * 
 */
(function test_1() {
  const root = { left: null, right: null };
  const prevNode = root;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = null;

  if (actual === expected) {
    console.log('✔️ 1 node: next node from root');
  } else {
    console.warn('❌ only root');
  }
})();

/**
 * 2 nodes: next node from root (left)
 * 
 *      O
 *    /   \
 *   O   null
 * 
 */
(function test_2() {
  const root = {
    left: {
      left: null,
      right: null,
    },
    right: null,
  };
  const prevNode = root;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = root.left;

  if (actual === expected) {
    console.log('✔️ 2 nodes: next node from root (left)');
  } else {
    console.warn('❌ 2 nodes: next node from root (left)');
  }
})();

/**
 * 2 nodes: next node from root (right)
 * 
 *      O
 *    /  \
 *  null  O
 * 
 */
(function test_3() {
  const root = {
    left: null,
    right: {
      left: null,
      right: null,
    },
  };
  const prevNode = root;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = root.right;

  if (actual === expected) {
    console.log('✔️ 2 nodes: next node from root (right)');
  } else {
    console.warn('❌ 2 nodes: next node from root (right)');
  }
})();

/**
 * 2 nodes: next node from root.left (null)
 * 
 *      O
 *    /   \
 *   O   null
 * 
 */
(function test_4() {
  const root = {
    left: {
      left: null,
      right: null,
    },
    right: null,
  };
  const prevNode = root.left;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = null;

  if (actual === expected) {
    console.log('✔️ 2 nodes: next node from root.left (null)');
  } else {
    console.warn('❌ 2 nodes: next node from root.left (null)');
  }
})();

/**
 * 2 nodes: next node from root.right (null)
 * 
 *      O
 *    /  \
 *  null  O
 * 
 */
(function test_5() {
  const root = {
    left: null,
    right: {
      left: null,
      right: null,
    },
  };
  const prevNode = root.right;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = null;

  if (actual === expected) {
    console.log('✔️ 2 nodes: next node from root.right (null)');
  } else {
    console.warn('❌ 2 nodes: next node from root.right (null)');
  }
})();

/**
 * 3 nodes: next node from root (root.left)
 * 
 *      O
 *    /  \
 *   O    O
 * 
 */
(function test_6() {
  const root = {
    left: {
      left: null,
      right: null,
    },
    right: {
      left: null,
      right: null,
    },
  };
  const prevNode = root;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = root.left;

  if (actual === expected) {
    console.log('✔️ 3 nodes: next node from root (root.left)');
  } else {
    console.warn('❌ 3 nodes: next node from root (root.left)');
  }
})();

/**
 * 3 nodes: next node from root.left (root.right)
 * 
 *      O
 *    /  \
 *   O    O
 * 
 */
(function test_7() {
  const root = {
    left: {
      left: null,
      right: null,
    },
    right: {
      left: null,
      right: null,
    },
  };
  const prevNode = root.left;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = root.right;

  if (actual === expected) {
    console.log('✔️ 3 nodes: next node from root.left (root.right)');
  } else {
    console.warn('❌ 3 nodes: next node from root.left (root.right)');
  }
})();

/**
 * 3 nodes: next node from root.right (null)
 * 
 *      O
 *    /  \
 *   O    O
 * 
 */
(function test_8() {
  const root = {
    left: {
      left: null,
      right: null,
    },
    right: {
      left: null,
      right: null,
    },
  };
  const prevNode = root.right;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = null;

  if (actual === expected) {
    console.log('✔️ 3 nodes: next node from root.right (null)');
  } else {
    console.warn('❌ 3 nodes: next node from root.right (null)');
  }
})();

/**
 * 3 nodes - var 2: next node from root.left (root.left.left)
 * 
 *        O
 *      /
 *     O
 *   /
 *  O
 * 
 */
(function test_9() {
  const root = {
    left: {
      left: {
        left: null,
        right: null,
      },
      right: null,
    },
    right: null,
  };
  const prevNode = root.left;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = root.left.left;

  if (actual === expected) {
    console.log('✔️ 3 nodes - var 2: next node from root.left (root.left.left)');
  } else {
    console.warn('❌ 3 nodes - var 2: next node from root.left (root.left.left)');
  }
})();

/**
 * 3 nodes - var 3: next node from root.left (root.left.right)
 * 
 *        O
 *      /
 *     O
 *      \
 *       O
 * 
 */
(function test_10() {
  const root = {
    left: {
      left: null,
      right: {
        left: null,
        right: null,
      },
    },
    right: null,
  };
  const prevNode = root.left;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = root.left.right;

  assertStrictEqual(actual, expected, '3 nodes - var 3: next node from root.left (root.left.right)');
})();

/**
 * 4 nodes - var 1: next node from root.left.left (root.right)
 * 
 *        O
 *      /  \
 *     O    O
 *   /
 *  O
 * 
 */
(function test_11() {
  const root = {
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
  const prevNode = root.left.left;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = root.right;

  assertStrictEqual(actual, expected, '4 nodes - var 1: next node from root.left.left (root.right)');
})();

/**
 * 5 nodes - var 1: next node from root.left.left (root.right)
 * 
 *        O
 *      /  \
 *     O    O
 *   /    /
 *  O    O
 * 
 */
(function test_12() {
  const root = {
    left: {
      left: {
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      left: {
        left: null,
        right: null,
      },
      right: null,
    },
  };
  const prevNode = root.right;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = root.right.left;

  assertStrictEqual(actual, expected, '5 nodes - var 1: next node from root.left.left (root.right)');
})();

// test helpers

function assertStrictEqual(actual, expected, text) {
  if (actual === expected) {
    console.log('✔️ ' + text);
  } else {
    console.warn('❌ ' + text);
  }
}

/**
 * 5 nodes - var 2: next node from root.right (root.right.right)
 * 
 *        O
 *      /  \
 *     O    O
 *   /       \
 *  O         O
 * 
 */
(function test_13() {
  const root = {
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
  const prevNode = root.right;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = root.right.right;

  assertStrictEqual(actual, expected, '5 nodes - var 2: next node from root.right (root.right.right)');
})();

// test helpers

function assertStrictEqual(actual, expected, text) {
  if (actual === expected) {
    console.log('✔️ ' + text);
  } else {
    console.warn('❌ ' + text);
  }
}

/**
 * 7 nodes - var 1: next node from root.right.left (root.right.right)
 * 
 *         O  
 *      /     \
 *     O       O
 *   /  \    /  \
 *  O    O  O    O
 * 
 */
(function test_14() {
  const root = {
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
  const prevNode = root.right.left;

  const actual = findNextNodeToTraverse(prevNode, root);
  const expected = root.right.right;

  assertStrictEqual(actual, expected, '7 nodes - var 1: next node from root.right.left (root.right.right)');
})();

// test helpers

function assertStrictEqual(actual, expected, text) {
  if (actual === expected) {
    console.log('✔️ ' + text);
  } else {
    console.warn('❌ ' + text);
  }
}
