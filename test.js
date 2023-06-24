function my_range(n) {
  if (n < 0 || n > 10) {
    return n
  }
  console.log(n)
  return my_range(++n)
}

my_range(0)