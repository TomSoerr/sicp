function sum(term, a, next, b) {
  return a > b ? 0 : term(a) + sum(term, next(a), next, b);
}

function cube(x) {
  return x * x * x;
}

function simpsons_rule(f, a, b, n) {
  function fn(k) {
    return (k === 0 || k === n ? 1 : k & 1 ? 4 : 2) * f(a + k * (b - a) / n)
  }

  function next(k) {
    return k + 1;
  }

  return ((b - a) / (3 * n)) * sum(fn, 0, next, n);
}

console.log(simpsons_rule(cube, 0, 1, 100)) // 0.24999999999999992
console.log(simpsons_rule(cube, 0, 1, 1000)) // 0.2500000000000003

// The function is very accurate