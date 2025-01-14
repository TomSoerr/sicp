import { display, head, isNull, list, tail } from '../helper.js';

const usCoins = list(50, 25, 10, 5, 1);
const usCoinsBackwards = list(1, 5, 10, 25, 50);
const ukCoins = list(100, 50, 20, 10, 5, 2, 1);

function noMore(items) {
  return isNull(items);
}

function exceptFirstDenomination(items) {
  return tail(items);
}

function firstDenomination(items) {
  return head(items);
}

// given by exercise
function cc(amount, coinValues) {
  return (
    amount === 0 ? 1
    : amount < 0 || noMore(coinValues) ? 0
    : cc(amount, exceptFirstDenomination(coinValues)) +
      cc(amount - firstDenomination(coinValues), coinValues)
  );
}

display(cc(100, usCoinsBackwards));
// The order does not effect the answer produced by cc. This is because cc produces a tree of results and the order of the branches dont matter
