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

function miller_rabin_test(n, a) {
  return a === n
    ? true
    : expmod(a, n, n) === a % n
      ? miller_rabin_test(n, a + 1)
      : false;
}

console.log(miller_rabin_test(561, 1)); // true
console.log(miller_rabin_test(1105, 1)); // true
console.log(miller_rabin_test(1729, 1)); // true
console.log(miller_rabin_test(2465, 1)); // true
console.log(miller_rabin_test(2821, 1)); // true
console.log(miller_rabin_test(6601, 1)); // true

// all Carmichael numbers pass the Fermat test