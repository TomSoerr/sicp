import { display, error } from '../helper.js';
import {
  mulInterval,
  makeInterval,
  upperBound,
  lowerBound,
} from './Exercise2.7.js';

function divInterval(x, y) {
  const upp = upperBound(y);
  const low = lowerBound(y);

  if (upp === 0 && low === 0) {
    error('0 division');
  }

  return mulInterval(x, makeInterval(1 / upp, 1 / low));
}
