import { pair, head, tail, list, is_null, append, display } from 'sicp';

function make_leaf(symbol, weight) {
  return list('leaf', symbol, weight);
}
function is_leaf(object) {
  return head(object) === 'leaf';
}
function symbol_leaf(x) {
  return head(tail(x));
}

function weight_leaf(x) {
  return head(tail(tail(x)));
}

function left_branch(tree) {
  return head(tail(tree));
}

function right_branch(tree) {
  return head(tail(tail(tree)));
}

function symbols(tree) {
  return is_leaf(tree) ? list(symbol_leaf(tree)) : head(tail(tail(tail(tree))));
}
function weight(tree) {
  return is_leaf(tree) ? weight_leaf(tree) : head(tail(tail(tail(tail(tree)))));
}

function make_code_tree(left, right) {
  return list(
    'code_tree',
    left,
    right,
    append(symbols(left), symbols(right)),
    weight(left) + weight(right),
  );
}

function adjoin_set(x, set) {
  return (
    is_null(set) ? list(x)
    : weight(x) < weight(head(set)) ? pair(x, set)
    : pair(head(set), adjoin_set(x, tail(set)))
  );
}

function make_leaf_set(pairs) {
  if (is_null(pairs)) {
    return null;
  } else {
    const first_pair = head(pairs);
    return adjoin_set(
      make_leaf(
        head(first_pair), // symbol
        head(tail(first_pair)),
      ), // frequency
      make_leaf_set(tail(pairs)),
    );
  }
}

// successive_merge function to be written by student

function generate_huffman_tree(pairs) {
  return successive_merge(make_leaf_set(pairs));
}

function successive_merge(leaf_set) {
  return is_null(tail(leaf_set)) ?
      head(leaf_set)
    : successive_merge(
        adjoin_set(
          make_code_tree(head(leaf_set), head(tail(leaf_set))),
          tail(tail(leaf_set)),
        ),
      );
}

display(
  generate_huffman_tree(
    list(list('A', 4), list('B', 2), list('C', 1), list('D', 1)),
  ),
);
