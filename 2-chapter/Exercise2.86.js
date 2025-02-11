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
  install_integer_package,
  install_rational_package,
  install_real_package,
  install_cartesian_package,
  install_polar_package,
  install_complex_package,
  install_raise_package,
  install_project_package,
  install_sqrt_package,
  install_sin_cos_package,
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

const real_part = (z) => apply_generic('real_part', list(z));
const imag_part = (z) => apply_generic('imag_part', list(z));
const magnitude = (z) => apply_generic('magnitude', list(z));
const angle = (z) => apply_generic('angle', list(z));

const raise = (x) => apply_generic('raise', list(x));
const is_equal = (x, y) => apply_generic('is_equal', list(x, y));

const make_integer = (n) => get('make', 'integer')(n);
const make_rational = (n, d) => get('make', 'rational')(n, d);
const make_real = (n) => get('make', 'real')(n);
const make_complex_cartesian = (x, y) =>
  get('make_complex_cartesian', 'complex')(x, y);
const make_complex_polar = (r, a) => get('make_complex_polar', 'complex')(r, a);

//############################################################################//
//                                                                            //
//                                installation                                //
//                                                                            //
//############################################################################//

install_cartesian_package(put, get, apply_generic);
install_polar_package(put, get, apply_generic);
install_raise_package(put, get);
install_project_package(put, get, apply_generic);
install_sqrt_package(put, get, apply_generic);
install_sin_cos_package(put, get, apply_generic);

// order is important
const tower = list(
  install_integer_package(put, get),
  install_rational_package(put, get),
  install_real_package(put, get),
  install_complex_package(put, get, apply_generic),
);

function get_position(type) {
  const pos = (count, xs) =>
    is_null(xs) ? undefined
    : head(xs) === type ? count
    : pos(count + 1, tail(xs));
  return pos(0, tower);
}

//############################################################################//
//                                                                            //
//                                  solution                                  //
//                                                                            //
//############################################################################//

function apply_generic(op, args) {
  const apply = (fun, args) => apply_in_underlying_javascript(fun, args);

  const successive_raise = (number, count) =>
    count <= 0 ? number : raise(successive_raise(number, count - 1));

  function drop(number) {
    if (type_tag(number) === head(tower)) return number;
    const projection = apply_generic('project', list(number));
    return !is_equal(number, projection) ? number : drop(projection);
  }

  const all_the_same = (xs) =>
    reduce(
      (prev, curr) =>
        is_undefined(prev) ? curr
        : !prev ? false
        : prev === curr ? curr
        : false,
      undefined,
      xs,
    );

  const type_tags = map(type_tag, args);

  const fun = get(op, type_tags);

  if (!is_undefined(fun) && op !== 'is_equal' && length(args) > 1) {
    return drop(apply(fun, map(contents, args)));
  } else if (!is_undefined(fun)) {
    return apply(fun, map(contents, args));
  } else if (all_the_same(type_tags)) {
    error(list(op, type_tags), 'no method for these types');
  } else {
    const type_tags_rank = map((x) => get_position(x), type_tags);
    const max_rank = reduce(
      (prev, curr) => (curr > prev ? curr : prev),
      0,
      type_tags_rank,
    );
    const new_args = map(
      (arg) => successive_raise(arg, max_rank - get_position(type_tag(arg))),
      args,
    );

    return apply_generic(op, new_args);
  }
}

const z1 = make_complex_polar(make_integer(1), make_real(math_PI / 2));
const z2 = make_complex_cartesian(make_integer(0), make_rational(1, 1));
const z3 = make_complex_cartesian(z1, z1);
const z4 = make_complex_cartesian(z2, z2);
const i1 = make_integer(3);
const r1 = make_real(5);
const r2 = make_real(5);
const rr1 = make_rational(1, 3);

display(mul(z2, z1));

// First, we need to change the implementation of the complex package. Instead of JavaScript arithmetic operations, we need to use your own generic function for addition, multiplication, subtraction and division. Then we must change the implementation of that use complex numbers, so they use generic operations. This includes the raise, is_equal, sqrt, sin, cos and atan2. After this, the imaginary part and real part can be an integer, a rational number or a real number.
