const fetch = require("node-fetch");

const endpoint =
  "https://api-bff.nftpricefloor.com/nft/forgotten-runes-wizards-cult/chart/pricefloor?interval=all";

const historicalDuration = 90; // days
const futureDuration = 30; // days

const main = async () => {
  const { dataPriceFloorETH } = await fetch(endpoint).then((r) => r.json());

  // convert 8 hours into days
  const dailyPrices = dataPriceFloorETH.filter((_, i) => i % 3 === 0);
  const prices = dailyPrices.slice(-historicalDuration);
  const logPrices = prices.map((v) => Math.log(v));
  const percentageChanges = logPrices.map((v, i) =>
    i > 0 ? (v - logPrices[i - 1]) / logPrices[i - 1] : 0
  );
  const floorStdev = stdev(percentageChanges);
  const vol = floorStdev * Math.sqrt(futureDuration);

  console.log(logPrices);
  console.log(percentageChanges);
  console.log("daily prices: ", dataPriceFloorETH.slice(-30));
  console.log("vol: ", vol);
};

const stdev = (periods) => {
  const mean = periods.reduce((m, v) => m + v / periods.length, 0);
  const variance = periods.reduce(
    (variance, v) => variance + Math.pow(v - mean, 2) / periods.length,
    0
  );
  const _stdev = Math.sqrt(variance);

  console.log("mean", mean);
  console.log("variance", variance);
  console.log("stdev", _stdev);

  return _stdev;
};

main();
