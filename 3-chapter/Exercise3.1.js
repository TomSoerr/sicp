import { display } from 'sicp';

const make_accumulator = (sum) => (add) => {
  sum += add;
  return sum;
};

const a = make_accumulator(5);

display(a(10));
display(a(10));
