function compose(f, g) {
  return x => f(g(x))
}

const square = x => x * x;
const inc = x => ++x;

console.log(compose(square, inc)(6));