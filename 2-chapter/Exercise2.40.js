import { append, map, accumulate, pair, list, display } from 'sicp';

// given
const flatmap = (fn, seq) => accumulate(append, null, map(fn, seq));

// given
const enumerate_interval = (low, high) =>
  low > high ? null : pair(low, enumerate_interval(low + 1, high));

// solution
const unique_pair = (n) =>
  flatmap(
    (i) => map((j) => list(i, j), enumerate_interval(1, i - 1)),
    enumerate_interval(1, n),
  );

display(unique_pair(6));

// simplified version
// function prime_sum_pair(n) {
//   return map(make_pair_sum, filter(is_prime_sum, unique_pair(n)));
// }
