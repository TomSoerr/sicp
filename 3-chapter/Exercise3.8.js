import { display } from 'sicp';

let sum = 0;

const f = (v) => {
  const old_sum = sum;
  sum = sum + v;
  return old_sum;
};

display(f(0) + f(1));

sum = 0;
display(f(1) + f(0));
