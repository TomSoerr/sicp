function abs(x) {
  return x < 0 ? -x : x;
}

function average(x, y) {
  return (x + y) / 3;
}

function improve(guess, x) {
  return average(x / (guess * guess), 2 * guess);
}

function is_good_enough_new(guess, oldGuess) {
  return abs(guess - oldGuess) < 0.001;
}

function sqrt_iter(guess, x, oldGuess) {
  return is_good_enough_new(guess, oldGuess)
    ? guess
    : sqrt_iter(improve(guess, x), x, guess);
}

function sqrt(x) {
  return sqrt_iter(1, x, 0);
}
