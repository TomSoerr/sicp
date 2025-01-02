'use strict';

function smallest_divisor(n) {
  return find_divisor(n, 2);
}

function find_divisor(n, test_divisor) {
  return test_divisor * test_divisor > n
    ? n
    : n % test_divisor
      ? find_divisor(n, test_divisor + 1)
      : test_divisor;
}

function is_prime(n) {
  return n === smallest_divisor(n);
}

function report_prime(elapsed_time) {
  console.log('**************');
  console.log(elapsed_time);
  return true;
}

function start_prime_test(n, start_time) {
  return is_prime(n) ? report_prime(performance.now() - start_time) : false;
}

function timed_prime_test(n) {
  console.log(n)
  return start_prime_test(n, performance.now());
}

function loop_odd_integers(n, found) {
  return found > 3
    ? true
    : !(n & 1)
      ? loop_odd_integers(n + 1, ++found)
      : timed_prime_test(n)
        ? loop_odd_integers(n + 2, ++found)
        : loop_odd_integers(n + 2, found);
}

function search_for_primes(from) {
  loop_odd_integers(from, 0);
}

// search_for_primes(1000);
// 1009 -> 0.002000093460083008
// 1013 -> 0.0015418529510498047
// 1019 -> 0.001708984375

// search_for_primes(10000);
// 10007 -> 0.004124879837036133
// 10009 -> 0.004125118255615234
// 10037 -> 0.002541065216064453
// sqrt(10) * 0.0015 is somewhat close to 0.0041

search_for_primes(100000);
// 100003 -> 0.011957883834838867
// 100019 -> 0.012207984924316406
// 100043 -> 0.01112508773803711

search_for_primes(1000000);
// 10000019 -> 0.03491687774658203
// 10000079 -> 0.04012489318847656
// 10000103 -> 0.02045893669128418
// sqrt(10) * 0.0012 is somewhat close to 0.0034