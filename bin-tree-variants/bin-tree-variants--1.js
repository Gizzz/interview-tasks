// naive approach (recursive, no cache)

function calcVars(n) {
  if (n < 0) { throw new Error('the "n" param should not be negative'); }

  if (n === 0) { return 1; }
  if (n === 1) { return 1; }
  if (n === 2) { return 2; }

  let sum = 0;
  for (let i = 0; i < n; i++) {
    const leftSum = calcVars(n - 1 - i);
    const rightSum = calcVars(i);

    sum = sum + leftSum * rightSum;
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
calcVars(6400);
var t1 = performance.now();
console.log("Result is " + (t1 - t0) + " milliseconds.");

/**
 * Single call:
 * 
 * n = 2  - 0.2 ms
 * n = 4  - 0.3 ms
 * n = 8  - 0.8 ms
 * n = 16 - 72 ms
 * n = 32 - > 30 sec
 */

/**
 * Sequential calls:
 * 
 * n = 1  - 0.09 ms
 * n = 2  - 0.1 ms
 * n = 4  - 0.1 ms
 * n = 8  - 0.3 ms
 * n = 16 - 80 ms
 * n = 32 - > 30 sec
 */
