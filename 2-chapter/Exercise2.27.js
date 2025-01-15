import { isNull, tail, pair, head, display, list, isPair } from '../helper.js';

function reverse(items) {
  const iter = (i, iReverse) =>
    isNull(i) ? iReverse
    : isPair(head(i)) ? iter(tail(i), pair(reverse(head(i)), iReverse))
    : iter(tail(i), pair(head(i), iReverse));
  return iter(items, null);
}

const x = list(list(1, 2), list(3, 4));

display(reverse(x));
