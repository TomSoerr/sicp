// helper functions
function inc(x) {
  return x + 1;
}

function dec(x) {
  return x - 1;
}

// Exercise

function plusV1(a, b) {
  return a === 0 ? b : inc(plusV1(dec(a), b));
}

// plusV1(4, 5)
// 4 === 0 ? 5 : inc(plusV1(dec(4), 5))
// false ? 5 : inc(plusV1(dec(4), 5))
// inc(plusV1(dec(4), 5))
// inc(plusV1(3, 5))
// inc(3 === 0 ? 5 : inc(plusV1(dec(3), 5)))
// inc(false ? 5 : inc(plusV1(dec(3), 5)))
// inc(inc(plusV1(dec(3), 5)))
// inc(inc(plusV1(2, 5)))
// inc(inc(2 === 0 ? 5 : inc(plusV1(dec(2), 5))))
// inc(inc(false ? 5 : inc(plusV1(dec(2), 5))))
// inc(inc(inc(plusV1(dec(2), 5))))
// inc(inc(inc(plusV1(1, 5))))
// inc(inc(inc(1 === 0 ? 5 : inc(plusV1(dec(1), 5)))))
// inc(inc(inc(false ? 5 : inc(plusV1(dec(1), 5)))))
// inc(inc(inc(inc(plusV1(dec(1), 5)))))
// inc(inc(inc(inc(plusV1(0, 5)))))
// inc(inc(inc(inc(0 === 0 ? 5 : inc(plusV1(dec(0), 5))))))
// inc(inc(inc(inc(true ? 5 : inc(plusV1(dec(0), 5))))))
// inc(inc(inc(inc(5))))
// inc(inc(inc(6)))
// inc(inc(7))
// inc(8)
// 9

function plusV2(a, b) {
  return a === 0 ? b : plusV2(dec(a), inc(b));
}

// plusV2(4, 5)
// 4 === 0 ? 5 : plusV2(dec(4), inc(5))
// false ? 5 : plusV2(dec(4), inc(5))
// plusV2(dec(4), inc(5))
// plusV2(3, 6)
// 3 === 0 ? 6 : plusV2(dec(3), inc(6))
// false ? 6 : plusV2(dec(3), inc(6))
// plusV2(dec(3), inc(6))
// plusV2(2, 7)
// 2 === 0 ? 7 : plusV2(dec(2), inc(7))
// false ? 7 : plusV2(dec(2), inc(7))
// plusV2(dec(2), inc(7))
// plusV2(1, 8)
// 1 === 0 ? 8 : plusV2(dec(1), inc(8))
// false ? 8 : plusV2(dec(1), inc(8))
// plusV2(dec(1), inc(8))
// plusV2(0, 9)
// 0 === 0 ? 9 : plusV2(dec(0), inc(9))
// true ? 9 : plusV2(dec(0), inc(9))
// 9

// Both function are recursive functions. But if we use the substitution model we can see how both functions are interpreted. The first one is a recursive process because the data that needs to be remembered by the interpreter grows linear with the size of a and b. The second process is iterative because it will execute in constant space.
