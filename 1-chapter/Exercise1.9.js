function inc(a) {
  return ++a;
}

function dec(a) {
  return --a;
}

function plusV1(a, b) {
  return a === 0 ? b : inc(plusV1(dec(a), b));
}

// plusV1(4, 5)
// inc(plusV1(dec(4), 5))
// inc(plusV1(3, 5))
// inc(inc(plusV1(dec(3), 5)))
// inc(inc(plusV1(2, 5)))
// inc(inc(inc(plusV1(dec(2), 5))))
// inc(inc(inc(plusV1(1, 5))))
// inc(inc(inc(inc(plusV1(dec(1), 5)))))
// inc(inc(inc(inc(plusV1(0, 5)))))
// inc(inc(inc(inc(5))))
// inc(inc(inc(6)))
// inc(inc(7))
// inc(8)
// 9

// The function plusV1 produces a recursive process

function plusV2(a, b) {
  return a === 0 ? b : plusV2(dec(a), inc(b));
}

// plusV1(4, 5)
// plusV2(dec(4), inc(5))
// plusV2(3, 6)
// plusV2(dec(3), inc(6))
// plusV2(2, 7)
// plusV2(dec(2), inc(7))
// plusV2(1, 8)
// plusV2(dec(1), inc(8))
// plusV2(0, 9)
// 9

// The function plusV1 produces a iterative process
