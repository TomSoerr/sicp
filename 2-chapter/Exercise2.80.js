put(' is_equal_to_zero', list('complex', 'complex'), (z) => magnitude(z) === 0);

put(
  ' is_equal_to_zero',
  list('rational', 'rational'),
  (n) => numer(n) === 0 || denom(n) === 0,
);

put(
  ' is_equal_to_zero',
  list('"javascript_number", "javascript_number"'),
  (n) => n === 0,
);

function is_equal_to_zero(x) {
  return apply_generic('is_equal_to_zero', list(x));
}
