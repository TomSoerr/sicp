import { append, display, isNull, list, map, tail, head } from '../helper.js';

function subsets(s) {
  if (isNull(s)) {
    return list(null);
  }
  const rest = subsets(tail(s));
  return append(
    rest,
    map(
      (set) => (isNull(set) ? list(head(s)) : append(list(head(s)), set)),
      rest,
    ),
  );
}

display(subsets(list(1, 2, 3)));
// This works because the map combines every element with every other element
