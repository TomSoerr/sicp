'use strict';

function square(x) {
  return x * x;
}

function nontrivial_sqr_test(sq, n) {
  return (sq !== 1 && sq !== n - 1) && (sq * sq) % n === 1
    ? 0
    : sq;
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : exp & 1
      ? (base * expmod(base, exp - 1, m)) % m
      : nontrivial_sqr_test(square(expmod(base, exp / 2, m)), m) % m
    ;
}

function miller_rabin_test(n) {
  function try_it(a) {
    return expmod(a, n - 1, n) === 1 % n;
  }
  return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

// Carmichael numbers
console.log(miller_rabin_test(561));
console.log(miller_rabin_test(1105));
console.log(miller_rabin_test(1729));
console.log(miller_rabin_test(2465));
console.log(miller_rabin_test(2821));
console.log(miller_rabin_test(6601));


// normal numbers
console.log(miller_rabin_test(2330));
console.log(miller_rabin_test(3632));
console.log(miller_rabin_test(4664));
console.log(miller_rabin_test(9974));

// Prime numbers<
console.log(miller_rabin_test(3631));
console.log(miller_rabin_test(4663));
console.log(miller_rabin_test(9973));
