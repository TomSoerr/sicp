function cont_frac(n, d, k) {
  function frac(i) {
    return (i <= k)
      ? n(i) / (d(i) + frac(i + 1))
      : 0; 
  }

  return frac(1);
}

function d(k) {
  if ((k + 1) % 3 === 0) {
    return ((k + 1) / 3) * 2;
  }
  return 1;
}

console.log(
  cont_frac(
    (n) => 1,
    d,
    50,
  ) + 2,
); // euler number