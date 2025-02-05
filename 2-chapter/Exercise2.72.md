```js
function encode_symbol(symbol, tree) {
  function contains_symbol(symbol, current_tree) {
    return !is_null(member(symbol, symbols(current_tree)));
  }
  if (is_leaf(tree)) {
    return null;
  } else {
    const left_tree = left_branch(tree);
    const right_tree = right_branch(tree);
    return (
      contains_symbol(symbol, left_tree) ?
        pair(0, encode_symbol(symbol, left_tree))
      : contains_symbol(symbol, right_tree) ?
        pair(1, encode_symbol(symbol, right_tree))
      : error('symbol not found -- encode_symbol')
    );
  }
}
```

In the wort case the function needs to check $n - 1$ nodes symbol list (highly unbalanced tree se exercise 2.71) and each symbol list has the length of $n, n-1, n-2, ..., 1$ so $\frac{x * x}{2}$ steps and the order of growth is $\Theta(n^2)$.
