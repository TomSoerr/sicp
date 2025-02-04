import { is_null, tail, head, pair, display, list } from 'sicp';

function union_set(set1, set2) {
  if (is_null(set1)) return set2;
  if (is_null(set2)) return set1;

  const x1 = head(set1);
  const x2 = head(set2);
  return (
    x1 === x2 ? union_set(tail(set1), set2)
    : x1 < x2 ? pair(x1, union_set(tail(set1), set2))
      // x1 > x2
    : pair(x2, union_set(set1, tail(set2)))
  );
}

display(union_set(list(10, 13, 30, 40), list(10, 15, 20)));
