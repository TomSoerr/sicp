import {
  list,
  head,
  tail,
  is_null,
  append,
  pair,
  display,
  math_floor,
} from 'sicp';

function entry(tree) {
  return head(tree);
}

function left_branch(tree) {
  return head(tail(tree));
}

function right_branch(tree) {
  return head(tail(tail(tree)));
}

function make_tree(entry, left, right) {
  return list(entry, left, right);
}

function tree_to_list_2(tree) {
  function copy_to_list(tree, result_list) {
    return is_null(tree) ? result_list : (
        copy_to_list(
          left_branch(tree),
          pair(entry(tree), copy_to_list(right_branch(tree), result_list)),
        )
      );
  }
  return copy_to_list(tree, null);
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

// above given by previous exercises

function union_set(set1, set2) {
  if (is_null(set1)) return set2;
  if (is_null(set2)) return set1;

  const x1 = entry(set1);
  const x2 = entry(set2);
  return (
    x1 === x2 ?
      make_tree(
        x1,
        union_set(left_branch(set1), left_branch(set2)),
        union_set(right_branch(set1), right_branch(set2)),
      )
    : x1 < x2 ? make_tree(idk, union_set())
      // x1 > x2
    : pair(x2, union_set(set1, tail(set2)))
  );
}

function intersection_set(set1, set2) {
  if (is_null(set1) || is_null(set2)) {
    return null;
  } else {
    const x1 = head(set1);
    const x2 = head(set2);
    return (
      x1 === x2 ? pair(x1, intersection_set(tail(set1), tail(set2)))
      : x1 < x2 ? intersection_set(tail(set1), set2)
        // x2 < x1x2 < x1
      : intersection_set(set1, tail(set2))
    );
  }
}

display(
  union_set(
    list_to_tree(list(1, 2, 3, 4)),
    list_to_tree(list(4, 5, 6, 7, 8, 9)),
  ),
);
