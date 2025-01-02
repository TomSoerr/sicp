function fast_times_iter(n, counter, product) {
    return counter <= 1
      ? product
      : counter % 2
        ? n * fast_times_iter(n, counter - 1, product)
        : fast_times_iter(n, counter / 2, product * product);
}

