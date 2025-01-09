function cont_frac(n, d, k) {
  function frac(i) {
    return i <= k ? n(i) / (d(i) + frac(i + 1)) : 0;
  }

  return frac(1);
}

function tan_cf(x, k) {
  return cont_frac(
    (n) => (n === 1 ? x : -x * x),
    (d) => d * 2 - 1,
    k,
  );
}

console.log(tan_cf(1.2, 100)); // 2.5721516221263188
