import { display, head, isNull, list, tail } from '../helper.js';

// given by exercise
const plusCurried = (x) => (y) => x + y;

function brooks(fn, args) {
  function iter(f, a) {
    return isNull(tail(a)) ? f(head(a)) : iter(fn(f(head(a))), tail(a));
  }
  return iter(fn(head(args)), tail(args));
}

function brooksCurried(items) {
  return brooks(head(items), tail(items));
}

display(brooksCurried(list(plusCurried, 3, 4)));
display(brooksCurried(list(brooksCurried, list(plusCurried, 3, 4)))); // does not work
