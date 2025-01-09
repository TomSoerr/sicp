const pair = (x, y) => (m) => m(x, y);
const head = (z) => z((p, q) => p);
const tail = (z) => z((p, q) => q);
