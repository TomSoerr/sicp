import {
  display,
  is_string,
  is_pair,
  is_number,
  error,
  head,
  tail,
  list,
  is_null,
} from 'sicp';

const is_variable = (x) => is_string(x);

const is_same_variable = (v1, v2) =>
  is_variable(v1) && is_variable(v2) && v1 === v2;

const number_equal = (exp, num) => is_number(exp) && exp === num;

function deriv(exp, variable) {
  return (
    is_number(exp) ? 0
    : is_variable(exp) ?
      is_same_variable(exp, variable) ? 1
      : 0
    : is_sum(exp) ?
      make_sum(deriv(addend(exp), variable), deriv(augend(exp), variable))
    : is_product(exp) ?
      make_sum(
        make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
        make_product(deriv(multiplier(exp), variable), multiplicand(exp)),
      )
    : error(exp, 'unknown expression type -- deriv')
  );
}

// above given by exercise

const is_sum = (x) => is_pair(x) && head(tail(x)) === '+';
const addend = (s) => head(s);

const augend = (s) =>
  is_null(tail(tail(tail(s)))) ? head(tail(tail(s)))
  : is_sum(tail(tail(s))) ?
    make_sum(addend(tail(tail(s))), augend(tail(tail(s))))
  : is_product(tail(tail(s))) ?
    make_product(multiplier(tail(tail(s))), multiplicand(tail(tail(s))))
  : error(s, 'unknown expression type -- deriv');

const make_sum = (a1, a2) =>
  number_equal(a1, 0) ? a2
  : number_equal(a2, 0) ? a1
  : is_number(a1) && is_number(a2) ? a1 + a2
  : list(a1, '+', a2);

const is_product = (x) => is_pair(x) && head(tail(x)) === '*';
const multiplier = (s) => head(s);

const multiplicand = (s) => augend(s);

const make_product = (m1, m2) =>
  number_equal(m1, 0) || number_equal(m2, 0) ? 0
  : number_equal(m1, 1) ? m2
  : number_equal(m2, 1) ? m1
  : is_number(m1) && is_number(m2) ? m1 * m2
  : list(m1, '*', m2);

display(
  deriv(list('x', '+', list(3, '*', list('x', '+', list('y', '+', 2)))), 'x'),
);

display(deriv(list('x', '+', 3, '*', list('x', '+', 'y', '+', 2)), 'x'));
