function abs(x) {
  return x < 0 ? -x : x;
}

function average(x, y) {
  return (x + y) / 2;
}

function improve(guess, x) {
  return average(guess, x / guess);
}

function square(x) {
  return x * x;
}

function is_good_enough(guess, x) {
  return abs(square(guess) - x) < 0.001;
}

function conditional(predicate, then_clause, else_clause) {
  return predicate ? then_clause : else_clause;
}

function sqrt_iter(guess, x) {
  return conditional(
    is_good_enough(guess, x),
    guess,
    sqrt_iter(improve(guess, x), x),
  );
}

sqrt_iter(1, 4);

// Because the return condition of the sqrt_iter function is now a function expression and an argument expression and no longer a ternary operator the sqrt_iter is always called.
// If the predicate of the ternary operator is true the else expression is ignored.
// Using the conditional() function the arguments are always evaluated
