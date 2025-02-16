import { display, error } from 'sicp';

const m = 200560490131;
const a = 987654321;
const b = 12345;

const rand_update = (x) => (a * x + b) % m;

function make_rand() {
  let x = 424242;

  function generate() {
    x = rand_update(x);
    return x;
  }

  function reset(new_val) {
    x = new_val;
  }

  return (action) =>
    action === 'generate' ? generate()
    : action === 'reset' ? reset
    : error('unknown operation');
}

const rand = make_rand();

display(rand('generate'));
display(rand('generate'));
display(rand('generate'));
rand('reset')(42);
display(rand('generate'));
display(rand('generate'));
display(rand('generate'));
