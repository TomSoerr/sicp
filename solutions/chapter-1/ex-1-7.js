import { abs, improve } from './ex-1-6.js';

// The old function calculates a better and better approximation of the square root from the radicant. The function then checks if the approximation is good enough. During this process the approximation get's squared and then compared to the radicant. But the isGoodEnough function is not very effective for finding the square root of really large and small numbers. This is because when squaring the approximate square root form a very small radicant the tolerance value from 0.001 is to high. For a very large number the value of 0.001 is to low

// Example with a small number:
// sqrt(0.1)
// Lets say our approximation is 0.318
// isGoodEnough(abs(square(0.3175) - 0.1) < 0.001)
// isGoodEnough(abs(0.10080625 - 0.1) < 0.001)
// isGoodEnough(0.000806249999 < 0.001)
// isGoodEnough(true)
// The function would return true even if the approximation is quite off
// approximation is 0.318 the real square root is more like ~ 0,316227

// Example with a gig number:
// sqrt(420000)
// Lets say our approximation is 648.0740698
// isGoodEnough(abs(square(648.0740698) - 420000) < 0.001)
// isGoodEnough(abs(419999.99891 - 420000) < 0.001)
// isGoodEnough(0.001089783 < 0.001)
// isGoodEnough(false)
// The function would return false even if the approximation is quite good
// approximation is 648.0740698 what quite precisely represents the square root

function newIsGoodEnough(guess, oldGuess) {
  return abs(guess < oldGuess ? guess / oldGuess : oldGuess / guess) > 0.999;
}

function sqrtIter(guess, x, oldGuess) {
  return newIsGoodEnough(guess, oldGuess)
    ? guess
    : sqrtIter(improve(guess, x), x, guess);
}

function optimisedSqrt(x) {
  return sqrtIter(2, x, 1);
}

// The optimised function compars the new guess to the old guess. If the difference between the two values is very small the test guess is good enough

optimisedSqrt(420000); // 648.0740698543752
optimisedSqrt(0.1); // 0.31622776688213083

// The new function should be more effective and accurate

export { newIsGoodEnough };
