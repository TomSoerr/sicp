import { pair, gcd } from '../helper.js';

function makeRat(n, d) {
  const g = Math.abs(gcd(n, d));

  // because n and d are only integers we could use bit operations to check
  // for the sign bit in a programming language where ints and floats have a
  // different datatype.
  return (d > 0 && n < 0) || (d > 0 && n > 0)
    ? pair(n / g, d / g)
    : pair(-n / g, -d / g);
}

console.log(makeRat(-2, -3));
