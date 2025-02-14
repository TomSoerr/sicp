function remainder_terms(L1, L2) {
  function redu(prev, curr) {
    if (prev === true) return is_null(curr) ? null : pair(curr, null);
    if (is_null(curr)) return true;
    if (prev === false) return false;
    return pair(curr, prev);
  }

  const result = div_terms(L1, L2);
  const remainder = reduce(redu, false, result);

  return is_null(remainder) ? remainder : sort_term_list(remainder);
}

// gcd terms

function gcd_terms(a, b) {
  const gcd_iter = (x, y) =>
    is_empty_termlist(y) ? list_tag(x) : gcd_iter(y, remainder_terms(x, y));

  const result = gcd_iter(a, b);
  return result;
}

function gcd_div_terms(L1, L2) {
  const iter = (terms) =>
    is_null(head(terms)) ? null : pair(head(terms), iter(tail(terms)));

  const result = iter(div_terms(L1, L2));
  return result;
}
