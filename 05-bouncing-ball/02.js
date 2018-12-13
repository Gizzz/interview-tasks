const cache = {
  1: 1,
  2: 2,
};

function populateCache() {
  for (let i = 3; i <= 2000; i++) {
    calcBallBounce(i);
  }
}

function calcBallBounce(n) {
  if (n < 1) { throw new Error('n < 1'); }

  if (cache[n]) { return cache[n]; }

  const vars = cache[n - 1] + cache[n - 2];
  cache[n] = vars;

  return vars;
}

populateCache();

console.log('n = 1 should be 1:', calcBallBounce(1));
console.log('n = 2 should be 2:', calcBallBounce(2));
console.log('n = 1000 should be 2:', calcBallBounce(200));