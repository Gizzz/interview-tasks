// trivial solution up to 1st variable sum

const pigEmptyMass = 10;
const pigFullMass = 110;
const coins = [
  { nominal: 1, weight: 1 },
  { nominal: 30, weight: 50 },
];

function calcMinMoney(pigEmptyMass, pigFullMass, coins) {
  const coinsMass = pigFullMass - pigEmptyMass;

  let lastAnswer;
  for (let i = 0; i <= coinsMass; i++) {
    lastAnswer = calcInner(coins, coinsMass);
  }

  return lastAnswer;
}

const coinsLastSuccess = [];
const paths = {};

function calcInner(coins, mass) {
  if (mass === 0) {
    return 'The minimum amount of money in the piggy-bank is 0.';
  }

  const results = [];

  for (let i = 0; i < coins.length; i++) {
    let currMass = 0;
    let coinsCount = 0;
    while (currMass < mass) {
      currMass += coins[i].weight;
      coinsCount += 1;

      if (currMass === mass) {
        results.push({ nominal: coins[i].nominal, count: coinsCount });
        break;
      }
    }
  }

  if (results.length === 0) {
    return 'This is impossible.'
  } else {
    const minCash = findMinCash(results);
    return `The minimum amount of money in the piggy-bank is ${minCash}.`
  }
}

function findMinCash(results) {
  let minCash = Infinity;
  for (let i = 0; i < results.length; i++) {
    const currCash = results[i].nominal * results[i].count;
    if (currCash < minCash) {
      minCash = currCash;
    }
  }

  return minCash;
}

console.log(calcInner(coins, 51));