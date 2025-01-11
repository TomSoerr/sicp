import { display } from '../helper.js';

const zero = () => (x) => x;
const one = (f) => (x) => f(x);
const two = (f) => (x) => f(f(x));

function add1(n) {
  return (f) => (x) => f(n(f)(x));
}

// add1(zero)
// add1((g) => (x) => x)
// (f) => (x) => f(((g) => (x) => x)(f)(x))
// (f) => (x) => f(((x) => x)(x))
// (f) => (x) => f(x)

// add1(one)
// add1((g) => (x) => g(x))
// (f) => (x) => f(((g) => (x) => g(x))(f)(x))
// (f) => (x) => f(((x => f(x)))(x))
// (f) => (x) => f(f(x))

function plus(a, b) {
  return (f) => (x) => a(f)(b(f)(x));
}
