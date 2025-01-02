function smallest_divisor(n) {
  return find_divisor(n, 2);
}

function find_divisor(n, test_divisor) {
  return test_divisor * test_divisor > n
    ? n
    : n % test_divisor
      ? find_divisor(n, test_divisor + 1)
      : test_divisor;
}

// smallest_divisor(199) => 199
// smallest_divisor(1999) => 1999
// smallest_divisor(19999) => 7