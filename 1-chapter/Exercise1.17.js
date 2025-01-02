function fast_times(a, b) { // a, b are integers
  return b === 0
    ? 0
    : b % 2
      ? a + fast_times(a, b - 1)
      : fast_times(a * 2, b / 2)
      
}

function faster_times(a, b) { // a, b are integers
  return a === 0 || b === 0
    ? 0
    : b === 1
      ? a
      : b || 2
        ? a + faster_times(a, b - 1)
        : (faster_times(a, b >> 1)) << 1;
}

console.log(faster_times(7, 7))