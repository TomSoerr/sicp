const check_terms_equal_to_zero = (terms) =>
  reduce(
    (prev, curr) => prev && is_equal_to_zero(coeff(tail(curr))),
    true,
    terms,
  );

put('is_equal_to_zero', list('polynomial'), (n) =>
  check_terms_equal_to_zero(term_list(n)),
);
