function getMoneySpent(kbds, drvs, b) {
  /*
   * Write your code here.
   */
  const sortedKbds = kbds.sort();
  const sortedDrvs = drvs.sort();
  if (sortedKbds[0] + sortedDrvs[0] > b) {
      return -1;
  }

  let maxPrice = 0;
  for (let i = 0; i < kbds.length; i++) {
      for (let j = 0; j < drvs.length; j++) {
          const price = kbds[i] + drvs[j];
          if (price <= b && price > maxPrice) {
              maxPrice = price;
          }
      }
  }
  return maxPrice;
}

const b = 142627;
const kbds = [762079 345956 946858 154495 339846 25454 517356 645968 378996 637046 6712 340681 385962 71729 791899 409722 596124 311288 101283 677274 847331 605916 531205 364676 841913 217942 580353 988259 559815 454104 105283 688430 167398 140585 972245 485700 228539 27543 977673 505569 532033 964235 135820 384294 99325]
