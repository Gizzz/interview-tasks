// imperative style solution, uses function level global vars to store the state

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

console.log('findClosestRightSibling - test results:');

/**
 * 1 node: sibling for root (null)
 * 
 *      O
 *    /   \
 *  null  null
 * 
 */
(function test_1() {
  const root = { left: null, right: null };
  const prevNode = root;

  const actual = findClosestRightSibling(prevNode, root);
  const expected = null;

  assertStrictEqual(actual, expected, '1 node: sibling for root (null)');
})();

/**
 * 2 nodes - var 1: sibling for root.left (null)
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
  const prevNode = root.left;

  const actual = findClosestRightSibling(prevNode, root);
  const expected = null;

  assertStrictEqual(actual, expected, '2 nodes - var 1: sibling for root.left (null)');
})();

/**
 * 2 nodes - var 2: sibling for root.right (null)
 * 
 *      O
 *    /   \
 *  null   O
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
  const prevNode = root.right;

  const actual = findClosestRightSibling(prevNode, root);
  const expected = null;

  assertStrictEqual(actual, expected, '2 nodes - var 2: sibling for root.right (null)');
})();

/**
 * 3 nodes - var 1: sibling for root.left (root.right)
 * 
 *      O
 *    /   \
 *   O     O
 * 
 */
(function test_4() {
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

  const actual = findClosestRightSibling(prevNode, root);
  const expected = root.right;

  assertStrictEqual(actual, expected, '3 nodes - var 1: sibling for root.left (root.right)');
})();

/**
 * 4 nodes - var 1: sibling for root.left.left (null)
 * 
 *        O
 *      /  \
 *     O    O
 *   /
 *  O
 * 
 */
(function test_5() {
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

  const actual = findClosestRightSibling(prevNode, root);
  const expected = null;

  assertStrictEqual(actual, expected, '4 nodes - var 1: sibling for root.left.left (null)');
})();

/**
 * 5 nodes - var 1: sibling for root.left.left (root.left.right)
 * 
 *        O
 *      /  \
 *     O    O
 *   /  \     
 *  O    O     
 * 
 */
(function test_6() {
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
      left: null,
      right: null,
    },
  };
  const prevNode = root.left.left;

  const actual = findClosestRightSibling(prevNode, root);
  const expected = root.left.right;

  assertStrictEqual(actual, expected, '5 nodes - var 1: sibling for root.left.left (root.left.right)');
})();

/**
 * 5 nodes - var 2: sibling for root.left.left (root.right.left)
 * 
 *        O
 *      /   \
 *     O     O
 *   /     /   
 *  O     O     
 * 
 */
(function test_7() {
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
  const prevNode = root.left.left;

  const actual = findClosestRightSibling(prevNode, root);
  const expected = root.right.left;

  assertStrictEqual(actual, expected, '5 nodes - var 2: sibling for root.left.left (root.right.left)');
})();

/**
 * 5 nodes - var 3: sibling for root.left.left (root.right.right)
 * 
 *        O
 *      /  \
 *     O    O
 *   /       \
 *  O         O
 * 
 */
(function test_8() {
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
  const prevNode = root.left.left;

  const actual = findClosestRightSibling(prevNode, root);
  const expected = root.right.right;

  assertStrictEqual(actual, expected, '5 nodes - var 3: sibling for root.left.left (root.right.right)');
})();

// test helpers

function assertStrictEqual(actual, expected, text) {
  if (actual === expected) {
    console.log('✔️ ' + text);
  } else {
    console.warn('❌ ' + text);
  }
}
