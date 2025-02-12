import { head, is_null, tail, pair } from 'sicp';

function $reduce_count(f, initial, xs, count) {
  return is_null(xs) ? initial : (
      $reduce_count(f, f(initial, head(xs), count), tail(xs), count + 1)
    );
}

/**
 *
 * @param {Function} f - Function with two arguments (previous, current)
 * @param {*} initial - Initial value
 * @param {*} xs - List
 */
function reduce(f, initial, xs) {
  return $reduce_count(f, initial, xs, 0);
}

function $list_to_array(l, arr) {
  return is_null(l) ? arr : (
      $list_to_array(
        tail(l),
        (() => {
          arr.push(head(l));
          return arr;
        })(),
      )
    );
}

/**
 * @param {*} l - list
 * @returns
 */
function list_to_array(l) {
  return $list_to_array(l, []);
}

/**
 * @param {Function} compare - return: 0 => equal, 1 => i1 > i2, -1 => i1 < i2
 * @param {*} L - list to be sorted at least 2 elements
 * @returns
 */
function sort_list(compare, L) {
  const equal_list = (L1, L2) =>
    is_null(L1) ? is_null(L2)
    : is_null(L2) ? is_null(L1)
    : !compare(head(L1), head(L2)) && equal_list(tail(L1), tail(L2));

  function iter(i1, list) {
    if (is_null(list)) {
      return pair(i1, null);
    }
    const i2 = head(list);
    const new_list = tail(list);
    const c = compare(i1, i2);

    return c > -1 ? pair(i1, iter(i2, new_list)) : pair(i2, iter(i1, new_list));
  }

  function sort(last, current) {
    if (equal_list(last, current)) {
      return current;
    }
    const i1 = head(current);
    const list = tail(current);
    const new_list = iter(i1, list);

    return sort(current, new_list);
  }
  return sort(null, L);
}

export { reduce, list_to_array, sort_list };
