function compose(f, g) {
  return (x) => f(g(x));
}

function repeat(f, k) {
  return k === 1 ? (x) => f(x) : compose(f, repeat(f, k - 1));
}

const dx = 0.00001;

function smooth(f) {
  return x => (f(x - dx) + f(x) + f(x + dx)) / 3;
}

function repeated_smooth(f, n) {
  return repeat(smooth, n)(f);
}