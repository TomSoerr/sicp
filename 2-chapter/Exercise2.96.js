// gcd terms

function gcd_terms(a, b) {
  const gcd_iter = (x, y) =>
    is_empty_termlist(y) ?
      list_tag(x)
    : gcd_iter(y, pseudoremainder_terms(x, y));

  const result = gcd_iter(a, b);

  // reduce result common factors form coefficients
  const coeffs = map(coeff, contents(result));

  // Find their GCD using reduce
  const coeff_gcd = reduce((a, b) => gcd(a, b), head(coeffs), tail(coeffs));

  return list_tag(
    map(
      (term) =>
        make_term(head(tail(term)), div(head(tail(tail(term))), coeff_gcd)),
      contents(result),
    ),
  );
}
