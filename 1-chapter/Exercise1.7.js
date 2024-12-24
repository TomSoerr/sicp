// is_good_enough(very large number)
// When re multiplying the square root of a very large number even small changes in the floating point numbers result in difference that is greater than 0.001. So the precision of 0.001 is to high for large numbers
// When re multiplying the square root of a very small number the is_good_enough() will break the optimisation way before the number is accurate. So the precision is to small for small numbers.

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

console.log(sqrt(0.000000002));

// using the difference between the old guess and the new guess we can use the sqrt() function for large and small numbers
