import {
  pair,
  head,
  tail,
  list,
  math_atan2,
  math_cos,
  math_sin,
  math_sqrt,
} from 'sicp';

import { attach_tag } from './table-helper.js';

const square = (x) => x * x;

//############################################################################//
//                                                                            //
//                              integer package                               //
//                                                                            //
//############################################################################//

function install_integer_package(put, get) {
  const tag = (x) => attach_tag('integer', x);
  put('add', list('integer', 'integer'), (x, y) => tag(x + y));
  put('sub', list('integer', 'integer'), (x, y) => tag(x - y));
  put('mul', list('integer', 'integer'), (x, y) => tag(x * y));
  put('div', list('integer', 'integer'), (x, y) => tag(x / y));
  put('make', 'integer', (x) => tag(x));
  return 'integer';
}

//############################################################################//
//                                                                            //
//                          rational numbers package                          //
//                                                                            //
//############################################################################//

function install_rational_package(put, get) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const numer = (x) => head(x);
  const denom = (x) => tail(x);
  const make_rat = (n, d) => {
    const g = gcd(n, d);
    return pair(n / g, d / g);
  };
  const add_rat = (x, y) =>
    make_rat(numer(x) * denom(y) + numer(y) * denom(x), denom(x) * denom(y));
  const sub_rat = (x, y) =>
    make_rat(numer(x) * denom(y) - numer(y) * denom(x), denom(x) * denom(y));
  const mul_rat = (x, y) => make_rat(numer(x) * numer(y), denom(x) * denom(y));
  const div_rat = (x, y) => make_rat(numer(x) * denom(y), denom(x) * numer(y));
  const tag = (x) => attach_tag('rational', x);
  put('add', list('rational', 'rational'), (x, y) => tag(add_rat(x, y)));
  put('sub', list('rational', 'rational'), (x, y) => tag(sub_rat(x, y)));
  put('mul', list('rational', 'rational'), (x, y) => tag(mul_rat(x, y)));
  put('div', list('rational', 'rational'), (x, y) => tag(div_rat(x, y)));
  put('denom', 'rational', (x) => denom(x));
  put('numer', 'rational', (x) => numer(x));
  put('make', 'rational', (n, d) => tag(make_rat(n, d)));
  return 'rational';
}

//############################################################################//
//                                                                            //
//                            real numbers package                            //
//                                                                            //
//############################################################################//

function install_real_package(put, get) {
  const tag = (x) => attach_tag('real', x);
  put('add', list('real', 'real'), (x, y) => tag(x + y));
  put('sub', list('real', 'real'), (x, y) => tag(x - y));
  put('mul', list('real', 'real'), (x, y) => tag(x * y));
  put('div', list('real', 'real'), (x, y) => tag(x / y));
  put('make', 'real', (x) => tag(x));
  return 'real';
}

//############################################################################//
//                                                                            //
//                            rectangular package                             //
//                                                                            //
//############################################################################//

function install_cartesian_package(put, get) {
  const real_part = (z) => head(z);
  const imag_part = (z) => tail(z);
  const make_complex_cartesian = (x, y) => pair(x, y);
  const magnitude = (z) =>
    math_sqrt(square(real_part(z)) + square(imag_part(z)));
  const angle = (z) => math_atan2(imag_part(z), real_part(z));
  const make_complex_polar = (r, a) => pair(r * math_cos(a), r * math_sin(a));
  const tag = (x) => attach_tag('rectangular', x);

  put('real_part', list('rectangular'), real_part);
  put('imag_part', list('rectangular'), imag_part);
  put('magnitude', list('rectangular'), magnitude);
  put('angle', list('rectangular'), angle);
  put('make_complex_cartesian', 'rectangular', (x, y) =>
    tag(make_complex_cartesian(x, y)),
  );
  put('make_complex_polar', 'rectangular', (r, a) =>
    tag(make_complex_polar(r, a)),
  );
}

//############################################################################//
//                                                                            //
//                               polar package                                //
//                                                                            //
//############################################################################//

function install_polar_package(put, get) {
  const magnitude = (z) => head(z);
  const angle = (z) => tail(z);
  const make_complex_polar = (r, a) => pair(r, a);
  const real_part = (z) => magnitude(z) * math_cos(angle(z));
  const imag_part = (z) => magnitude(z) * math_sin(angle(z));
  const make_complex_cartesian = (x, y) =>
    pair(math_sqrt(square(x) + square(y)), math_atan2(y, x));
  const tag = (x) => attach_tag('polar', x);

  put('real_part', list('polar'), real_part);
  put('imag_part', list('polar'), imag_part);
  put('magnitude', list('polar'), magnitude);
  put('angle', list('polar'), angle);
  put('make_complex_cartesian', 'polar', (x, y) =>
    tag(make_complex_cartesian(x, y)),
  );
  put('make_complex_polar', 'polar', (r, a) => tag(make_complex_polar(r, a)));
}

//############################################################################//
//                                                                            //
//                              complex package                               //
//                                                                            //
//############################################################################//

function install_complex_package(
  put,
  get,
  real_part,
  imag_part,
  magnitude,
  angle,
) {
  const make_complex_cartesian = (x, y) =>
    get('make_complex_cartesian', 'rectangular')(x, y);
  const make_complex_polar = (r, a) => get('make_complex_polar', 'polar')(r, a);
  const add_complex = (z1, z2) =>
    make_complex_cartesian(
      real_part(z1) + real_part(z2),
      imag_part(z1) + imag_part(z2),
    );
  const sub_complex = (z1, z2) =>
    make_complex_cartesian(
      real_part(z1) - real_part(z2),
      imag_part(z1) - imag_part(z2),
    );
  const mul_complex = (z1, z2) =>
    make_complex_polar(magnitude(z1) * magnitude(z2), angle(z1) + angle(z2));
  const div_complex = (z1, z2) =>
    make_complex_polar(magnitude(z1) / magnitude(z2), angle(z1) - angle(z2));
  const tag = (z) => attach_tag('complex', z);

  put('add', list('complex', 'complex'), (z1, z2) => tag(add_complex(z1, z2)));
  put('sub', list('complex', 'complex'), (z1, z2) => tag(sub_complex(z1, z2)));
  put('mul', list('complex', 'complex'), (z1, z2) => tag(mul_complex(z1, z2)));
  put('div', list('complex', 'complex'), (z1, z2) => tag(div_complex(z1, z2)));
  put('make_complex_cartesian', 'complex', (x, y) =>
    tag(make_complex_cartesian(x, y)),
  );
  put('make_complex_polar', 'complex', (r, a) => tag(make_complex_polar(r, a)));
  return 'complex';
}

//############################################################################//
//                                                                            //
//                               raise package                                //
//                                                                            //
//############################################################################//

function install_raise_package(put, get) {
  const raise_to_rational = (n) => get('make', 'rational')(n, 1);
  const raise_to_real = (n, d) => get('make', 'real')(n / d);
  const raise_to_complex = (x) =>
    get('make_complex_cartesian', 'complex')(x, 0);
  const denom = (x) => get('denom', 'rational')(x);
  const numer = (x) => get('numer', 'rational')(x);

  put('raise', list('integer'), (x) => raise_to_rational(x));
  put('raise', list('rational'), (x) => raise_to_real(numer(x), denom(x)));
  put('raise', list('real'), (x) => raise_to_complex(x));
}

export {
  install_integer_package,
  install_rational_package,
  install_real_package,
  install_polar_package,
  install_cartesian_package,
  install_complex_package,
  install_raise_package,
  attach_tag,
};
