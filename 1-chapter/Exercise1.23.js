'use strict';

function next(test_divisor) {
  return test_divisor & 1
    ? test_divisor + 2
    : test_divisor + 1
}

function smallest_divisor(n) {
  return find_divisor(n, 2);
}

function find_divisor(n, test_divisor) {
  return test_divisor * test_divisor > n
    ? n
    : n === 2
      ? find_divisor(n, test_divisor) || find_divisor(n, next(test_divisor))
      : n % test_divisor
        ? find_divisor(n, next(test_divisor))
        : test_divisor;
}

function is_prime(n) {
  return n === smallest_divisor(n);
}

function report_prime(elapsed_time, n) {
  console.log(n)
  console.log('**************');
  console.log(elapsed_time, "\n");
  return true;
}

function start_prime_test(n, start_time) {
  return is_prime(n) ? report_prime(performance.now() - start_time, n) : false;
}

function timed_prime_test(n) {
  // console.log(n)
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

 search_for_primes(1000);
// 1009 -> 0.002000093460083008
// 1013 -> 0.0015418529510498047
// 1019 -> 0.001708984375
// new times
// 1009 -> 0.0015411376953125 
// 1013 -> 0.0018329620361328125 
// 1019 -> 0.0022499561309814453 

 search_for_primes(10000);
// 10007 -> 0.004124879837036133
// 10009 -> 0.004125118255615234
// 10037 -> 0.002541065216064453
// new times
// 10007 -> 0.002084016799926758 
// 10009 -> 0.002374887466430664 
// 10037 -> 0.006207942962646484 

search_for_primes(100000);
// 100003 -> 0.011957883834838867
// 100019 -> 0.012207984924316406
// 100043 -> 0.01112508773803711
// new times
// 100003 -> 0.0051670074462890625 
// 100019 -> 0.005042076110839844 
// 100043 -> 0.005042076110839844 

search_for_primes(1000000);
// 1000003 -> 0.03491687774658203
// 1000033 -> 0.04012489318847656
// 1000037 -> 0.02045893669128418
// new times
// 1000003 -> 0.016958951950073242 
// 1000033 -> 0.015790939331054688 
// 1000037 -> 0.01595783233642578

// only checking for 2 and odd numbers roughly halfs the time for larger numbers



