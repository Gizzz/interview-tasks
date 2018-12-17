function swapRev(arr) {
  /**
   * returns is_swappable ? 'swap startIdx endIdx' :
   *  is_reversable ? 'rev startIdx endIdx' :
   *    'impossible';
   */

  if (arr.length < 2) {
    throw new Error('arr.length should be >= 2');
  }

  if (isArraySorted(arr)) {
    return 'sorted';
  }

  let unsortedItemsCount = 0;
  let firstUnsortedItemIdx = null;
  let secondUnsortedItemIdx = null;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      unsortedItemsCount += 1;

      if (firstUnsortedItemIdx === null) {
        firstUnsortedItemIdx = i - 1;
      } else if (secondUnsortedItemIdx === null) {
        secondUnsortedItemIdx = i - 1;
      }
    }
  }

  // todo: try rev
  if (unsortedItemsCount > 2) {
    return 'impossible';
  }
}

function isArraySorted(arr) {
  let isSorted = true;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      isSorted = false;
      break;
    }
  }

  return isSorted;
}

// ===========================================================================
// tests
// ===========================================================================

(function test_1() {
  const actual = swapRev([1, 2]);
  const expected = 'sorted';
  assertStrictEqual(actual, expected, '[1, 2] -> sorted');
})();

(function test_2() {
  const actual = swapRev([2, 1]);
  const expected = 'swap 0 1';
  assertStrictEqual(actual, expected, '[2, 1] -> swap 0 1');
})();

// test helpers

function assertStrictEqual(actual, expected, text) {
  if (actual === expected) {
    console.log('✔️ ' + text);
  } else {
    console.warn('❌ ' + text);
  }
}