import { display, math_sqrt } from 'sicp';

function make_monitored(fn) {
  let count = 0;
  return function monitored(arg) {
    if (arg === 'reset count') {
      count = 0;
      return undefined;
    }
    if (arg === 'how many calls') {
      return count;
    }
    count += 1;
    return fn(arg);
  };
}

const s = make_monitored(math_sqrt);

display(s(100));
display(s('how many calls'));
display(s('reset count'));
display(s('how many calls'));
