import { display, is_pair, head, tail, list } from 'sicp';

function count_pairs(x) {
  return !is_pair(x) ? 0 : count_pairs(head(x)) + count_pairs(tail(x)) + 1;
}
const a = 'a';

display(count_pairs(list(a, a, a)));
display(count_pairs(list(a, a, list(a))));
display(count_pairs(list(a, a, list(a, a, a, a))));
