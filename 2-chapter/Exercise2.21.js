import {
  head,
  isNull,
  map,
  square,
  tail,
  pair,
  display,
  list,
} from '../helper.js';

const squareList = (items) =>
  isNull(items) ? null : pair(square(head(items)), squareList(tail(items)));

const squareListMap = (items) => map((x) => x * x, items);

display(squareList(list(1, 2, 3, 4, 5)));
display(squareListMap(list(1, 2, 3, 4, 5)));
