function f(n) {
  return n < 3 ? n : f(n - 1) + 2 * f(n - 2) + 3 * f(n - 3);
}

function f_iter(n) {
  return n < 3 ? n : iter(0, 1, 2, n - 2);
}

function iter(nMin3, nMin2, nMin1, count) {
  return count <= 0
    ? nMin1
    : iter(nMin2, nMin1, nMin1 + 2 * nMin2 + 3 * nMin3, --count);
}
