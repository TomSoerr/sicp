import { display, pair, head, tail } from '../helper.js';

const makeSegment = (start, end) => pair(start, end);
const startSegment = head;
const endSegment = tail;

const makePoint = (x, y) => pair(x, y);
const xPoint = head;
const yPoint = tail;

const p = makeSegment(makePoint(3, 3), makePoint(-1, -1));

function midpoint(segment) {
  const start = startSegment(segment);
  const end = endSegment(segment);

  return makePoint(
    (xPoint(start) + xPoint(end)) / 2,
    (yPoint(start) + yPoint(end)) / 2
  );
}

export { makeSegment, startSegment, endSegment, makePoint, xPoint, yPoint };
