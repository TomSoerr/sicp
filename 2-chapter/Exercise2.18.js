import { display, head, length, list, pair, tail } from '../helper.js';

function getIndex(i, n) {
  return n === 0 ? head(i) : getIndex(tail(i), n - 1);
}

function reverse(items) {
  function goThrough(i, n) {
    return n === 0 ? list(head(i)) : pair(getIndex(i, n), goThrough(i, n - 1));
  }

  return goThrough(items, length(items) - 1);
}

const a = list(1, 4, 9);

display(reverse(a));
display(a);
