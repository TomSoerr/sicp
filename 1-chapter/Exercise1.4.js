function plus(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function a_plus_abs_b(a, b) {
  return (b >= 0 ? plus : minus)(a, b);
}

// When b is smaller than 0 the ternary operator will return minus function. This will result in the calculation a - (-b). Otherwise a normal addition will be calculated. This is possible because JavaScript treats functions as first class citizens. 