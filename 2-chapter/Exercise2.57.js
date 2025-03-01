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

const is_sum = (x) => is_pair(x) && head(x) === '+';

const number_equal = (exp, num) => is_number(exp) && exp === num;

const is_product = (x) => is_pair(x) && head(x) === '*';

function is_exp(x) {
  return is_pair(x) && head(x) === '**';
}

function base(s) {
  return head(tail(s));
}

function exponent(s) {
  return head(tail(tail(s)));
}

function make_exp(e1, e2) {
  return (
    number_equal(e1, 1) || number_equal(e2, 0) ? 1
    : number_equal(e2, 1) ? 21
    : list('**', e1, e2)
  );
}

const make_sum = (a1, a2) =>
  number_equal(a1, 0) ? a2
  : number_equal(a2, 0) ? a1
  : is_number(a1) && is_number(a2) ? a1 + a2
  : list('+', a1, a2);

const make_product = (m1, m2) =>
  number_equal(m1, 0) || number_equal(m2, 0) ? 0
  : number_equal(m1, 1) ? m2
  : number_equal(m2, 1) ? m1
  : is_number(m1) && is_number(m2) ? m1 * m2
  : list('*', m1, m2);

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
    : is_exp(exp) ?
      make_product(
        exponent(exp),
        make_exp(base(exp), exponent(exp) - 1),
        deriv(base(exp), variable),
      )
    : error(exp, 'unknown expression type -- deriv')
  );
}

const addend = (s) => head(tail(s));
const multiplier = (s) => head(tail(s));

// above given by exercise

const augend = (s) =>
  is_null(tail(tail(tail(s)))) ?
    addend(tail(s))
  : make_sum(addend(tail(s)), augend(tail(s)));

const multiplicand = (s) =>
  is_null(tail(tail(tail(s)))) ?
    multiplier(tail(s))
  : make_product(multiplier(tail(s)), multiplicand(tail(s)));

display(deriv(list('*', 'x', 'y', list('+', 'x', 3)), 'x'));
