function compose(f, g) {
  return (x) => f(g(x));
}

function repeat(f, k) {
  return k === 1 ? (x) => f(x) : compose(f, repeat(f, k - 1))
}

const square = (x) => x * x;

console.log(repeat(square, 2)(5)); // 625