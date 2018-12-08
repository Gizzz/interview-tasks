// // solution with cache


// // key - mass of coins
// // value - result item or 'impossible'
// // result item - array - nominal to coin's count
let massToResult_items = [];

function main(pigEmptyMass, pigFullMass, coins) {
  // clear cache because coins changed
  massToResult_items = [];

  const zeroResult = [];
  for (let i = 0; i < coins.length; i++) {
    zeroResult[coins[i].nominal] = 0;
  }
  massToResult_items.push(zeroResult);

  const coinsMass = pigFullMass - pigEmptyMass;
  //const coinsMass = mass;

  let lastAnswer;
  for (let i = 0; i <= coinsMass; i++) {
    lastAnswer = calcInner(coins, i);
  }

  return lastAnswer;
}

function calcInner(coins, mass) {
  if (mass === 0) {
    return 'The minimum amount of money in the piggy-bank is 0.';
  }

  const coinResults = [];

  for (let i = 0; i < coins.length; i++) {
    const currCoin = coins[i];

    const prevResultForCoin = findPrevResult(currCoin);
    const prevMass = calcResultMass(prevResultForCoin);

    const newMass = prevMass + currCoin.weight;
    if (newMass === mass) {
      const newResult = []

      for (let i = 0; i < coins.length; i++) {
        newResult[coins[i].nominal] = prevResultForCoin[coins[i].nominal];
      }
      newResult[currCoin.nominal] = prevResultForCoin[currCoin.nominal] + 1;

      coinResults.push(newResult);
    }
  }

  if (coinResults.length === 0) {
    massToResult_items[mass] = 'impossible';
    return 'This is impossible.'
  } else {
    // find result with minimal money
    // isert it to cache
    const [optimalResult, minMoney] = findOptimalResultAndMinMoney(coinResults);
    massToResult_items[mass] = optimalResult;
    return 'The minimum amount of money in the piggy-bank is ' + minMoney + '.';
  }
}

function findPrevResult(coin) {
  const zeroRes = massToResult_items[0];
  if (massToResult_items.length === 1) {
    return zeroRes;
  }

  let result;
  let nextRes;
  
  for (let i = massToResult_items.length - 1; i >= 0; i--) {
    let currResult = massToResult_items[i];
    if (currResult === 'impossible') { continue; }
    
    if (!nextRes) {
      nextRes = currResult;
    } else {
      const prevRes = currResult;
      const prevCoinCount = prevRes[coin.nominal];
      const nextCoinCount = nextRes[coin.nominal];
      if (prevCoinCount !== nextCoinCount) {
        result = nextRes;
        break;
      } else {
        nextRes = prevRes;
      }
    }
  }
  
  if (!result) {
    return zeroRes;
  }

  return result;
}

function findOptimalResultAndMinMoney(results) {
  let minMoney = Infinity;
  let resultToReturn;

  for (let i = 0; i < results.length; i++) {
    const currResult = results[i];
    let currMoney = 0;

    for (let j = 0; j < coins.length; j++) {
      const currCoin = coins[j];
      const coinsCount = currResult[currCoin.nominal];
      currMoney += coinsCount * currCoin.nominal;
    }

    if (currMoney < minMoney) {
      minMoney = currMoney;
      resultToReturn = currResult;
    }
  }

  return [ resultToReturn, minMoney ];
}

function calcResultMass(result) {
  let totalMass = 0;
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    const coinCount = result[coin.nominal];
    totalMass += coin.weight * coinCount;
  }
  return totalMass;
}

// let coins = [
//   { nominal: 1, weight: 1 },
//   { nominal: 30, weight: 50 },
// ];

// shout output 60
// print(main(10, 110, coins));

const testCasesCount = parseInt(readline());

for (let i = 0; i < testCasesCount; i++) {
	let pigWeights = readline().split(' ');
	pigWeights = pigWeights.map(w => parseInt(w));
	const emptyPigWeight = pigWeights[0];
	const fullPigWeight = pigWeights[1];
	
	const coins = [];
	const coinsCount = parseInt(readline());
	for (let j = 0; j < coinsCount; j++) {
		const coinInfoStr = readline().split(' ');
		const nominal = coinInfoStr[0];
		const weight = coinInfoStr[1];
		coins.push({ nominal: parseInt(nominal), weight: parseInt(weight) })
	}
	
	print(main(emptyPigWeight, fullPigWeight, coins));
}


