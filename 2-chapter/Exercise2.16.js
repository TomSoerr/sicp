import { display } from '../helper.js';
import { percent, makeCenterPercent } from './Exercise2.12.js';
import { makeInterval } from './Exercise2.7';

function mulInterval(i) {
  return i;
}

function divInterval(i) {
  return i;
}

function addInterval(i) {
  return i;
}

const a = makeCenterPercent(5, 5);
const b = makeCenterPercent(2, 1);
const one = makeInterval(1, 1);

display(percent(divInterval(mulInterval(a, b), addInterval(a, b)))); // 9.8 %
display(
  percent(
    divInterval(one, addInterval(divInterval(one, a), divInterval(one, b))),
  ),
); // 2.1 %
