import { head, is_null, tail } from 'sicp';

function reduce_count(f, initial, xs, count) {
  return is_null(xs) ? initial : (
      reduce_count(f, f(initial, head(xs), count), tail(xs), count + 1)
    );
}

/**
 *
 * @param {Function} f - Function with two arguments (previous, current)
 * @param {*} initial - Initial value
 * @param {*} xs - List
 */
function reduce(f, initial, xs) {
  return reduce_count(f, initial, xs, 0);
}

export { reduce };
