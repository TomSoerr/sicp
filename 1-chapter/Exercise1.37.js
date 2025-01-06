function cont_frac(n, d, k) {
  function frac(i) {
    if (i < k) {
      return n(i) / (d(i) + frac(i + 1));
    }
    return n(i) / d(i);
  }

  return frac(1);
};

function cont_frac_iter(n, d, k) {
  function frac(amount, i) {
    if (i > 0) {
      return frac(n(i) / (d(i) + amount), i - 1)
    }
    return amount;
  }

  return frac(n(k) / d(k), k - 1);
};


console.log(cont_frac_iter(n => 1, d => 1, 11)); // 11 steps needed for 4 decimal places accuracy 