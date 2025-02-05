import {
  pair,
  head,
  tail,
  list,
  is_null,
  append,
  display,
  error,
  is_pair,
} from 'sicp';

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

//

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

function encode(message, tree) {
  return is_null(message) ? null : (
      append(encode_symbol(head(message), tree), encode(tail(message), tree))
    );
}

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

const get_a_job_tree = generate_huffman_tree(
  list(
    list('A', 2),
    list('BOOM', 1),
    list('GET', 2),
    list('JOB', 2),
    list('NA', 16),
    list('SHA', 3),
    list('YIP', 9),
    list('WAH', 1),
  ),
);

const song = list(
  'GET',
  'A',
  'JOB',
  'SHA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'GET',
  'A',
  'JOB',
  'SHA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'WAH',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'SHA',
  'BOOM',
);

display(list_to_array(encode(song, get_a_job_tree), []));

const result = [
  1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 1, 0, 1, 1, 0, 1, 1,
]; // length 86

// the length would be 111 (ceil(lb(8)) * 37) for the song with fixed length

function list_to_array(l, arr) {
  return is_null(l) ? arr : (
      list_to_array(
        tail(l),
        (() => {
          arr.push(head(l));
          return arr;
        })(),
      )
    );
}
