import { list, display, pair, isPair, isNull, head, tail } from '../helper.js';

const countLeaves = (x) =>
  isNull(x) ? 0
  : !isPair(x) ? 1
  : countLeaves(head(x)) + countLeaves(tail(x));

display(countLeaves(list(1, list(2, list(3, 4))))); // 4
