//############################################################################//
//                                                                            //
//                             dense term package                             //
//                                                                            //
//############################################################################//

function install_dense_term_package(put, get, apply_generic) {
  const generic_negate = (x) => apply_generic('neg', list(x));
  const tag = (p) => attach_tag('dense_term', p);
  const list_tag = (p) => attach_tag('dense_term_list', p);

  const is_equal_to_zero = (x) => apply_generic('is_equal_to_zero', list(x));

  const add = (x, y) => apply_generic('add', list(x, y));
  // const mul = (x, y) => apply_generic('mul', list(x, y));

  const make_term = (coeff) => tag(coeff);
  const coeff = contents;
  const negate_term = (t) => make_term(generic_negate(coeff(t)));
  const negate_term_list = (L) =>
    list_tag(map((t) => make_term(generic_negate(coeff(t))), L));

  const first_term = head;
  const rest_terms = tail;
  const the_empty_termlist = null;
  const is_empty_termlist = is_null;

  const adjoin_term = pair;

  function add_terms(L1, L2) {
    if (is_empty_termlist(L1)) {
      return L2;
    } else if (is_empty_termlist(L2)) {
      return L1;
    } else {
      const t1 = first_term(L1);
      const t2 = first_term(L2);
      return adjoin_term(
        make_term(add(coeff(t1), coeff(t2))),
        add_terms(rest_terms(L1), rest_terms(L2)),
      );
    }
  }

  put('neg', list('dense_term_list'), negate_term_list);
  put('make', 'dense_term', make_term);
  put('make', 'dense_term_list', (L) => list_tag(L));
  put('mul', list('dense_term_list', 'dense_term_list'), (L1, L2) =>
    error(list(L1, L2), 'multiplication not possible in this form'),
  );
  put('add', list('dense_term_list', 'dense_term_list'), (L1, L2) =>
    list_tag(add_terms(L1, L2)),
  );
  put('neg', list('dense_term'), negate_term);
}
