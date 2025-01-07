function abs(x) {
  return x < 0 ? -x : x;
}

const tolerance = 0.00001;
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

const dx = 0.00001;

function deriv(g) {
  return (x) => (g(x + dx) - g(x)) / dx;
}

function newtonTransform(g) {
  return (x) => x - g(x) / deriv(g)(x);
}

function newtonsMethod(g, guess) {
  return fixedPoint(newtonTransform(g), guess);
}

function cubic(a, b, c) {
  return x => (x * x * x) + a * (x * x) + b * (x) + c
}

console.log(newtonsMethod(cubic(2, 3, 4), 1))
