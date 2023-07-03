import { display } from 'sicp';

function calculateNumber(row, column) {
  return row < 3 || column === 1 || column === row
    ? 1
    : calculateNumber(row - 1, column - 1) + calculateNumber(row - 1, column);
}

function calculateRow(n, column) {
  return n > column
    ? `${calculateNumber(n, column)} ${calculateRow(n, column + 1)}`
    : `${calculateNumber(n, column)}`;
}

function displayRow(n, counter) {
  display(calculateRow(counter, 1));
  if (counter < n) displayRow(n, counter + 1);
}

function p(n) {
  displayRow(n, 1);
}

p(7);
// "1"
// "1 1"
// "1 2 1"
// "1 3 3 1"
// "1 4 6 4 1"
// "1 5 10 10 5 1"
// "1 6 15 20 15 6 1"