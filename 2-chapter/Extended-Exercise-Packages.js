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
  map,
  append,
} from 'sicp';

import { attach_tag, type_tag, contents } from './table-helper.js';
import { reduce, sort_list, list_to_array } from './helper.js';

//############################################################################//
//                                                                            //
//                          rational numbers package                          //
//                                                                            //
//############################################################################//

function install_rational_package(put, get, apply_generic) {
  const add = (x, y) => apply_generic('add', list(x, y));
  const mul = (x, y) => apply_generic('mul', list(x, y));
  const sub = (x, y) => apply_generic('sub', list(x, y));
  const div = (x, y) => apply_generic('div', list(x, y));
  const gcd = (x, y) => apply_generic('gcd', list(x, y));
  const make_real = (n) => get('make', 'real')(n);
  const gcd_rational = (a, b) => (b === 0 ? make_real(a) : gcd(b, a % b));

  const numer = (x) => head(x);
  const denom = (x) => tail(x);
  const make_rat = (n, d) => {
    const g = gcd(n, d);
    return pair(div(n, g), div(d, g));
  };

  const add_rat = (x, y) =>
    make_rat(
      add(mul(numer(x), denom(y)), mul(numer(y), denom(x))),
      mul(denom(x), denom(y)),
    );
  const sub_rat = (x, y) =>
    make_rat(
      sub(mul(numer(x), denom(y)), mul(numer(y), denom(x))),
      mul(denom(x), denom(y)),
    );
  const mul_rat = (x, y) =>
    make_rat(mul(numer(x), numer(y)), mul(denom(x), denom(y)));
  const div_rat = (x, y) =>
    make_rat(mul(numer(x), denom(y)), mul(denom(x), numer(y)));

  const tag = (x) => attach_tag('rational', x);
  put('add', list('rational', 'rational'), (x, y) => tag(add_rat(x, y)));
  put('sub', list('rational', 'rational'), (x, y) => tag(sub_rat(x, y)));
  put('mul', list('rational', 'rational'), (x, y) => tag(mul_rat(x, y)));
  put('div', list('rational', 'rational'), (x, y) => tag(div_rat(x, y)));
  put('gcd', list('rational', 'rational'), (x, y) => gcd_rational(x, y));
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
  put('neg', list('real'), (x) => tag(-1 * x));
  put('get_dominant', list('real'), (t) => tag(t));
  return 'real';
}

//############################################################################//
//                                                                            //
//                              is equal package                              //
//                                                                            //
//############################################################################//

function install_is_equal_package(put, get, apply_generic) {
  const denom = (x) => get('denom', 'rational')(x);
  const numer = (x) => get('numer', 'rational')(x);
  const term_list = tail;
  const is_equal_to_zero = (x) => apply_generic('is_equal_to_zero', list(x));
  const is_equal = (x, y) => apply_generic('is_equal', list(x, y));
  const coeff = (term) => head(tail(term));

  const check_terms_equal_to_zero = (terms) =>
    reduce(
      (prev, curr) => prev && is_equal_to_zero(coeff(tail(curr))),
      true,
      terms,
    );

  put(
    'is_equal',
    list('rational', 'rational'),
    (r1, r2) =>
      is_equal(numer(r1), numer(r1)) && is_equal(denom(r1), denom(r2)),
  );
  put('is_equal', list('real', 'real'), (n1, n2) => n1 === n2);
  put(
    'is_equal_to_zero',
    list('rational'),
    (n) => numer(n) === 0 || denom(n) === 0,
  );
  put('is_equal_to_zero', list('real'), (n) => n === 0);
  put('is_equal_to_zero', list('polynomial'), (n) =>
    check_terms_equal_to_zero(contents(term_list(n))),
  );
}

//############################################################################//
//                                                                            //
//                                poly package                                //
//                                                                            //
//############################################################################//

function install_polynomial_package(put, get, apply_generic) {
  const generic_negate = (x) => apply_generic('neg', list(x));

  const add = (x, y) => apply_generic('add', list(x, y));
  const mul = (x, y) => apply_generic('mul', list(x, y));
  const div = (x, y) => apply_generic('div', list(x, y));
  const is_equal = (x, y) => apply_generic('is_equal', list(x, y));
  const gcd = (x, y) => apply_generic('gcd', list(x, y));

  const sort = (x) => apply_generic('sort', list(x));
  const simplify = (x) => apply_generic('simplify', list(x));

  const tag = (p) => attach_tag('polynomial', p);

  const is_variable = is_string;
  const is_same_variable = (v1, v2) =>
    is_variable(v1) && is_variable(v2) && v1 === v2;

  const make_poly = (variable, term_list) => pair(variable, term_list);
  const variable = head;
  const term_list = tail;

  const add_poly = (p1, p2) =>
    is_same_variable(variable(p1), variable(p2)) ?
      make_poly(variable(p1), add(term_list(p1), term_list(p2)))
    : error(list(p1, p2), 'polys not in same var -- add_poly');

  const mul_poly = (p1, p2) =>
    is_same_variable(variable(p1), variable(p2)) ?
      make_poly(variable(p1), simplify(mul(term_list(p1), term_list(p2))))
    : error(list(p1, p2), 'polys not in same var -- mul_poly');

  const negate_poly = (p) =>
    make_poly(variable(p), generic_negate(term_list(p)));

  const div_poly = (p1, p2) =>
    is_same_variable(variable(p1), variable(p2)) ?
      make_poly(variable(p1), div(term_list(p1), term_list(p2)))
    : error(list(p1, p2), 'polys not in same var -- div_poly');

  function sort_poly(p) {
    return make_poly(variable(p), sort(term_list(p)));
  }

  function simplify_poly(p) {
    return make_poly(variable(p), simplify(term_list(p)));
  }

  function is_equal_poly(p1, p2) {
    return (
      is_null(p1) ? is_null(p2)
      : is_null(p2) ? is_null(p1)
      : is_same_variable(variable(p1), variable(p2)) &&
        is_equal(term_list(p1), term_list(p2))
    );
  }

  const gcd_poly = (p1, p2) =>
    is_same_variable(variable(p1), variable(p2)) ?
      make_poly(variable(p1), gcd(term_list(p1), term_list(p2)))
    : error(list(p1, p2), 'polys not in same var -- gcd_poly');

  put('add', list('polynomial', 'polynomial'), (p1, p2) =>
    tag(add_poly(p1, p2)),
  );
  put('sub', list('polynomial', 'polynomial'), (p1, p2) =>
    tag(add_poly(p1, negate_poly(p2))),
  );
  put('mul', list('polynomial', 'polynomial'), (p1, p2) =>
    tag(mul_poly(p1, p2)),
  );
  put('div', list('polynomial', 'polynomial'), (p1, p2) =>
    tag(div_poly(p1, p2)),
  );
  put('gcd', list('polynomial', 'polynomial'), (p1, p2) =>
    tag(gcd_poly(p1, p2)),
  );
  put('make', 'polynomial', (variable, terms) =>
    tag(make_poly(variable, terms)),
  );
  put('variable', list('polynomial'), variable);
  put('neg', list('polynomial'), (p) => tag(negate_poly(p)));
  put('sort', list('polynomial'), (p) => tag(sort_poly(p)));
  put('simplify', list('polynomial'), (p) => tag(simplify_poly(p)));
  put('is_equal', list('polynomial', 'polynomial'), is_equal_poly);
}

//############################################################################//
//                                                                            //
//                                term package                                //
//                                                                            //
//############################################################################//

function install_term_package(put, get, apply_generic) {
  // import

  const generic_negate = (x) => apply_generic('neg', list(x));
  const tag = (p) => attach_tag('term', p);
  const list_tag = (p) => attach_tag('term_list', p);

  const is_equal_to_zero = (x) => apply_generic('is_equal_to_zero', list(x));
  const is_equal = (x, y) => apply_generic('is_equal', list(x, y));

  const add = (x, y) => apply_generic('add', list(x, y));
  const mul = (x, y) => apply_generic('mul', list(x, y));
  const div = (x, y) => apply_generic('div', list(x, y));

  // helpers

  const make_term = (order, coeff) => tag(list(order, coeff));
  const order = (term) => head(contents(term));
  const coeff = (term) => head(tail(contents(term)));
  const negate_term = (t) => make_term(order(t), generic_negate(coeff(t)));
  const negate_term_list = (L) =>
    list_tag(map((t) => make_term(order(t), generic_negate(coeff(t))), L));

  const first_term = head;
  const rest_terms = tail;
  const the_empty_termlist = null;
  const is_empty_termlist = is_null;

  // addition

  const adjoin_term = (term, term_list) =>
    is_equal_to_zero(coeff(term)) ? term_list : pair(term, term_list);

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

  // multiplication

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
        make_term(
          order(t1) + order(t2),
          mul(coeff(t1), coeff(t2)),
          type_tag(t2),
        ),
        mul_term_by_all_terms(t1, rest_terms(L)),
      );
    }
  }

  // long division

  function div_terms(L1, L2) {
    if (is_empty_termlist(L1)) {
      return list(the_empty_termlist, the_empty_termlist);
    } else {
      const t1 = first_term(L1);
      const t2 = first_term(L2);
      if (order(t2) > order(t1)) {
        return pair(the_empty_termlist, L1);
      } else {
        const new_c = div(coeff(t1), coeff(t2));
        const new_o = order(t1) - order(t2);
        const new_term = make_term(new_o, new_c);

        const new_term_list = add_terms(
          L1,
          contents(negate_term_list(mul_terms(list(new_term), L2))),
        );
        const rest_of_result = div_terms(new_term_list, L2);
        return pair(head(new_term_list), rest_of_result);
      }
    }
  }

  // remainder terms

  function remainder_terms(L1, L2) {
    function redu(prev, curr) {
      if (prev === true) return pair(curr, null);
      if (is_null(curr)) return true;
      if (prev === false) return false;
      return pair(curr, prev);
    }
    const result = div_terms(L1, L2);
    const remainder = sort_term_list(reduce(redu, false, result));

    // if remainder is null, return null
    // if result null, return real 1 (then the next remainder will be null and result of gcc real 1)

    display(result);
    debugger;
  }

  // gcd terms

  const gcd_terms = (a, b) =>
    is_empty_termlist(b) ? list_tag(a) : gcd_terms(b, remainder_terms(a, b));

  // lex ordering

  function sort_term_list(L) {
    const compare = (i1, i2) =>
      order(i1) > order(i2) ? 1
      : order(i1) < order(i2) ? -1
      : order(i1) === order(i2) ? 0
      : error(list(i1, i2), 'error while comparing terms');

    return sort_list(compare, L);
  }

  // simplify term_list

  function simplify_term_list(L1) {
    return sort_term_list(
      reduce(
        (prev, curr) =>
          is_null(prev) ? pair(curr, null)
          : order(head(prev)) === order(curr) ?
            pair(
              make_term(order(curr), add(coeff(head(prev)), coeff(curr))),
              tail(prev),
            )
          : pair(curr, prev),
        null,
        sort_term_list(L1),
      ),
    );
  }

  // is equal

  function is_equal_term_list(L1, L2) {
    return (
      is_null(L1) ? is_null(L2)
      : is_null(L2) ? is_null(L1)
      : is_equal(head(L1), head(L2)) && is_equal_term_list(tail(L1), tail(L2))
    );
  }

  function is_equal_term(t1, t2) {
    return (
      order(tag(t1)) === order(tag(t2)) &&
      type_tag(coeff(tag(t1))) === type_tag(coeff(tag(t2))) &&
      is_equal(coeff(tag(t1)), coeff(tag(t2)))
    );
  }

  // export

  put('neg', list('term'), negate_term);
  put('neg', list('term_list'), negate_term_list);
  put('make', 'term', (order, coeff) => make_term(order, coeff));
  put('make', 'term_list', (L) => list_tag(L));
  put('mul', list('term_list', 'term_list'), (L1, L2) =>
    list_tag(mul_terms(L1, L2)),
  );
  put('div', list('term_list', 'term_list'), (L1, L2) =>
    list_tag(div_terms(L1, L2)),
  );
  put('add', list('term_list', 'term_list'), (L1, L2) =>
    list_tag(add_terms(L1, L2)),
  );
  put('sort', list('term_list'), (L1) => list_tag(sort_term_list(L1)));
  put('simplify', list('term_list'), (L1) => list_tag(simplify_term_list(L1)));
  put('is_equal', list('term_list', 'term_list'), is_equal_term_list);
  put('is_equal', list('term', 'term'), is_equal_term);
  put('gcd', list('term_list', 'term_list'), gcd_terms);
}

export {
  install_rational_package,
  install_real_package,
  attach_tag,
  install_polynomial_package,
  install_is_equal_package,
  install_term_package,
};
