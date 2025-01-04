function product(term, a, next, b) {
  return a > b ? 1 : term(a) * product(term, next(a), next, b);
}

function accumulate_i(term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), result * term(a));
  }
  return iter(a, 1);
}

///// 1.

function inc(x) {
  return x + 1;
}

function even(x) {
  return x & 1 ? x - 1 : x;
}

function odd(x) {
  return x & 1 ? x : x - 1;
}

function factorial(n) {
 function term(x) {
    return x;
  }

  return product(term, 1, inc, n)
}

function pi(n) {
  return 4 * (product(even, 3, inc, n + 3)) / product(odd, 3, inc, n + 3);
}

function pi_iter(n) {
  return 4 * (accumulate_i(even, 3, inc, n + 3)) / accumulate_i(odd, 3, inc, n + 3);
}


console.log(pi(160))
console.log(pi_iter(160))