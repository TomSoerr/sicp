'use strict';

function square(x) {
  return x * x;
}

function is_even(n) {
  return n % 2 === 0;
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : exp & 1
      ? (base * expmod(base, exp - 1, m)) % m
      : square(expmod(base, exp / 2, m)) % m;
}


function fermat_test(n) {
  function try_it(a) {
    return expmod(a, n, n) === a;
  }
  return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

function fast_is_prime(n, times) {
  return times === 0
    ? true
    : fermat_test(n)
      ? fast_is_prime(n, times - 1)
      : false;
}

function is_prime(n) {
  return n === fast_is_prime(n, 3);
}

function report_prime(elapsed_time, n) {
  console.log(n)
  console.log('**************');
  console.log(elapsed_time, "\n");
  return true;
}

function start_prime_test(n, start_time) {
  return fast_is_prime(n, 1) ? report_prime(performance.now() - start_time, n) : false;
}

function timed_prime_test(n) {
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

///////////////////////////////////////////////////////

search_for_primes(1000);
search_for_primes(1000000);

// 1009 -> 0.0019588470458984375 
// 1013 -> 0.0022079944610595703 
// 1019 -> 0.0038750171661376953 
// 1000003 -> 0.0032501220703125 
// 1000033 -> 0.003083944320678711 
// 1000037 -> 0.002416849136352539 

// the time should grow with a factor of 3 (log 1.000) but is hard to notice this during these short timespan's

