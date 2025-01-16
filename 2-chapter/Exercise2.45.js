function split(out, inn) {
  function splitting(painter, n) {
    if (n === 0) {
      return painter;
    } else {
      const smaller = splitting(painter, n - 1);
      return out(inn(smaller, smaller), painter);
    }
  }
  return splitting;
}
