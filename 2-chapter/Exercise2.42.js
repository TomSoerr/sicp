import {
  list,
  filter,
  map,
  display,
  pair,
  head,
  tail,
  accumulate,
  append,
} from 'sicp';

// given
const flatmap = (fn, seq) => accumulate(append, null, map(fn, seq));

// given
const enumerate_interval = (low, high) =>
  low > high ? null : pair(low, enumerate_interval(low + 1, high));

function replace_vec(pos, item, vec) {
  function iter(count, x) {
    return count === pos ?
        pair(item, tail(x))
      : pair(head(x), iter(count + 1, tail(x)));
  }
  return iter(1, vec);
}

function replace_mat(pos_m, pos_n, item, mat) {
  function iter(count, col) {
    return count === pos_n ?
        pair(replace_vec(pos_m, item, head(col)), tail(col))
      : pair(head(col), iter(count + 1, tail(col)));
  }
  return iter(1, mat);
}

function queens(board_size) {
  // starts with 1 not 0 because the representation is implemented as a matrix
  function get_item(items, n) {
    return n === 1 ? head(items) : get_item(tail(items), n - 1);
  }

  function get_pos(vec, n) {
    return head(vec) === 1 ? n : get_pos(tail(vec), n + 1);
  }

  function is_safe(col, board) {
    // const board_size = 8; // move this function into queens so is_safe can access board_size
    const plus = (x) => x + 1;
    const minus = (x) => x - 1;
    const same = (x) => x;

    const pos_in_question = get_pos(get_item(board, col), 1);

    function is_prev_safe(next, m, n) {
      if (m < 1 || m > board_size || n < 1) return true;
      const column = get_item(board, n);
      const pos = get_pos(column, 1);
      return pos === m ? false : is_prev_safe(next, next(m), n - 1);
    }

    return (
      is_prev_safe(plus, pos_in_question + 1, col - 1) && // horizontal
      is_prev_safe(minus, pos_in_question - 1, col - 1) && // strait
      is_prev_safe(same, pos_in_question, col - 1) // other horizontal
    );
  }

  function adjoin_position(row, col_num, board) {
    return replace_mat(row, col_num, 1, board);
  }

  function create_empty_board(size) {
    return map(
      () => map(() => 0, enumerate_interval(1, size)),
      enumerate_interval(1, size),
    );
  }

  const empty_board = create_empty_board(board_size);

  function queen_cols(k) {
    return k === 0 ?
        list(empty_board)
      : filter(
          (positions) => is_safe(k, positions),
          flatmap(
            (rest_of_queens) =>
              map(
                (new_row) => adjoin_position(new_row, k, rest_of_queens),
                enumerate_interval(1, board_size),
              ),
            queen_cols(k - 1),
          ),
        );
  }
  return queen_cols(board_size);
}

// const test = list(
//   list(0, 0, 1, 0, 0, 0, 0, 0),
//   list(0, 0, 0, 0, 0, 0, 1, 0),
//   list(0, 1, 0, 0, 0, 0, 0, 0),
//   list(0, 0, 0, 0, 0, 0, 0, 1),
//   list(0, 0, 0, 0, 1, 0, 0, 0),
//   list(1, 0, 0, 0, 0, 0, 0, 0),
//   list(0, 0, 0, 1, 0, 0, 0, 0),
//   list(0, 0, 0, 0, 0, 1, 0, 0),
// );

display(queens(8));
