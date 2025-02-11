import {
  head,
  list,
  is_undefined,
  apply_in_underlying_javascript,
  error,
  map,
  display,
  is_null,
  tail,
  length,
  math_PI,
} from 'sicp';

import {
  install_real_package,
  install_sqrt_package,
  install_sin_cos_package,
  install_is_equal_package,
  install_polynomial_package,
  install_integer_package,
  install_negation_package,
} from './arithmetic-packages.js';

import { get, put, type_tag, contents } from './table-helper.js';
import { reduce } from './helper.js';

//############################################################################//
//                                                                            //
//                             Generic operations                             //
//                                                                            //
//############################################################################//

const add = (x, y) => apply_generic('add', list(x, y));
const sub = (x, y) => apply_generic('sub', list(x, y));
const mul = (x, y) => apply_generic('mul', list(x, y));
const div = (x, y) => apply_generic('div', list(x, y));
const negate = (x) => apply_generic('neg', list(x));

const is_equal = (x, y) => apply_generic('is_equal', list(x, y));
const is_equal_to_zero = (x) => apply_generic('is_equal_to_zero', list(x));

const make_real = (n) => get('make', 'real')(n);

const make_polynomial = (variable, terms) =>
  get('make', 'polynomial')(variable, terms);
const make_term = (order, coeff) => get('make', 'term')(order, coeff);

//############################################################################//
//                                                                            //
//                                installation                                //
//                                                                            //
//############################################################################//

install_sqrt_package(put, get, apply_generic);
install_sin_cos_package(put, get, apply_generic);
install_is_equal_package(put, get, apply_generic);
install_polynomial_package(put, get, apply_generic);
install_negation_package(put, get, apply_generic);

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
    return apply(fun, map(contents, args));
  } else {
    error(list(op, type_tags), 'no method for these types');
  }
}

//############################################################################//
//                                                                            //
//                                    test                                    //
//                                                                            //
//############################################################################//

const p1 = make_polynomial('x', list(make_term(2, make_real(2))));
const p2 = make_polynomial('x', list(make_term(2, make_real(5))));
const p3 = negate(p2);
const z1 = make_polynomial('z', list(make_term(3, p1)));
const z2 = make_polynomial('z', list(make_term(3, p2)));
const two = make_real(2);

try {
  add(p1, p2);
  add(z1, z2);
  mul(p1, p2);
  mul(z1, z2);
  sub(p1, p2);
  sub(z1, z2);
} catch (error) {
  display(error, 'Tests failed');
}

display(sub(z1, z2));
