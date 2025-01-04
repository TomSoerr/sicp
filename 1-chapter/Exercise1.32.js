function accumulate_filter(combiner, null_value, term, a, next, b) {
  return a > b
    ? null_value
    : combiner(
      term(a), accumulate_filter(combiner,
        null_value,
        term,
        next(a),
        next,
        b),
      );
}

function accumulate_i(combiner, null_value, term, a, next, b) {
  function iter(a, result) {
    return a > b
      ? result
      : iter(next(a), combiner(result, term(a)));
  }
  return iter(a, null_value);
}
