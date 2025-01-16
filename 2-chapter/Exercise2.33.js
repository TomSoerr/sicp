import { pair, accumulate, is_null, head, tail, list, display } from 'sicp';

function map(f, sequence) {
  return accumulate((x, y) => pair(f(x), y), null, sequence);
}

// display(map((x) => x ** 2, list(1, 2, 3, 4, 5)));

function append(seq1, seq2) {
  return accumulate(pair, seq2, seq1);
}

// display(append(list(1, 2), list(2, 3)));

function length(sequence) {
  return accumulate((x, y) => 1 + y, 0, sequence);
}

// display(length(list(1, 2, 4)));
