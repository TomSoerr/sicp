import { display, accumulate, list } from 'sicp';

function horner_eval(x, coefficient_sequence) {
  return accumulate(
    (this_coeff, higher_terms) => this_coeff + x * higher_terms,
    0,
    coefficient_sequence,
  );
}

display(horner_eval(2, list(1, 3, 0, 5, 0, 1)));
