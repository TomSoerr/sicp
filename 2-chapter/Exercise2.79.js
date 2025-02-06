put(
  'is_equal',
  list('complex', 'complex'),
  (z1, z2) =>
    imag_part(z1) === imag_part(z2) && real_part(z1) === real_part(z2),
);

put(
  'is_equal',
  list('rational', 'rational'),
  (r1, r2) => numer(r1) === numer(r1) && denom(r1) === denom(r2),
);

put(
  'is_equal',
  list('"javascript_number", "javascript_number"'),
  (n1, n2) => (n1 = n2),
);

function is_equal(x, y) {
  return apply_generic('is_equal', list(x, y));
}
