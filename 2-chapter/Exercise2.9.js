import { display } from '../helper.js';
import {
  makeInterval,
  addInterval,
  mulInterval,
  divInterval,
  upperBound,
  lowerBound,
} from './Exercise2.7.js';
import { subInterval } from './Exercise2.8.js';

const a = makeInterval(41.5, 42.5);
const b = makeInterval(9.5, 10.5);

const widthInterval = (a) => 0.5 * (upperBound(a) - lowerBound(a));

const test1 = addInterval(a, b);
const test2 = mulInterval(a, b);

display(widthInterval(test1), widthInterval(test2), test2);
