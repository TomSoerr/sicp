import {
  list,
  head,
  tail,
  is_null,
  pair,
  display,
  math_floor,
  length,
} from 'sicp';

function left_branch(tree) {
  return head(tail(tree));
}

function right_branch(tree) {
  return head(tail(tail(tree)));
}

function make_tree(entry, left, right) {
  return list(entry, left, right);
}

function list_to_tree(elements) {
  return head(partial_tree(elements, length(elements)));
}

function partial_tree(elts, n) {
  if (n === 0) {
    return pair(null, elts);
  } else {
    const left_size = math_floor((n - 1) / 2);
    const left_result = partial_tree(elts, left_size);
    const left_tree = head(left_result);
    const non_left_elts = tail(left_result);
    const right_size = n - (left_size + 1);
    const this_entry = head(non_left_elts);
    const right_result = partial_tree(tail(non_left_elts), right_size);
    const right_tree = head(right_result);
    const remaining_elts = tail(right_result);
    return pair(make_tree(this_entry, left_tree, right_tree), remaining_elts);
  }
}

// above from exercise or previous solutions

function getKey(tree) {
  return head(head(tree));
}

function value(tree) {
  return tail(head(tree));
}

function make_entry(key, value) {
  return pair(key, value);
}

const records = list_to_tree(
  list(
    make_entry(1, 'Peters'),
    make_entry(2, 'Müller'),
    make_entry(3, 'Meier'),
    make_entry(4, 'Schröder'),
    make_entry(5, 'Neumann'),
    make_entry(6, 'Fischer'),
  ),
);

function lookup_tree(key, tree) {
  return (
    is_null(tree) ? false
    : key === getKey(tree) ? value(tree)
    : key < getKey(tree) ? lookup_tree(key, left_branch(tree))
      // x > entry(set)x > entry(set)
    : lookup_tree(key, right_branch(tree))
  );
}

display(lookup_tree(6, records)); // Fischer
