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

function last_pair(x) {
  return is_null(tail(x)) ? x : last_pair(tail(x));
}

function make_cycle(x) {
  set_tail(last_pair(x), x);
  return x;
}

function detect_cycle(x) {
  if (!is_pair(x)) return false;

  function detect(l) {
    if (is_null(tail(l))) return false;
    if (x === tail(l)) return true;

    return detect(tail(l));
  }
  return detect(x);
}

const z = make_cycle(list('a', 'b', 'c'));
display(detect_cycle(z));

display(detect_cycle(list('a', 'b', 'c')));
