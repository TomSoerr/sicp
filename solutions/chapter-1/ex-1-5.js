function p() {
  return p();
}

function test(x, y) {
  return x === 0 ? 0 : y
}

test(0, p())

// Applicative order: 
// test(0, p())
// There will be an infinit loop because the interpreter first try's to evaluate the function arguments

// Normal order:
// test(0, p())
// 0 === 0 ? 0 : p()
// returns 0
// With an normal order the predicate of the conditional expression evaluates to true meaning that the consequent expression is evaluated 0 is returned.  


