function abs(x) {
  return x >= 0 ? x : -x;
}

function average(x, y) {
  return (x + y) / 2;
}

const tolerance = 0.00001;
function fixed_point(f, first_guess) {
  function close_enough(x, y) {
    return abs(x - y) < tolerance;
  }
  function try_with(guess) {
    console.count(f);
    const next = f(guess);
    return close_enough(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}

console.log(fixed_point((x) => Math.log(1000) / Math.log(x), 2)); // 34 iterations
console.log(fixed_point((x) => 1/2 * (x + Math.log(1000) / Math.log(x)), 2)); // 9 iterations
// average dampening reduces the runtime of the function