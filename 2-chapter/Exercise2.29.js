import { display, head, isPair, list, tail } from '../helper.js';

const makeMobile = (left, right) => list(left, right);

const makeBranch = (length, structure) => list(length, structure);

const leftBranch = (mobile) => head(mobile);

const rightBranch = (mobile) => head(tail(mobile));

const x = makeMobile(
  makeBranch(20, makeMobile(makeBranch(10, 2), makeBranch(4, 5))),
  makeBranch(28, 5),
);

const isMobile = (mobile) =>
  isPair(leftBranch(mobile)) && isPair(rightBranch(mobile));

const totalWeight = (mobile) => {
  return (
    isMobile(mobile) ?
      totalWeight(leftBranch(mobile)) + totalWeight(rightBranch(mobile))
    : isMobile(rightBranch(mobile)) ? totalWeight(rightBranch(mobile))
    : rightBranch(mobile)
  );
};

const getLength = (branch) => leftBranch(branch);

function balanced(mobile) {
  console.log(mobile, isMobile(mobile));
  return (
    isMobile(mobile) ?
      totalWeight(leftBranch(mobile)) * getLength(leftBranch(mobile)) ===
        totalWeight(rightBranch(mobile)) * getLength(rightBranch(mobile)) &&
        balanced(leftBranch(mobile)) &&
        balanced(rightBranch(mobile))
    : isMobile(rightBranch(mobile)) ? balanced(rightBranch(mobile))
    : true
  );
}

display(balanced(x));

// when the implementation of makeMobile changes only the selectors need to be adapted
