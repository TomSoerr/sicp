function fib(n) {
  return fib_iter(1, 0, 0, 1, n - 1);
}
function fib_iter(a, b, p, q, count) {
  return count === 0
    ? b
    : !(count & 1)
      ? fib_iter( a,
                  b,
                  p * p + q * q, 
                  q * q + 2 * p * q,
                  count / 2)
      : fib_iter( b * q + a * q + a * p,
                  b * p + a * q,
                  p,
                  q,
                  count - 1);
}

