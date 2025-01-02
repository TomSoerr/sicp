function fast_times_iter(a, b) { // a, b are positive
  return !a || !b 
  ? 0
  : b === 1
    ? a
    : b & 1
      ? a + fast_times_iter(a, b - 1)
      : fast_times_iter(a << 1, b >> 1);
}

