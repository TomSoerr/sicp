import { is_null, equal, tail, head, pair, display } from 'sicp';

function is_element_of_set(x, set) {
  return (
    is_null(set) ? false
    : equal(x, head(set)) ? true
    : is_element_of_set(x, tail(set))
  );
}

function adjoin_set(x, set) {
  return is_element_of_set(x, set) ? set : pair(x, set);
}

// above given by exercise

function union_set(set1, set2) {
  return is_null(set1) ? set2 : (
      union_set(tail(set1), adjoin_set(head(set1), set2))
    );
}

display(
  union_set(
    adjoin_set(10, adjoin_set(20, adjoin_set(30, null))),
    adjoin_set(10, adjoin_set(15, adjoin_set(20, null))),
  ),
);
