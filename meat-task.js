/*
  девочка ест мясо. 
  есь прогноз цен и количество мяса которое ей нужно в день. 
  можно закупать мясо впрок. какая минимально достаточная сумма нужна? 
*/

// the answer is 650

const prices =     [10, 11, 12, 9,  10, 15, 8,  10];
const meatDemand = [10, 10, 10, 10, 10, 10, 10, 10];

const easyWaySolution = () => {
  let sum = 0;
  let currMinPrice = prices[0];

  for (let i = 0; i < prices.length; i++) {
    const todayPrice = prices[i];
    currMinPrice = todayPrice < currMinPrice ? todayPrice : currMinPrice;
    sum += currMinPrice * meatDemand[i];
  }

  return sum;
};

const hardWaySolution = () => {
  let sum = 0;
  let currMinPriceDayIdx = 0;
  let lastMinPrice = prices[currMinPriceDayIdx];

  while (currMinPriceDayIdx < prices.length) {

    if (currMinPriceDayIdx === prices.length - 1) {
      const actualPrice = lastMinPrice < prices[currMinPriceDayIdx] ? lastMinPrice : prices[currMinPriceDayIdx];
      sum += actualPrice * meatDemand[currMinPriceDayIdx];
    }

    let priceCutoffIdx;
    for (let i = currMinPriceDayIdx + 1; i < prices.length; i++) {
      priceCutoffIdx = i;

      const currMinPrice = prices[currMinPriceDayIdx];
      if (prices[i] < currMinPrice) {
        lastMinPrice = prices[i];
        break;
      }
    }

    let meatPricePerPeriod = 0;
    for (let i = currMinPriceDayIdx; i < priceCutoffIdx; i++) {
      meatPricePerPeriod += prices[currMinPriceDayIdx] * meatDemand[i];
    }

    sum += meatPricePerPeriod;
    currMinPriceDayIdx = priceCutoffIdx;
  }

  return sum;
}

console.log('easyWaySolution:', easyWaySolution());
console.log('hardWaySolution:', hardWaySolution());
