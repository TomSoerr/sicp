// helper functions

function square(x) {
  return x * x;
}

function abs(x) {
  return x >= 0 ? x : -x;
}

function average(x, y) {
  return (x + y) / 2;
}

function improve(guess, x) {
  return average(guess, x / guess);
}

function isGoodEnough(guess, x) {
  return abs(square(guess) - x) < 0.001;
}

function sqrtIter(guess, x) {
  return isGoodEnough(guess, x) ? guess : sqrtIter(improve(guess, x), x);
}

function sqrt(x) {
  return sqrtIter(1, x);
}

// exercise

function conditional(predicate, thenClause, elseClause) {
  return predicate ? thenClause : elseClause;
}

function evasSqrtIter(guess, x) {
  return conditional(
    isGoodEnough(guess, x),
    guess,
    evasSqrtIter(improve(guess, x), x)
  );
}

// The interpreter works in application order like this:

// evasSqrtIter(3, 9)
// conditional(isGoodEnough(3, 9), 3, evasSqrtIter(improve(3, 9), 9))
// conditional(true, 3, evasSqrtIter(average(3, 9 / 3), 9))
// conditional(true, 3, evasSqrtIter(((3 + 3) / 2), 9))
// conditional(true, 3, evasSqrtIter(3, 9))
// conditional(true, 3, conditional(isGoodEnough(3, 9), 3, evasSqrtIter(improve(3, 9), 9)))
// and so on

// There will be an infinit loop because the interpreter keeps evaluating the arguments expressions and would only then apply the function expression. Because of that the evasSqrtIter function keeps evaluating its return expression over an over again.

export { square, abs, average, improve };
