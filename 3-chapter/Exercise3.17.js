import {
  display,
  is_pair,
  head,
  tail,
  list,
  pair,
  is_null,
  set_head,
  set_tail,
} from 'sicp';

import { l_to_arr } from '../2-chapter/helper.js';

function has(L, item) {
  return (
    is_null(L) ? false
    : is_null(head(L)) ? false
    : head(L) === item ? true
    : has(tail(L), item)
  );
}

function unshift(L, item) {
  const h = head(L);
  const t = tail(L);
  set_head(L, item);
  if (is_null(h)) {
    set_tail(L, null);
    return;
  }
  set_tail(L, pair(h, t));
}

function count_pairs(x) {
  let known = pair(null, null);

  function count(pairs) {
    if (!is_pair(pairs)) return 0;
    if (has(known, pairs)) return 0;
    unshift(known, pairs);

    return count(head(pairs)) + count(tail(pairs)) + 1;
  }
  return count(x);
}

const a = 'a';
const left = list(a, a);
const right = left;

display(count_pairs(pair(left, right))); // 3 instead of 6
