const fetch = require("node-fetch");

const endpoint =
  "https://api-bff.nftpricefloor.com/nft/forgotten-runes-wizards-cult/chart/pricefloor?interval=all";
const duration = 3 * 30; // 8 hour periods

const main = async () => {
  const { dataPriceFloorETH } = await fetch(endpoint).then((r) => r.json());
  const floorStdev = stdev(dataPriceFloorETH.slice(-3 * 30));
  const vol = floorStdev * Math.sqrt(duration);

  console.log("running", dataPriceFloorETH.slice(-30));
  console.log("vol", vol);
  console.log("len", dataPriceFloorETH.slice(-3 * 30).length);
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

function volatility(values) {
  const n = values.length;

  const mean = values.reduce((a, b) => a + b, 0) / n;

  const deviation = values.reduce(
    (dev, val) => dev + (val - mean) * (val - mean),
    0
  );

  return Math.sqrt(deviation / n);
}

main();
