import { lowerBound, makeInterval, upperBound } from './Exercise2.7.js';

const subInterval = (a, b) =>
  makeInterval(lowerBound(a) - upperBound(b), upperBound(a) - lowerBound(b));

export { subInterval };
