function f(n) {
  return n < 3 ? n : f(n - 1) + 2 * f(n - 2) + 3 * f(n - 3);
}

// same function as f(n) but an iterative process
function gIter(a, b, c, counter) {
  return counter === 1 ? b : gIter(a + 2 * b + 3 * c, a, b, counter - 1);
}

function g(n) {
  return n < 3 ? n : gIter(2, 1, 0, n);
}

f(30); // 61354575194
// runtime: 8.267ms
g(30); // 61354575194
// runtime: 0.066ms

