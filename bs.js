const spotPrice = 50;
const strike = 32.0;
const volatility = 5; // n day volatility
const put = true;

const main = () => {
  const d_1 =
    (Math.log(spotPrice / strike) + Math.pow(volatility, 2) / 2) / volatility;

  const d_2 = d_1 - volatility;

  const premium = put
    ? strike * stdNormCDF(-d_2) - spotPrice * stdNormCDF(-d_1)
    : spotPrice * stdNormCDF(d_1) - strike * stdNormCDF(d_2);

  console.log("d1", d_1, stdNormCDF(d_1));
  console.log("d2", d_2, stdNormCDF(d_2));
  console.log("premium", premium);
};

function stdNormCDF(x) {
  var probability = 0;
  // avoid divergence in the series which happens around +/-8 when summing the
  // first 100 terms
  if (x >= 8) {
    probability = 1;
  } else if (x <= -8) {
    probability = 0;
  } else {
    for (var i = 0; i < 100; i++) {
      probability += Math.pow(x, 2 * i + 1) / _doubleFactorial(2 * i + 1);
    }
    probability *= Math.pow(Math.E, -0.5 * Math.pow(x, 2));
    probability /= Math.sqrt(2 * Math.PI);
    probability += 0.5;
  }
  return probability;
}

function _doubleFactorial(n) {
  var val = 1;
  for (var i = n; i > 1; i -= 2) {
    val *= i;
  }
  return val;
}

main();
