function up_split(painter, n) {
  if (n === 0) {
    return painter;
  } else {
    const smaller = up_split(painter, n - 1);
    return below(beside(smaller, smaller), painter);
  }
}
