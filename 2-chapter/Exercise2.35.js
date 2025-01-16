import {
  display,
  accumulate,
  list,
  is_null,
  is_pair,
  append,
  head,
  tail,
  map,
} from 'sicp';

function count_leaves(t) {
  return accumulate(
    (x, y) => x + y,
    0,
    map((x) => (is_pair(x) ? count_leaves(x) : 1), t),
  );
}

display(
  count_leaves(
    list(list(1, 2), list(3, 4), list(5, 6), 42, list(list(2, 4), 9)),
  ),
);
