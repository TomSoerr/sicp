import { display, isNull, head, list, tail } from '../helper.js';

function lastPair(items) {
  return isNull(tail(items)) ? head(items) : lastPair(tail(items));
}

display(lastPair(list(23, 73, 149, 34)));
