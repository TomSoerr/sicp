import { display, head, isNull, list, tail } from '../helper.js';

function forEach(fn, items) {
  if (isNull(items)) return;
  fn(head(items));
  forEach(fn, tail(items));
}

forEach((x) => display(x), list(34, 34, 56));
