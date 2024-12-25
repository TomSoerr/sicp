function n_over_k(n, k) {
  return k === n || k === 0 ? 1 : n_over_k(n - 1, k - 1) + n_over_k(n - 1, k);
}

console.log(n_over_k(4, 2)); // => 6


