import util from 'util';
// all these function are written by my self for the specific exercises
// but for clarity they are inside this file
const display = (msg) =>
  console.log(util.inspect(msg, { depth: null, maxArrayLength: null }));

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

const min = Math.min;
const max = Math.max;

const error = (msg) => {
  throw new Error(msg);
};

function list(...args) {
  const el = args.shift();
  return args.length == 0 ? [el, null] : [el, list(...args)];
}

const isNull = (item) => item == null;

const length = (items) => (isNull(items) ? 0 : 1 + length(tail(items)));

const map = (fn, items) =>
  isNull(items) ? null : pair(fn(head(items)), map(fn, tail(items)));

const isPair = (x) => Array.isArray(x);

const append = (a, b) => (isNull(a) ? b : pair(head(a), append(tail(a), b)));

export {
  display,
  append,
  pair,
  head,
  tail,
  gcd,
  sqrt,
  square,
  raise,
  log2,
  abs,
  log3,
  min,
  max,
  error,
  list,
  isNull,
  length,
  map,
  isPair,
};
