'use strict';

function square(x) {
  return x * x;
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : exp & 1
      ? (base * expmod(base, exp - 1, m)) % m
      : square(expmod(base, exp / 2, m)) % m;
}

function fermat_test(n) {
  function try_it(a) {
    return expmod(a, n, n) === a % n;
  }
  return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

function fast_is_prime(n, times) {
  return times === 0
    ? true
    : n === 1
      ? false
      : fermat_test(n)
        ? fast_is_prime(n, times - 1)
        : false;
}

function is_prime(n) {
  return fast_is_prime(n, 3);
}

////

function accumulate_filter(filter, combiner, null_value, term, a, next, b) {
  return a >= b
    ? null_value
    : combiner(
        filter(a) ? term(a) : null_value,
        accumulate_filter(filter, combiner, null_value, term, next(a), next, b),
      );
}

function sum_squared_primes(a, b) {
  function comb(x, y) {
    return x + y;
  }

  function term(x) {
    return x * x;
  }

  function next(x) {
    return x + 1;
  }

  return accumulate_filter(is_prime, comb, 0, term, a, next, b);
}

console.log(sum_squared_primes(0, 10)); // 87

function sum_primes_relativ(n) {
  function comb(x, y) {
    return x * y;
  }

  function term(x) {
    return x;
  }

  function next(x) {
    return x + 1;
  }

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  function filter(x) {
    return gcd(x, n) === 1 ? true : false
  }

  return accumulate_filter(filter, comb, 1, term, 1, next, n);
}

console.log(sum_primes_relativ(8)) // 105