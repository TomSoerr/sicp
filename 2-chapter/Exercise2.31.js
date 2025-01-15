import { list, isPair, display, map } from '../helper.js';

const treeMap = (fn, tree) =>
  map((sub) => (isPair(sub) ? treeMap(fn, sub) : fn(sub)), tree);

const squareTree = (tree) => treeMap((x) => x * x, tree);

display(squareTree(list(1, list(2, list(3, 4), 5), list(6, 7))));
display(list(1, list(2, list(3, 4), 5), list(6, 7)));
