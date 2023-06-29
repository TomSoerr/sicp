/* eslint-disable no-nested-ternary */
function sumOfSquares(a, b) {
  return a * a + b * b;
}

function sumOfSquaresOfTwoBiggestNumbers(a, b, c) {
  return a < b && a < c
    ? sumOfSquares(b, c)
    : b < a && b < c
    ? sumOfSquares(a, c)
    : sumOfSquares(a, b);
}

sumOfSquaresOfTwoBiggestNumbers(1, 2, 3); // 13
sumOfSquaresOfTwoBiggestNumbers(2, 1, 3); // 13
sumOfSquaresOfTwoBiggestNumbers(2, 3, 1); // 13
