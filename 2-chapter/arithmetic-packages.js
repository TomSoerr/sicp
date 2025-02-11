import {
  pair,
  head,
  tail,
  list,
  math_atan2,
  math_cos,
  math_sin,
  math_sqrt,
  math_round,
  display,
  error,
  is_null,
  is_string,
} from 'sicp';

import { attach_tag, type_tag, contents } from './table-helper.js';
import { reduce } from './helper.js';

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

function install_cartesian_package(put, get, apply_generic) {
  const mul = (x, y) => apply_generic('mul', list(x, y));
  const add = (x, y) => apply_generic('add', list(x, y));
  const atan2 = (x, y) => apply_generic('atan2', list(x, y));
  const sqrt = (x) => apply_generic('sqrt', list(x));

  const square = (x) => mul(x, x);
  const real_part = (z) => head(z);
  const imag_part = (z) => tail(z);
  const make_complex_cartesian = (x, y) => pair(x, y);

  const magnitude = (z) =>
    sqrt(add(square(real_part(z)), square(imag_part(z))));
  const angle = (z) => atan2(imag_part(z), real_part(z));
  const tag = (x) => attach_tag('rectangular', x);

  put('real_part', list('rectangular'), real_part);
  put('imag_part', list('rectangular'), imag_part);
  put('magnitude', list('rectangular'), magnitude);
  put('angle', list('rectangular'), angle);
  put('make_complex_cartesian', 'rectangular', (x, y) =>
    tag(make_complex_cartesian(x, y)),
  );
}

//############################################################################//
//                                                                            //
//                               polar package                                //
//                                                                            //
//############################################################################//

function install_polar_package(put, get, apply_generic) {
  const mul = (x, y) => apply_generic('mul', list(x, y));
  const cos = (x) => apply_generic('cos', list(x));
  const sin = (x) => apply_generic('sin', list(x));

  const magnitude = (z) => head(z);
  const angle = (z) => tail(z);
  const make_complex_polar = (r, a) => pair(r, a);
  const real_part = (z) => mul(magnitude(z), cos(angle(z)));
  const imag_part = (z) => mul(magnitude(z), sin(angle(z)));
  const tag = (x) => attach_tag('polar', x);

  put('real_part', list('polar'), real_part);
  put('imag_part', list('polar'), imag_part);
  put('magnitude', list('polar'), magnitude);
  put('angle', list('polar'), angle);
  put('make_complex_polar', 'polar', (r, a) => tag(make_complex_polar(r, a)));
}

//############################################################################//
//                                                                            //
//                              complex package                               //
//                                                                            //
//############################################################################//

function install_complex_package(put, get, apply_generic) {
  const add = (x, y) => apply_generic('add', list(x, y));
  const sub = (x, y) => apply_generic('sub', list(x, y));
  const mul = (x, y) => apply_generic('mul', list(x, y));
  const div = (x, y) => apply_generic('div', list(x, y));

  const real_part = (z) => apply_generic('real_part', list(z));
  const imag_part = (z) => apply_generic('imag_part', list(z));
  const magnitude = (z) => apply_generic('magnitude', list(z));
  const angle = (z) => apply_generic('angle', list(z));

  const make_complex_cartesian = (x, y) =>
    get('make_complex_cartesian', 'rectangular')(x, y);
  const make_complex_polar = (r, a) => get('make_complex_polar', 'polar')(r, a);
  const add_complex = (z1, z2) =>
    make_complex_cartesian(
      add(real_part(z1), real_part(z2)),
      add(imag_part(z1), imag_part(z2)),
    );

  const sub_complex = (z1, z2) =>
    make_complex_cartesian(
      sub(real_part(z1), real_part(z2)),
      sub(imag_part(z1), imag_part(z2)),
    );
  const mul_complex = (z1, z2) =>
    make_complex_polar(
      mul(magnitude(z1), magnitude(z2)),
      add(angle(z1), angle(z2)),
    );
  const div_complex = (z1, z2) =>
    make_complex_polar(
      div(magnitude(z1), magnitude(z2)),
      sub(angle(z1), angle(z2)),
    );
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
//                                sqrt package                                //
//                                                                            //
//############################################################################//

const to_javascript_number = (numer, denom) => (x) =>
  type_tag(x) === 'complex' ? error(x, 'to js not defined for complex')
  : type_tag(x) === 'rational' ? numer(x) / denom(x)
  : contents(x);

function install_sqrt_package(put, get, apply_generic) {
  const denom = (x) => get('denom', 'rational')(x);
  const numer = (x) => get('numer', 'rational')(x);
  const value = to_javascript_number(numer, denom);
  const make_real = (n) => get('make', 'real')(n);

  const sqrt = (x) => make_real(math_sqrt(x));

  put('sqrt', list('integer'), sqrt);
  put('sqrt', list('rational'), (x) => sqrt(numer(x) / denom(x))); // test and fix this
  put('sqrt', list('real'), sqrt);
  put('sqrt', list('complex'), (x) => error(x, 'sqrt not defined for complex'));
}

//############################################################################//
//                                                                            //
//                            sine cosine package                             //
//                                                                            //
//############################################################################//

function install_sin_cos_package(put, get, apply_generic) {
  const denom = (x) => get('denom', 'rational')(x);
  const numer = (x) => get('numer', 'rational')(x);
  const value = to_javascript_number(numer, denom);
  const make_real = (n) => get('make', 'real')(n);

  const atan2 = (x, y) => make_real(math_atan2(x, y));

  put('atan2', list('integer', 'integer'), atan2);
  put('atan2', list('rational', 'rational'), (x, y) =>
    atan2(numer(x) / denom(x), numer(y) / denom(y)),
  );
  put('atan2', list('real', 'real'), atan2);
  put('atan2', list('complex', 'complex'), (x, y) =>
    error(pair(x, y), 'atan2 not defined for complex'),
  );

  const sin = (x) => make_real(math_sin(x));
  const cos = (x) => make_real(math_cos(x));

  put('sin', list('integer'), sin);
  put('sin', list('rational'), (x) => sin(numer(x) / denom(x)));
  put('sin', list('real'), sin);
  put('sin', list('complex'), (x) => error(x, 'sin not defined for complex'));

  put('cos', list('integer'), cos);
  put('cos', list('rational'), (x) => cos(numer(x) / denom(x)));
  put('cos', list('real'), cos);
  put('cos', list('complex'), (x) => error(x, 'cos not defined for complex'));
}

//############################################################################//
//                                                                            //
//                               raise package                                //
//                                                                            //
//############################################################################//

function install_raise_package(put, get) {
  const make_real = (n) => get('make', 'real')(n);
  const raise_to_rational = (n) => get('make', 'rational')(n, 1);
  const raise_to_real = (n, d) => get('make', 'real')(n / d);
  const raise_to_complex = (x) =>
    get('make_complex_cartesian', 'complex')(make_real(x), make_real(0));
  const denom = (x) => get('denom', 'rational')(x);
  const numer = (x) => get('numer', 'rational')(x);

  put('raise', list('integer'), (x) => raise_to_rational(x));
  put('raise', list('rational'), (x) => raise_to_real(numer(x), denom(x)));
  put('raise', list('real'), (x) => raise_to_complex(x));
}

//############################################################################//
//                                                                            //
//                              project package                               //
//                                                                            //
//############################################################################//

function install_project_package(put, get, apply_generic) {
  const real_part = (z) => apply_generic('real_part', list(z));
  const numer = (x) => get('numer', 'rational')(x);
  const make_integer = (x) => get('make', 'integer')(x);

  put('project', list('complex'), (z) => real_part(z));
  put('project', list('real'), (x) => make_integer(math_round(x)));
  put('project', list('rational'), (x) => make_integer(numer(x)));
}

//############################################################################//
//                                                                            //
//                              is equal package                              //
//                                                                            //
//############################################################################//

function install_is_equal_package(put, get, apply_generic) {
  const real_part = (z) => apply_generic('real_part', list(z));
  const imag_part = (z) => apply_generic('imag_part', list(z));
  const denom = (x) => get('denom', 'rational')(x);
  const numer = (x) => get('numer', 'rational')(x);
  const is_equal = (x, y) => apply_generic('is_equal', list(x, y));
  const magnitude = (z) => apply_generic('magnitude', list(z));

  const is_equal_to_zero = (x) => apply_generic('is_equal_to_zero', list(x));
  const term_list = tail;
  const coeff = (term) => head(tail(term));
  const first_term = head;
  const rest_terms = tail;

  put(
    'is_equal',
    list('complex', 'complex'),
    (z1, z2) =>
      is_equal(imag_part(z1), imag_part(z2)) &&
      is_equal(real_part(z1), real_part(z2)),
  );
  put(
    'is_equal',
    list('rational', 'rational'),
    (r1, r2) => numer(r1) === numer(r1) && denom(r1) === denom(r2),
  );
  put('is_equal', list('integer', 'integer'), (n1, n2) => n1 === n2);
  put('is_equal', list('real', 'real'), (n1, n2) => n1 === n2);

  put(
    'is_equal_to_zero',
    list('rational'),
    (n) => numer(n) === 0 || denom(n) === 0,
  );
  put('is_equal_to_zero', list('integer'), (n) => n === 0);
  put('is_equal_to_zero', list('real'), (n) => n === 0);

  const check_terms_equal_to_zero = (terms) =>
    reduce(
      (prev, curr) => prev && is_equal_to_zero(coeff(tail(curr))),
      true,
      terms,
    );

  put('is_equal_to_zero', list('polynomial'), (n) =>
    check_terms_equal_to_zero(term_list(n)),
  );
}

//############################################################################//
//                                                                            //
//                                poly package                                //
//                                                                            //
//############################################################################//

function install_polynomial_package(put, get, apply_generic) {
  const is_variable = is_string;
  const the_empty_termlist = null;

  const add = (x, y) => apply_generic('add', list(x, y));
  const mul = (x, y) => apply_generic('mul', list(x, y));

  const is_same_variable = (v1, v2) =>
    is_variable(v1) && is_variable(v2) && v1 === v2;
  const is_equal_to_zero = (x) => apply_generic('is_equal_to_zero', list(x));

  const make_poly = (variable, term_list) => pair(variable, term_list);
  const variable = (p) => head(p);
  const term_list = (p) => tail(p);

  const adjoin_term = (term, term_list) =>
    is_equal_to_zero(head(tail(term))) ? term_list : pair(term, term_list);
  const first_term = (term_list) => head(term_list);
  const rest_terms = (term_list) => tail(term_list);
  const is_empty_termlist = (term_list) => is_null(term_list);

  const make_term = (order, coeff) => list(order, coeff);
  const order = (term) => head(tail(term));
  const coeff = (term) => head(tail(tail(term)));

  const add_poly = (p1, p2) =>
    is_same_variable(variable(p1), variable(p2)) ?
      make_poly(variable(p1), add_terms(term_list(p1), term_list(p2)))
    : error(list(p1, p2), 'polys not in same var -- add_poly');

  function add_terms(L1, L2) {
    if (is_empty_termlist(L1)) {
      return L2;
    } else if (is_empty_termlist(L2)) {
      return L1;
    } else {
      const t1 = first_term(L1);
      const t2 = first_term(L2);
      return (
        order(t1) > order(t2) ? adjoin_term(t1, add_terms(rest_terms(L1), L2))
        : order(t1) < order(t2) ? adjoin_term(t2, add_terms(L1, rest_terms(L2)))
        : adjoin_term(
            make_term(order(t1), add(coeff(t1), coeff(t2))),
            add_terms(rest_terms(L1), rest_terms(L2)),
          )
      );
    }
  }
  const mul_poly = (p1, p2) =>
    is_same_variable(variable(p1), variable(p2)) ?
      make_poly(variable(p1), mul_terms(term_list(p1), term_list(p2)))
    : error(list(p1, p2), 'polys not in same var -- mul_poly');
  const mul_terms = (L1, L2) =>
    is_empty_termlist(L1) ? the_empty_termlist : (
      add_terms(
        mul_term_by_all_terms(first_term(L1), L2),
        mul_terms(rest_terms(L1), L2),
      )
    );
  function mul_term_by_all_terms(t1, L) {
    if (is_empty_termlist(L)) {
      return the_empty_termlist;
    } else {
      const t2 = first_term(L);
      return adjoin_term(
        make_term(order(t1) + order(t2), mul(coeff(t1), coeff(t2))),
        mul_term_by_all_terms(t1, rest_terms(L)),
      );
    }
  }

  const tag = (p) => attach_tag('polynomial', p);
  put('add', list('polynomial', 'polynomial'), (p1, p2) =>
    tag(add_poly(p1, p2)),
  );
  put('mul', list('polynomial', 'polynomial'), (p1, p2) =>
    tag(mul_poly(p1, p2)),
  );
  put('make', 'polynomial', (variable, terms) =>
    tag(make_poly(variable, terms)),
  );
  put('make_term', 'polynomial', (order, coeff) =>
    tag(make_term(order, coeff)),
  );
}

//############################################################################//
//                                                                            //
//                              negation package                              //
//                                                                            //
//############################################################################//

function install_negation_package(put, get, apply_generic) {
  const real_part = (z) => apply_generic('real_part', list(z));
  const numer = (x) => get('numer', 'rational')(x);
  const make_integer = (x) => get('make', 'integer')(x);

  put('project', list('complex'), (z) => real_part(z));
  put('project', list('real'), (x) => make_integer(math_round(x)));
  put('project', list('rational'), (x) => make_integer(numer(x)));
}

export {
  install_integer_package,
  install_rational_package,
  install_real_package,
  install_polar_package,
  install_cartesian_package,
  install_complex_package,
  install_raise_package,
  install_project_package,
  attach_tag,
  install_sqrt_package,
  install_sin_cos_package,
  install_polynomial_package,
  install_is_equal_package,
};
