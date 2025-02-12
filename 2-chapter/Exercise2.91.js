// long division

function div_terms(L1, L2) {
  if (is_empty_termlist(L1)) {
    return list(the_empty_termlist, the_empty_termlist);
  } else {
    const t1 = first_term(L1);
    const t2 = first_term(L2);
    if (order(t2) > order(t1)) {
      return list(the_empty_termlist, L1);
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
