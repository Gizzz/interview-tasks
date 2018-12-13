function boncingBall(n) {
  if (n < 1) { throw new Error('n < 1'); }

  if (n === 1) { return 1; }
  if (n === 2) { return 2; }

  const vars_1 = boncingBall(n - 1);
  const vars_2 = boncingBall(n - 2);

  return vars_1 + vars_2;
}

console.log('n = 1 should be 1:', boncingBall(1))
console.log('n = 2 should be 2:', boncingBall(2))
console.log('n = 3 should be 3:', boncingBall(3))
console.log('n = 3 should be 3:', boncingBall(100))