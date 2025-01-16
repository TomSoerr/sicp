import {
  accumulate,
  display,
  head,
  tail,
  pair,
  list,
  is_null,
  map,
} from 'sicp';

function accumulate_n(op, init, seqs) {
  return is_null(head(seqs)) ? null : (
      pair(
        accumulate(
          op,
          init,
          map((x) => head(x), seqs),
        ),
        accumulate_n(
          op,
          init,
          map((x) => tail(x), seqs),
        ),
      )
    );
}

// display(
//   accumulate_n(
//     (x, y) => x + y,
//     0,
//     list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9), list(10, 11, 12)),
//   ),
// );

export { accumulate_n };
