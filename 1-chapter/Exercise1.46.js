function iterativeImprove(goodEnough, improveGuess) {
  function iterate(guess) {
    return goodEnough(guess) ? guess : iterate(improveGuess(guess));
  }
  return iterate;
}

const tolerance = 0.0000001;

function fixedPoint(f, firstGuess) {
  return iterativeImprove(
    guess => Math.abs(guess - f(guess)) < tolerance,
    guess => 0.5 * (guess + f(guess))
  )(firstGuess);
}

function sqrt(x) {
  return iterativeImprove(
    (n) => Math.abs(n * n - x) < 0.001,
    (n) => 0.5 * (n + x / n),
  )(1);
}

console.log(sqrt(16))
console.log(fixedPoint(y => 16 / y, 1))