function flatmap(f, seq) {
  return accumulate(append, null, map(f, seq));
}

function queens(board_size) {
  function queen_cols(k) {
    return k === 0 ?
        list(empty_board)
      : filter(
          (positions) => is_safe(k, positions),
          /////////////////////////
          flatmap(
            (rest_of_queens) =>
              map(
                (new_row) => adjoin_position(new_row, k, rest_of_queens),
                enumerate_interval(1, board_size),
              ),
            queen_cols(k - 1),
          ),
          /////////////////////////
        );
  }
  return queen_cols(board_size);
}

// vs

function queens_slow(board_size) {
  function queen_cols(k) {
    return k === 0 ?
        list(empty_board)
      : filter(
          (positions) => is_safe(k, positions),
          /////////////////////////
          flatmap(
            (new_row) =>
              map(
                (rest_of_queens) => adjoin_position(new_row, k, rest_of_queens),
                queen_cols(k - 1),
              ),
            enumerate_interval(1, board_size),
          ),
          /////////////////////////
        );
  }
  return queen_cols(board_size);
}
// the queens_slow function calculates a whole new tree for every position of the current column. The time should grow exponential in comparison to the other function
