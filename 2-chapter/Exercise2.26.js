import { list, append, pair, display } from '../helper.js';

const x = list(1, 2, 3);

const y = list(4, 5, 6);

display(append(x, y));
// box-notation [1,[2,[3,[4,[5,[6, null]]]]]]
// list-notation list(1, 2, 3, 4, 5, 6)

display(pair(x, y));
// box-notation [[1, [2, [3, null]]], [4, [5, [6, null]]]]
// list-notation pair(list(1, 2, 3), list(4, 5, 6))

display(list(x, y));
// box-notation [[1, [2, [3, null]]], [[4, [5, [6, null]]], null]]
// list-notation list(list(1, 2, 3), list(4, 5, 6))
