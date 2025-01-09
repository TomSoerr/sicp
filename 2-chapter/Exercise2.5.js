import { display, raise, log2, log3 } from '../helper.js';

const pair = (a, b) => raise(2, a) * raise(3, b);

const getA = (p) => (p % 3 ? log2(p) : getA(p / 3));

const getB = (p) => (p % 2 ? log3(p) : getB(p / 2));

// my solution works but using log is a bit intense
// the books solutions is to count how often the number can be divided

display(getA(pair(7, 3)));
