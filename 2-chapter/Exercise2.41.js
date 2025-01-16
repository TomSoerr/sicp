import {
  append,
  map,
  accumulate,
  pair,
  list,
  display,
  filter,
  is_null,
  head,
  tail,
} from 'sicp';

// given
const flatmap = (fn, seq) => accumulate(append, null, map(fn, seq));

// given
const enumerate_interval = (low, high) =>
  low > high ? null : pair(low, enumerate_interval(low + 1, high));

// given
const permutation = (s) =>
  is_null(s) ?
    list(null)
  : flatmap(
      (x) => map((p) => pair(x, p), permutation(filter((a) => a !== x, s))),
      s,
    );

// old solution
const unique_pair = (n) =>
  flatmap(
    (i) => map((j) => list(i, j), enumerate_interval(1, i - 1)),
    enumerate_interval(1, n),
  );

const unique_triples = (n) =>
  flatmap(
    (k) => map((ij) => pair(k, ij), unique_pair(k - 1)),
    enumerate_interval(1, n),
  );

const plus = (a, b) => a + b;

const triples_sum_to = (s, seq) =>
  filter((triple) => s === accumulate(plus, 0, triple), seq);

const unordered_distinct_triples = (s, n) =>
  flatmap(
    (triple) => permutation(triple),
    triples_sum_to(s, unique_triples(n)),
  );

const ordered_distinct_triples = (s, n) => triples_sum_to(s, unique_triples(n));

display(ordered_distinct_triples(9, 4));
