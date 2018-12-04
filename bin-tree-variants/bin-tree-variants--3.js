// imperative with nested loops

const cache = {};

function calcVars(n) {
  if (n < 0) { throw new Error('the "n" param should not be negative'); }

  let lastSum = 0;
  for (let i = 0; i <= n; i++) {
    lastSum = calcTree(i);
  }

  return lastSum;
}

function calcTree(n) {
  if (n < 0) { throw new Error('the "n" param should not be negative'); }

  let totalVariants =
    n === 0 ? 1 :
      n === 1 ? 1 :
        n === 2 ? 2 : undefined;

  if (totalVariants === undefined) {
    totalVariants = 0;

    for (let i = 0; i < n; i++) {
      const leftTreeVariants = cache[n - 1 - i];
      const rightTreeVariants = cache[i];
  
      totalVariants = totalVariants + leftTreeVariants * rightTreeVariants;
    }
  }

  if (cache[n] === undefined) {
    cache[n] = totalVariants;
  }

  return totalVariants;
}

// tests

// console.log('n = 1: ', calcVars(1));
// console.log('n = 2: ', calcVars(2));
// console.log('n = 3: ', calcVars(3));
// console.log('n = 4: ', calcVars(4));
// console.log('n = 5: ', calcVars(5));
// console.log('n = 6: ', calcVars(6));

var t0 = performance.now();
const res = calcVars(409600);
var t1 = performance.now();
console.log("Result is " + res + ".");
console.log("Time is " + (t1 - t0) + " milliseconds.");

/**
 * imperative with nested loops:
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
 * 
 */

/**
 * (Prev results) recursive with cache:
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
