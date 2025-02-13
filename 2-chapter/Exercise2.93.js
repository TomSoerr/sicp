import {
  list,
  is_undefined,
  apply_in_underlying_javascript,
  error,
  map,
  display,
} from 'sicp';

import {
  install_real_package,
  install_is_equal_package,
  install_polynomial_package,
  install_rational_package,
  install_term_package,
} from './Extended-Exercise-Packages.js';

import { get, put, type_tag, contents } from './table-helper.js';

//############################################################################//
//                                                                            //
//                             Generic operations                             //
//                                                                            //
//############################################################################//

const add = (x, y) => apply_generic('add', list(x, y));
const mul = (x, y) => apply_generic('mul', list(x, y));
const sub = (x, y) => apply_generic('sub', list(x, y));
const div = (x, y) => apply_generic('div', list(x, y));
const negate = (x) => apply_generic('neg', list(x));

const make_real = (n) => get('make', 'real')(n);
const make_rational = (n, d) => get('make', 'rational')(n, d);
const is_equal = (x, y) => apply_generic('is_equal', list(x, y));

const make_polynomial = (variable, terms) =>
  get('make', 'polynomial')(variable, terms);
const make_term = (order, coeff) => get('make', 'term')(order, coeff);
const make_term_list = (l) => get('make', 'term_list')(l);

//############################################################################//
//                                                                            //
//                                installation                                //
//                                                                            //
//############################################################################//

install_rational_package(put, get, apply_generic);
install_is_equal_package(put, get, apply_generic);
install_polynomial_package(put, get, apply_generic);
install_term_package(put, get, apply_generic);

// order is important
const tower = list(install_real_package(put, get));

//############################################################################//
//                                                                            //
//                                  solution                                  //
//                                                                            //
//############################################################################//

function apply_generic(op, args) {
  const apply = (fun, args) => apply_in_underlying_javascript(fun, args);
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);

  if (!is_undefined(fun)) {
    try {
      return apply(fun, map(contents, args));
    } catch (err) {
      debugger;
      error(err, 'apply_generic');
    }
  } else {
    debugger;
    error(list(op, type_tags), 'no method for these types');
  }
}

//############################################################################//
//                                                                            //
//                                    tests                                   //
//                                                                            //
//############################################################################//

const p1 = make_polynomial(
  'x',
  make_term_list(list(make_term(5, make_real(1)), make_term(0, make_real(-1)))),
);
const p2 = make_polynomial(
  'x',
  make_term_list(list(make_term(2, make_real(1)), make_term(0, make_real(-1)))),
);
const z1 = make_polynomial('z', make_term_list(list(make_term(3, p1))));
const z2 = make_polynomial('z', make_term_list(list(make_term(3, p2))));

try {
  add(p1, p2);
} catch (error) {
  display(error, 'addition tests failed');
}
try {
  add(z1, z2);
} catch (error) {
  display(error, 'addition where coeffs are polys tests failed');
}
try {
  mul(p1, p2);
  mul(z1, z2);
} catch (error) {
  display(error, 'multiplication tests failed');
}
try {
  negate(p2);
} catch (error) {
  display(error, 'negation tests failed');
}
try {
  sub(p1, p2);
  sub(z1, z2);
} catch (error) {
  display(error, 'subtraction tests failed');
}
try {
  div(p1, p2);
} catch (error) {
  display(error, 'division tests failed');
}

const p3 = make_polynomial(
  'x',
  make_term_list(list(make_term(2, make_real(1)), make_term(0, make_real(1)))),
);
const p4 = make_polynomial(
  'x',
  make_term_list(list(make_term(3, make_real(1)), make_term(0, make_real(1)))),
);
const rf = make_rational(p4, p3);

display(add(rf, rf));

// [ "rational",
// [ [ "polynomial",
//   [ "x",
//   [ "term_list",
//   [ ["term", [5, [["real", 2], null]]],
//   [ ["term", [3, [["real", 2], null]]],
//   [["term", [2, [["real", 2], null]]], [["term", [0, [["real", 2], null]]], null]]]]]]],
// [ "polynomial",
// [ "x",
// [ "term_list",
// [ ["term", [4, [["real", 1], null]]],
// [["term", [2, [["real", 2], null]]], [["term", [0, [["real", 1], null]]], null]]]]]]]]

// p3 = x^2 + 1
// p4 = x^3 + 1
// rf = p4/p3 = (x^3 + 1)/(x^2 + 1)

// After multiplication and simplification becomes:
// (2x^5 + 2x^3 + 2x^2 + 2)/(x^4 + 2x^2 + 1)

// The result data structure shows:
// Numerator: 2x^5 + 2x^3 + 2x^2 + 2
// Denominator: x^4 + 2x^2 + 1
