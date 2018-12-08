// recursive approach with cache

const cache = {};

function calcVars(n) {
  if (n < 0) { throw new Error('the "n" param should not be negative'); }

  if (n === 0) { return 1; }
  if (n === 1) { return 1; }
  if (n === 2) { return 2; }

  if (cache[n] !== undefined) {
    return cache[n];
  }

  let sum = 0;
  for (let i = 0; i < n; i++) {
    const leftSum = calcVars(n - 1 - i);
    const rightSum = calcVars(i);

    sum = sum + leftSum * rightSum;
  }

  if (cache[n] === undefined) {
    cache[n] = sum;
  }

  return sum;
}

// tests

// console.log('n = 1: ', calcVars(1));
// console.log('n = 2: ', calcVars(2));
// console.log('n = 3: ', calcVars(3));
// console.log('n = 4: ', calcVars(4));
// console.log('n = 5: ', calcVars(5));
// console.log('n = 6: ', calcVars(6));

var t0 = performance.now();
const res = calcVars(400);
var t1 = performance.now();
console.log("Result is " + res + ".");
console.log("Result is " + (t1 - t0) + " milliseconds.");

/**
 * Single call:
 * 
 * n = 32  - 1 ms
 * 
 * n = 100 - 5 ms
 * n = 200 - 30 ms - 6x
 * n = 400 - 70 ms - 2.3x
 * n = 800 - 210 ms - 3x
 * n = 1600 - 720 ms - 3.42x
 * n = 3200 - 2650 ms - 3.68x
 * n = 6400 - 8024 ms - 3.027x
 * n = 12800 - Maximum call stack size exceeded
 */

/**
 * (Prev results) Single call:
 * 
 * n = 2  - 0.2 ms
 * n = 4  - 0.3 ms
 * n = 8  - 0.8 ms
 * n = 16 - 72 ms
 * n = 32 - > 30 sec
 */
