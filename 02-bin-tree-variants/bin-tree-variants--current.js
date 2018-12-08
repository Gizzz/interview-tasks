/**
 * imperative with nested loops
 * 
 * current improvements
 * - use array instead of object for better cache lookups (improves time roughly 2x)
 * - pre-populate cache with trivial cases
 * 
 * ideas:
 * - tree structure is symmectic, it could potentially reduce calculations by half
 */

// const cache = {
//   '0': 1,
//   '1': 1,
//   '2': 2,
// };

const cache = [1, 1, 2]

function calcVars(n) {
  if (n < 0) { throw new Error('the "n" param should not be negative'); }

  let lastSum = 0;
  for (let i = 0; i <= n; i++) {
    lastSum = calcTree(i);
  }

  return lastSum;
}

function calcTree(n) {
  if (cache[n] !== undefined) {
    return cache[n];
  }

  let totalVariants = 0;
  for (let i = 0; i < n; i++) {
    const leftTreeVariants = cache[n - 1 - i];
    const rightTreeVariants = cache[i];

    totalVariants = totalVariants + leftTreeVariants * rightTreeVariants;
  }

  cache[n] = totalVariants;
  return totalVariants;
}

// tests

// console.log('n = 0 is 1: ', calcVars(0));
// console.log('n = 1 is 1: ', calcVars(1));
// console.log('n = 2 is 2: ', calcVars(2));
// console.log('n = 3 is 5: ', calcVars(3));
// console.log('n = 4 is 14: ', calcVars(4));
// console.log('n = 5 is 42: ', calcVars(5));
// console.log('n = 6 is 132: ', calcVars(6));

// perf

var t0 = performance.now();
const res = calcVars(51200);
var t1 = performance.now();
console.log("Result is " + res + ".");
console.log("Time is " + (t1 - t0) + " milliseconds.");

/**
 * (Prev results) imperative with nested loops:
 * 
 * n = 100 - 2 ms
 * n = 200 - 5 ms
 * n = 400 - 15 ms
 * n = 800 - 20 ms
 * n = 1600 - 25 ms
 * n = 3200 - 40 ms
 * n = 6400 - 85 ms
 * n = 12800 - 265 ms - 3.11x
 * n = 25600 - 1030 ms - 3.88x
 * n = 51200 - 3518 ms - 3.41x
 * n = 102400 - 14338 ms - 4.07x
 * n = 204800 - 57029 ms - 3.97x
 */
