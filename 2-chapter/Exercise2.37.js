import { map, accumulate, list, pair, display } from 'sicp';
import { accumulate_n } from './Exercise2.36.js';

const plus = (x, y) => x + y;

const times = (x, y) => x * y;

function dot_product(v, w) {
  return accumulate(plus, 0, accumulate_n(times, 1, list(v, w)));
}

function matrix_times_vector(m, v) {
  return map((row) => dot_product(row, v), m);
}

function transpose(mat) {
  return accumulate_n(pair, null, mat);
}

function matrix_times_matrix(m, n) {
  const cols = transpose(n);
  return map((m_row) => matrix_times_vector(cols, m_row), m);
}

const A = list(list(1, 2), list(3, 4));
const B = list(list(4, 3), list(2, 1));
display(matrix_times_matrix(A, B));
