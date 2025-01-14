import { list, head, tail, display } from '../helper.js';

const a = list(1, 3, list(5, 7), 9);

const b = list(list(7));

const c = list(1, list(2, list(3, list(4, list(5, list(6, 7))))));

display(
  head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(c)))))))))))),
);

display(head(head(b)));

display(head(tail(head(tail(tail(a))))));
