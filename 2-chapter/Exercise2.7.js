import { head, max, min, pair, tail } from '../helper.js';

const makeInterval = (x, y) => pair(x, y);

const upperBound = (x) => head(x);
const lowerBound = (x) => tail(x);

const addInterval = (x, y) =>
  makeInterval(lowerBound(x) + lowerBound(y), upperBound(x) + upperBound(y));

function mulInterval(x, y) {
  const p1 = lowerBound(x) * lowerBound(y);
  const p2 = lowerBound(x) * upperBound(y);
  const p3 = upperBound(x) * lowerBound(y);
  const p4 = upperBound(x) * upperBound(y);
  return makeInterval(min(p1, p2, p3, p4), max(p1, p2, p3, p4));
}

const divInterval = (x, y) =>
  mulInterval(x, makeInterval(1 / upperBound(y), 1 / lowerBound(y)));

export {
  makeInterval,
  addInterval,
  upperBound,
  lowerBound,
  divInterval,
  mulInterval,
};
