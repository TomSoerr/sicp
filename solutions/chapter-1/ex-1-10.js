/* eslint-disable no-nested-ternary */
function a(x, y) {
  // console.log(x, y)
  return y === 0 ? 0 : x === 0 ? 2 * y : y === 1 ? 2 : a(x - 1, a(x, y - 1));
}





// a(3, 3)
// a(2, a(3, 2))
// a(2, a(2, a(3, 1)))
// a(2, a(2, 2))
// a(2, a(1, a(2, 1)))
// a(2, a(1, 2))
// a(2, a(0, a(1, 1)))
// a(2, a(0, 2))
// a(2, 4)

// a(2, 4)
// a(1, a(2, 3))
// a(1, a(1, a(2, 2)))
// a(1, a(1, a(1, a(2, 1))))
// a(1, a(1, a(1, 2)))
// a(1, a(1, a(0, a(1, 1))))
// a(1, a(1, a(0, 2)))
// a(1, a(1, 4))
// a(1, a(0, a(1, 3)))
// a(1, a(0, a(0, a(1, 2))))
// a(1, a(0, a(0, a(0, a(1, 1)))))
// a(1, a(0, a(0, a(0, 2))))
// a(1, a(0, a(0, 4)))
// a(1, a(0, 8))
// a(1, 16)

// Example: x
// a(1 ,10)
// a(0, a(1, 9))
// a(0, a(0, a(1, 8)))
// a(0, a(0, a(0, a(1, 7))))
// a(0, a(0, a(0, a(0, a(1, 6)))))
// a(0, a(0, a(0, a(0, a(0, a(1, 5))))))
// a(0, a(0, a(0, a(0, a(0, a(0, a(1, 4)))))))
// a(0, a(0, a(0, a(0, a(0, a(0, a(0, a(x, 3))))))))
// a(0, a(0, a(0, a(0, a(0, a(0, a(0, a(0, a(1, 2)))))))))
// a(0, a(0, a(0, a(0, a(0, a(0, a(0, a(0, a(0, a(1, 1))))))))))
// a(0, a(0, a(0, a(0, a(0, a(0, a(0, a(0, a(0, 2)))))))))
// a(0, a(0, a(0, a(0, a(0, a(0, a(0, a(0, 4))))))))
// a(0, a(0, a(0, a(0, a(0, a(0, a(0, 8)))))))
// a(0, a(0, a(0, a(0, a(0, a(0, 16))))))
// a(0, a(0, a(0, a(0, a(0, 32)))))
// a(0, a(0, a(0, a(0, 64))))
// a(0, a(0, a(0, 128)))
// a(0, a(0, 256))
// a(0, 512))
// 1024

// console.log(a(1, 10)); // 1024
// console.log(a(2, 4)); // 65536
// console.log(a(3, 3)); // 65536

console.log(a(1, 10))
console.log(a(1, 9))
console.log(a(1, 8))
console.log(a(1, 7))
console.log(a(1, 6))
console.log(a(1, 5))
console.log(a(1, 4))
console.log(a(1, 3))

// console.log(a(3, 3));
// console.info("Done")
// console.log(a(2, 4));
// console.info("Done")
// console.log(a(1, 16));




function f(n) {
  return a(0, n);
}

function g(n) {
  return a(1, n);
}

function h(n) {
  return a(2, n);
}

function k(n) {
  return 5 * n * n;
}
