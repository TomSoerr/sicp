import { display, math_random } from 'sicp';

const random_in_range = (low, high) => low + math_random() * (high - low);

function monte_carlo(trials, experiment) {
  function iter(trials_remaining, trials_passed) {
    return (
      trials_remaining === 0 ? trials_passed / trials
      : experiment() ? iter(trials_remaining - 1, trials_passed + 1)
      : iter(trials_remaining - 1, trials_passed)
    );
  }
  return iter(trials, 0);
}

const r = 1;
const p = (x, y) => x * x + y * y <= r * r;
const x1 = -1;
const y1 = -1;
const x2 = 1;
const y2 = 1;

function estimate_integral(p, x1, y1, x2, y2, trails) {
  const hight = y1 - y2;
  const width = x1 - x2;
  const area = hight * width;

  const cb = () => p(random_in_range(x1, x2), random_in_range(y1, y2));

  return monte_carlo(trails, cb) * area;
}

display(estimate_integral(p, x1, y1, x2, y2, 1000));
