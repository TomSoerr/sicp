function abs(x) {
  return x < 0 ? -x : x;
}

const tolerance = 0.0000001;

function fixedPoint(f, firstGuess) {
  function closeEnough(x, y) {
    return abs(x - y) < tolerance;
  }
  function tryWith(guess) {
    const next = f(guess);
    return closeEnough(guess, next) ? next : tryWith(next);
  }
  return tryWith(firstGuess);
}

function compose(f, g) {
  return (x) => f(g(x));
}

function repeat(f, k) {
  return k === 1 ? (x) => f(x) : compose(f, repeat(f, k - 1));
}

function averageDamp(f) {
  return x => 0.5 * (x + f(x));
}

function raise(x, n) {
  return n === 0
    ? 1
    : n & 1
      ? x * raise(x, n - 1)
      : raise(x * x, n / 2);
}

function root(x, n) {
  return fixedPoint(repeat(
    averageDamp,
    Math.floor(Math.log2(n))
  )(y => x / raise(y, n - 1)), 1);
}

// console.log(root(8, 3)); // 1 damp
// console.log(root(16, 4)); // 2 damp
// console.log(root(32, 5)); // 2 damp
// console.log(root(64, 6)); // 2 damp
// console.log(root(128, 7)); // 2 damp
// console.log(root(256, 8)); // 3 damp
// console.log(root(512, 9)); // 3 damp
// console.log(root(1024, 10)); // 3 damp
// console.log(root(2048, 11)); // 3 damp
// console.log(root(4096, 12)); // 3 damp
// console.log(root(8192, 13)); // 3 damp
// console.log(root(16384, 14)); // 3 damp
// console.log(root(32768, 15)); // 3 damp
console.log(root(65536, 16)); // 4 damp
