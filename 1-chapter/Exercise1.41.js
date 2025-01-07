function inc(n) {
  return n + 1;
}

function double(f) {
  return n => f(f(n))
}

console.log(double(double(double))(inc)(5)) // 21

// double(function quad(g) {return double(double)})(i => inc(i))
// (n => quad(quad(g){}){})(i => inc(i))
// (n => quad(n => i(i(i(i(n))))){})(i => inc(i))
// (n => g(g(g(g(n))))){})(i => inc(i))
// (n => i(i(i(i(i(i(i(i(i(i(i(i(i(i(i(i(n))))))))))))))))){}) 16x inc