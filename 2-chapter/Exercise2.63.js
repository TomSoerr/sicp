import { list, head, tail, is_null, append, pair, display } from 'sicp';

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

function tree_to_list_1(tree) {
  return is_null(tree) ? null : (
      append(
        tree_to_list_1(left_branch(tree)),
        pair(entry(tree), tree_to_list_1(right_branch(tree))),
      )
    );
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

// 1

display(
  tree_to_list_1(
    make_tree(
      7,
      make_tree(3, make_tree(1, null, null), make_tree(5, null, null)),
      make_tree(9, null, make_tree(11, null, null)),
    ),
  ),
);

display(
  tree_to_list_2(
    make_tree(
      7,
      make_tree(3, make_tree(1, null, null), make_tree(5, null, null)),
      make_tree(9, null, make_tree(11, null, null)),
    ),
  ),
);

// 2

// display(
//   tree_to_list_1(
//     make_tree(
//       3,
//       make_tree(1, null, null),
//       make_tree(
//         7,
//         make_tree(5, null, null),
//         make_tree(9, null, make_tree(11, null, null)),
//       ),
//     ),
//   ),
// );

// display(
//   tree_to_list_2(
//     make_tree(
//       3,
//       make_tree(1, null, null),
//       make_tree(
//         7,
//         make_tree(5, null, null),
//         make_tree(9, null, make_tree(11, null, null)),
//       ),
//     ),
//   ),
// );

// 3

// display(
//   tree_to_list_1(
//     make_tree(
//       5,
//       make_tree(3, make_tree(1, null, null), null),
//       make_tree(9, make_tree(7, null, null), make_tree(11, null, null)),
//     ),
//   ),
// );

// display(
//   tree_to_list_2(
//     make_tree(
//       5,
//       make_tree(3, make_tree(1, null, null), null),
//       make_tree(9, make_tree(7, null, null), make_tree(11, null, null)),
//     ),
//   ),
// );

// Exercise 1.
// The two functions produce the same result for every tree of figure 2.16.

// Exercise 2.
// The second function does not call the append function for each node. This results in the first function growing faster.
