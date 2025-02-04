import { is_null, tail, head, pair, display, list } from 'sicp';

function adjoin_set(x, set) {
  return (
    is_null(set) ? x
    : x === head(set) ? set
    : x < head(set) ? pair(x, set)
    : pair(head(set), adjoin_set(x, tail(set)))
  );
}

display(adjoin_set(0, list(1, 3, 4, 5, 6)));
