// all these function are written by my self for the specific exercises
// but for clarity they are inside this file

const display = console.log;
const pair = (a, b) => [a, b];
const head = (arr) => arr[0];
const tail = (arr) => arr[1];

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

function iterativeImprove(goodEnough, improveGuess) {
  function iterate(guess) {
    return goodEnough(guess) ? guess : iterate(improveGuess(guess));
  }
  return iterate;
}

const abs = (x) => (x < 0 ? -x : x);

const sqrt = (x) =>
  iterativeImprove(
    (n) => abs(n * n - x) < 0.001,
    (n) => 0.5 * (n + x / n),
  )(1);

const square = (x) => x * x;

const raise = (x, n) =>
  n === 0 ? 1
  : n & 1 ? x * raise(x, n - 1)
  : raise(x * x, n / 2);

const log2 = Math.log2;

const log3 = (x) => Math.log(x) / Math.log(3);

export { display, pair, head, tail, gcd, sqrt, square, raise, log2, abs, log3 };
