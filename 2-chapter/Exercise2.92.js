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
  install_term_package,
} from './arithmetic-packages.js';

import { get, put, type_tag, contents } from './table-helper.js';

//############################################################################//
//                                                                            //
//                             Generic operations                             //
//                                                                            //
//############################################################################//

const add = (x, y) => apply_generic('add', list(x, y));

const negate = (x) => apply_generic('neg', list(x));

const make_real = (n) => get('make', 'real')(n);

const make_polynomial = (variable, terms) =>
  get('make', 'polynomial')(variable, terms);
const make_term = (order, coeff) => get('make', 'term')(order, coeff);
const make_term_list = (l) => get('make', 'term_list')(l);

//############################################################################//
//                                                                            //
//                                installation                                //
//                                                                            //
//############################################################################//

install_is_equal_package(put, get, apply_generic);
install_polynomial_package(put, get, apply_generic);
install_term_package(put, get, apply_generic);

// order is important
const tower = list(install_real_package(put, get));

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

// 2x + x^2
const case1_1 = make_polynomial(
  'x',
  make_term_list(
    list(
      make_term(2, make_real(1)), // x^2
      make_term(1, make_real(2)), // 2x
    ),
  ),
);

// 5y^4 + y^5
const case1_2 = make_polynomial(
  'y',
  make_term_list(
    list(
      make_term(5, make_real(1)), // y^5
      make_term(4, make_real(5)), // 5y^4
    ),
  ),
);

display(add(case1_1, case1_2));

// See flip function in arithmetic-package for the method of extracting the
// dominant term of a polynomial to recursively sort an expression

// [
//   'polynomial',
//   [
//     'x',
//     [
//       'term_list',
//       [
//         ['term', [2, [['real', 1], null]]],
//         [
//           ['term', [1, [['real', 2], null]]],
//           [
//             [
//               'term',
//               [
//                 0,
//                 [
//                   [
//                     'polynomial',
//                     [
//                       'y',
//                       [
//                         'term_list',
//                         [
//                           ['term', [4, [['real', 5], null]]],
//                           [['term', [5, [['real', 1], null]]], null],
//                         ],
//                       ],
//                     ],
//                   ],
//                   null,
//                 ],
//               ],
//             ],
//             null,
//           ],
//         ],
//       ],
//     ],
//   ],
// ];
