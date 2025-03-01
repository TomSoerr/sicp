import { is_null, equal, tail, head, pair, display, append } from 'sicp';

function is_element_of_set(x, set) {
  return (
    is_null(set) ? false
    : equal(x, head(set)) ? true
    : is_element_of_set(x, tail(set))
  );
}

function adjoin_set(x, set) {
  return pair(x, set);
}

function intersection_set(set1, set2) {
  return (
    is_null(set1) || is_null(set2) ? null
    : is_element_of_set(head(set1), set2) ?
      pair(head(set1), intersection_set(tail(set1), set2))
    : intersection_set(tail(set1), set2)
  );
}

function union_set(set1, set2) {
  return append(set1, set2);
}

// intersection_set and is_element_of_set are the same functions for non- and duplicate lists
// adjoin_set and union_set are faster than before. So for applications where

display(
  union_set(
    adjoin_set(10, adjoin_set(20, adjoin_set(30, null))),
    adjoin_set(10, adjoin_set(15, adjoin_set(20, null))),
  ),
);
