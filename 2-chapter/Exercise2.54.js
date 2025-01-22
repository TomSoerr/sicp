import { head, tail, list, display, is_null, is_pair, is_number } from 'sicp';

function equal(a, b) {
  // equality numbers, strings and pairs
  return (
    is_null(a) && is_null(b) ? true
    : is_null(a) || is_null(b) ? false
    : is_pair(head(a)) && is_pair(head(b)) ?
      equal(head(a), head(b)) && equal(tail(a), tail(b))
    : is_pair(head(a)) || is_pair(head(b)) ? false
    : is_number(head(a)) && is_number(head(b)) ?
      head(a) === head(b) && equal(tail(a), tail(b))
    : is_number(head(a)) || is_number(head(b)) ? false
    : head(a) === head(b) && equal(tail(a), tail(b))
  );
}

display(
  equal(list('this', 'is', 'a', 'list'), list('this', list('is', 'a'), 'list')),
);
