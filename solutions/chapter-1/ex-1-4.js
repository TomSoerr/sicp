function plus(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function aPlusAbsB(a, b) {
  return (b >= 0 ? plus : minus)(a, b);
}

// First the expression in the first pair of parentheses is evaluated. If the predicate of the conditional expression returns true, meaning that b is bigger or equal to 0. Then the expression will return plus. In the over case minus will be returned. After that, the returned function is called with the values of a and b.

aPlusAbsB(1, 1) // 2
aPlusAbsB(1, -1) // 2