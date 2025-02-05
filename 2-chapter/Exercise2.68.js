import {
  display,
  list,
  is_null,
  append,
  head,
  tail,
  is_pair,
  pair,
  error,
} from 'sicp';

function make_leaf(symbol, weight) {
  return list('leaf', symbol, weight);
}

export function symbol_leaf(x) {
  return head(tail(x));
}

function weight_leaf(x) {
  return head(tail(tail(x)));
}

export function left_branch(tree) {
  return head(tail(tree));
}

export function right_branch(tree) {
  return head(tail(tail(tree)));
}

export function is_leaf(object) {
  return head(object) === 'leaf';
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

function encode(message, tree) {
  return is_null(message) ? null : (
      append(encode_symbol(head(message), tree), encode(tail(message), tree))
    );
}

// solution below

function encode_symbol(sym, tree) {
  function search_tree(sym, tree) {
    if (is_leaf(tree)) {
      return symbol_leaf(tree) === sym;
    } else {
      const lb = search_tree(sym, left_branch(tree));
      const rb = search_tree(sym, right_branch(tree));
      return (
        lb === true ? pair(0, null)
        : rb === true ? pair(1, null)
        : is_pair(lb) ? pair(0, lb)
        : is_pair(rb) ? pair(1, rb)
        : false
      );
    }
  }
  return search_tree(sym, tree) || error('Symbol not in the tree');
}

const sample_tree = make_code_tree(
  make_leaf('A', 4),
  make_code_tree(
    make_leaf('B', 2),
    make_code_tree(make_leaf('D', 1), make_leaf('C', 1)),
  ),
);

display(encode(list('A', 'D', 'A', 'B', 'B', 'C', 'A'), sample_tree));
