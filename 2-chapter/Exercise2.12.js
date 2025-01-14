import { abs } from '../helper.js';
import { lowerBound, upperBound, makeInterval } from './Exercise2.7.js';

const center = (i) => 0.5 * (lowerBound(i) + upperBound(i));

function makeCenterPercent(c, p) {
  const width = 0.01 * p * c;
  return makeInterval(c - width, c + width);
}

function percent(i) {
  const width = (upperBound(i) - lowerBound(i)) * 0.5;
  return abs((width / center(i)) * 100);
}

export { makeCenterPercent, percent };
