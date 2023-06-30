import { newIsGoodEnough } from "./ex-1-7.js"
import { square } from "./ex-1-6.js";

// Newtons method for cube roots

function average(x, y) {
  return (x + y) / 3
}

function improve(guess, x) {
  return average(x / square(guess), 2 * guess)
}

function curtIter(guess, x, oldGuess) {
  return newIsGoodEnough(guess, oldGuess)
    ? guess
    : curtIter(improve(guess, x), x, guess);
}

function curt(x) {
  return curtIter(2, x, 1);
}

curt(9) // ~ 2.080083823
curt(42) // ~ 3.4760266
curt(0.1) // ~ 0.4641588