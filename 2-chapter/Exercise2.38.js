import { is_null, list, head, tail, display, accumulate } from 'sicp';

function fold_left(op, initial, sequence) {
  function iter(result, rest) {
    return is_null(rest) ? result : iter(op(result, head(rest)), tail(rest));
  }
  return iter(initial, sequence);
}

const divide = (x, y) => x / y;
const multiply = (x, y) => x * y;

display(fold_left(divide, 1, list(1, 2, 3))); // 1/6
display(accumulate(divide, 1, list(1, 2, 3))); // 3/2

display(fold_left(list, null, list(1, 2, 3))); // [[[null, [1, null]], [2, null]], [3, null]]
display(accumulate(list, null, list(1, 2, 3))); // [1, [[2, [[3, [null, null]], null]], null]]

display(fold_left(multiply, 1, list(1, 2, 3))); // 6
display(accumulate(multiply, 1, list(1, 2, 3))); // 6
// multiplication and addition is commutative so fold right and left will produce the same result
