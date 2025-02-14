const P1 = make_polynomial(
  'x',
  make_term_list(
    list(
      make_term(2, make_real(1)),
      make_term(1, make_real(-2)),
      make_term(0, make_real(1)),
    ),
  ),
);

const P2 = make_polynomial(
  'x',
  make_term_list(list(make_term(2, make_real(11)), make_term(0, make_real(7)))),
);

const P3 = make_polynomial(
  'x',
  make_term_list(list(make_term(1, make_real(13)), make_term(0, make_real(5)))),
);

const Q1 = mul(P1, P2);
const Q2 = mul(P1, P3);

const rf = gcd(Q1, Q2);

display(rf);

// Q1 = 11x^4 -22x^3 + 18x^2 - 14x + 7
// = (x^2 - 2x + 1) * (11x^2 + 7)
// Q2 = 13x^3 - 21x^2 + 3x + 5
// = (x^2 - 2x + 1) * (13x + 5)

// gcd(11x^4 -22x^3 + 18x^2 - 14x + 7, 13x^3 - 21x^2 + 3x + 5)
// remainder_terms => 8.6x^2 - 17.2x + 8.6
// gcd(13x^3 - 21x^2 + 3x + 5, 8.6x^2 - 17.2x + 8.6)
// remainder_terms => -1.2e-14x + 7.9e-15
// gcd(8.6x^2 - 17.2x + 8.6, -1.2e-14x + 7.9e-15)
// remainder_terms => 1.1

// to binary rounding errors the division can never be exact enough
// to find a larger gcd than 1
