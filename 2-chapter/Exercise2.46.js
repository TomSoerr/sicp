import { pair, head, tail } from 'sicp';

const make_vect = (x, y) => pair(x, y);

const xcor_vect = head;
const ycor_vect = tail;

const add_vect = (v1, v2) =>
  make_vect(xcor_vect(v1) + xcor_vect(v2), ycor_vect(v1) + ycor_vect(v2));

const sub_vect = (v1, v2) =>
  make_vect(xcor_vect(v1) - xcor_vect(v2), ycor_vect(v1) - ycor_vect(v2));

const scale_vect = (s, v) => make_vect(s * xcor_vect(v), s * ycor_vect(v));
