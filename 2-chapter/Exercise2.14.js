import {
  makeInterval,
  divInterval,
  mulInterval,
  addInterval,
} from './Exercise2.7.js';
import { makeCenterPercent, percent } from './Exercise2.12.js';
import { display } from '../helper.js';

const a = makeCenterPercent(5, 5);
const b = makeCenterPercent(2, 1);
const one = makeInterval(1, 1);

// display(divInterval(a, a));

display(percent(divInterval(mulInterval(a, b), addInterval(a, b)))); // 9.8 %
display(
  percent(
    divInterval(one, addInterval(divInterval(one, a), divInterval(one, b))),
  ),
); // 2.1 %

// the simpler formula is not as precise because there is an addition, a multiplication and a division whereas the other formula has only one addition with an interval
