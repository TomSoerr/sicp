function p() { return p(); }

function test(x, y) {
  return x === 0 ? 0 : y;
}

test(0, p());

// applicative order
// test(0, p());
// test(0, p() => p());
// test(0, p() => p() => p());
// test(0, p() => p() => p() => p());
// test(0, p() => p() => p() => p() => ...);
// because the argument expression is evaluated until the function expression is applied this code results in an endless loop. 


// normal order
// test(0, p());
// x === 0 ? 0 : p();
// 0;
// The functions are directly substituted and only evaluated when needed this function never encounters the endless loop p(). Before this happens the predicate is evaluated and the ternary operator returns 0. 