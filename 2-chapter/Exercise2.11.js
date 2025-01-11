import { lowerBound, upperBound, makeInterval, min, max } from './Exercise2.7';

function mulInterval(x, y) {
  const p1 = lowerBound(x) * lowerBound(y);
  const p2 = lowerBound(x) * upperBound(y);
  const p3 = upperBound(x) * lowerBound(y);
  const p4 = upperBound(x) * upperBound(y);
  return makeInterval(min(p1, p2, p3, p4), max(p1, p2, p3, p4));
}

function newmulInterval(x, y) {
  const lowX = lowerBound(x);
  const lowY = lowerBound(y);
  const uppX = upperBound(x);
  const uppY = upperBound(y);

  // 1
  if (lowX > 0 && lowY > 0) {
    return makeInterval(lowX * lowY, uppX, uppY);
  }

  // 2
  if (uppX < 0 && uppY < 0) {
    return makeInterval(lowX * lowY, uppX, uppY);
  }

  // 3
  if (uppX < 0 && lowY > 0) {
    return makeInterval(lowX * uppY, uppX * lowY);
  }

  // 4
  if (uppY < 0 && lowX > 0) {
    return makeInterval(lowY * uppX, uppY * lowX);
  }

  // 5
  if (lowX < 0 && uppX > 0 && lowY > 0) {
    return makeInterval(lowX * uppY, uppX * uppY);
  }

  // 6
  if (lowX < 0 && uppX > 0 && uppY < 0) {
    return makeInterval(uppX * lowY, lowX * lowY);
  }

  // 7
  if (lowY < 0 && uppY > 0 && lowX > 0) {
    return makeInterval(lowY * uppX, uppX * uppY);
  }

  // 8
  if (lowY < 0 && uppY > 0 && uppX < 0) {
    return makeInterval(uppY * lowX, lowX * lowY);
  }

  // 9
  if (lowX < 0 && lowY < 0 && uppX > 0 && uppY > 0) {
    const p1 = lowX * lowY;
    const p2 = uppX * uppY;
    const p3 = uppX * lowY;
    const p4 = lowX * uppY;
    return makeInterval(min(p1, p2, p3, p4), max(p1, p2, p3, p4));
  }
}
