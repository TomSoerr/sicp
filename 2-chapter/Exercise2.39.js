import {
  accumulate,
  append,
  display,
  list,
  pair,
  is_null,
  head,
  tail,
} from 'sicp';

function fold_left(op, initial, sequence) {
  function iter(result, rest) {
    return is_null(rest) ? result : iter(op(result, head(rest)), tail(rest));
  }
  return iter(initial, sequence);
}

const fold_right = accumulate;

function reverse_r(sequence) {
  return fold_right((x, y) => append(y, list(x)), null, sequence);
}

function reverse_l(sequence) {
  return fold_left((x, y) => append(list(y), x), null, sequence);
}

display(reverse_r(list(1, 2, 3, 4, 5, 6)));
display(reverse_l(list(1, 2, 3, 4, 5, 6)));
