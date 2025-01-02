function square(x) {
  return x * x;
}

function fast_expt(b, n) {
  return n === 0
    ? 1
    : exp & 1
      ? b * fast_expt(b, n - 1)
      : square(fast_expt(b, n / 2));
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : exp & 1
      ? (base * expmod(base, exp - 1, m)) % m
      : square(expmod(base, exp / 2, m)) % m;
}

function expmod_rec(base, exp, m) {
  return exp === 0
    ? 1
    : exp & 1
      ? (base * expmod_rec(base, exp - 1, m)) % m
      : square(expmod_rec(base, exp / 2, m)) % m;
}

// I would guess that using the fast_expt does not work for very large numbers and is slower. Using the recursive expmod function substituted the problem to smaller numbers that fit into the memory of an integer

let t = performance.now()
console.log(expmod(18, 19, 3)); 
console.log(performance.now() - t)

t = performance.now();
console.log(expmod_rec(18, 19, 3));
console.log(performance.now() - t);
