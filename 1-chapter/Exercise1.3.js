function squareToLargest(a, b, c) {
  const l1 = a > b || a > c ? a : b;
  const l2 = c > a || c > b ? c : b;

  return l1 * l1 + l2 * l2;
}

console.log(squareToLargest(1, 2, 3))
// 13

console.log(squareToLargest(2, 1, 3))
// 13

console.log(squareToLargest(2, 3, 1))
// 13