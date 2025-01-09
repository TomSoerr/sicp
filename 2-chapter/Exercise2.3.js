import {
  makeSegment,
  startSegment,
  endSegment,
  makePoint,
  xPoint,
  yPoint,
} from './Exercise2.2.js'; // Last Exercise

import { pair, head, tail, sqrt, square, display } from '../helper.js';

function makeRectangle(a, b, c, d) {
  return pair(makeSegment(a, b), makeSegment(c, d));
}

const aCorner = (rectangle) => startSegment(head(rectangle));
const bCorner = (rectangle) => endSegment(head(rectangle));
const cCorner = (rectangle) => startSegment(tail(rectangle));
const dCorner = (rectangle) => endSegment(tail(rectangle));

// u - v
const differencePoints = (u, v) =>
  makePoint(xPoint(u) - xPoint(v), yPoint(u) - yPoint(v));

// |u| = sqrt(x^2 + y^2)
const lengthPoints = (u) => sqrt(square(xPoint(u)) + square(yPoint(u)));

function perimeter(rectangle) {
  const horLength = lengthPoints(
    differencePoints(aCorner(rectangle), bCorner(rectangle))
  );
  const vertLength = lengthPoints(
    differencePoints(aCorner(rectangle), dCorner(rectangle))
  );

  return 2 * (horLength + vertLength);
}

function area(rectangle) {
  const horLength = lengthPoints(
    differencePoints(aCorner(rectangle), bCorner(rectangle))
  );
  const vertLength = lengthPoints(
    differencePoints(aCorner(rectangle), dCorner(rectangle))
  );

  return horLength * vertLength;
}

const rec = makeRectangle(
  makePoint(0, 0),
  makePoint(0, 2),
  makePoint(2, 2),
  makePoint(2, 0)
);

display(perimeter(rec));
display(area(rec));
