import {
  append,
  display,
  isNull,
  isPair,
  list,
  tail,
  head,
  pair,
} from '../helper.js';

function fringe(items) {
  const result =
    isNull(items) ? null
    : isPair(items) ? append(fringe(head(items)), fringe(tail(items)))
    : list(items);

  return result;
}

const x = list(list(1, 2), list(3, 4));

display(fringe(list(x, x)));
