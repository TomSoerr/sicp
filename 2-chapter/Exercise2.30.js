import {
  isNull,
  head,
  tail,
  list,
  pair,
  isPair,
  display,
  map,
} from '../helper.js';

const squareTree = (tree) =>
  isNull(tree) ? null
  : !isPair(tree) ? tree * tree
  : pair(squareTree(head(tree)), squareTree(tail(tree)));

const squareTreeR = (tree) =>
  map((sub) => (isPair(sub) ? squareTreeR(sub) : sub * sub), tree);

display(squareTreeR(list(1, list(2, list(3, 4), 5), list(6, 7))));
display(list(1, list(2, list(3, 4), 5), list(6, 7)));
