import {
  list,
  is_undefined,
  apply_in_underlying_javascript,
  error,
  map,
  display,
  tail,
} from 'sicp';

import {
  install_real_package,
  install_is_equal_package,
  install_polynomial_package,
  install_rational_package,
  install_term_package,
} from './Extended-Exercise-Packages.js';

import { get, put, type_tag, contents } from './table-helper.js';

import { l_to_arr, tl_to_arr } from './helper.js';

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
const gcd = (x, y) => apply_generic('gcd', list(x, y));
const gcd_div = (x, y) => apply_generic('gcd_div', list(x, y));

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

const P1 = make_polynomial(
  'x',
  make_term_list(list(make_term(1, make_real(1)), make_term(0, make_real(1)))),
);

const P2 = make_polynomial(
  'x',
  make_term_list(list(make_term(3, make_real(1)), make_term(0, make_real(-1)))),
);

const P3 = make_polynomial(
  'x',
  make_term_list(list(make_term(1, make_real(1)))),
);

const P4 = make_polynomial(
  'x',
  make_term_list(list(make_term(2, make_real(1)), make_term(0, make_real(-1)))),
);

const Q1 = make_rational(P1, P2);

const Q2 = make_rational(P3, P4);

display(add(Q1, Q2));

// [ "rational",
// [ [ "polynomial",
//   [ "x",
//   [ "term_list",
//   [ ["term", [3, [["real", 1], null]]],
//   [ ["term", [2, [["real", 2], null]]],
//   [["term", [1, [["real", 3], null]]], [["term", [0, [["real", 1], null]]], null]]]]]]],
// [ "polynomial",
// [ "x",
// [ "term_list",
// [ ["term", [4, [["real", 1], null]]],
// [ ["term", [3, [["real", 1], null]]],
// [["term", [1, [["real", -1], null]]], [["term", [0, [["real", -1], null]]], null]]]]]]]]]
