//############################################################################//
//                                                                            //
//                                  solution                                  //
//                                                                            //
//############################################################################//

function apply_generic(op, args) {
  const apply = (fun, args) => apply_in_underlying_javascript(fun, args);

  const successive_raise = (number, count) =>
    count <= 0 ? number : raise(successive_raise(number, count - 1));

  function drop(number) {
    if (type_tag(number) === head(tower)) return number;
    const projection = apply_generic('project', list(number));
    return !is_equal(number, projection) ? number : drop(projection);
  }

  const all_the_same = (xs) =>
    reduce(
      (prev, curr) =>
        is_undefined(prev) ? curr
        : !prev ? false
        : prev === curr ? curr
        : false,
      undefined,
      xs,
    );

  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);

  if (!is_undefined(fun) && op !== 'is_equal' && length(args) > 1) {
    return drop(apply(fun, map(contents, args)));
  } else if (!is_undefined(fun)) {
    return apply(fun, map(contents, args));
  } else if (all_the_same(type_tags)) {
    error(list(op, type_tags), 'no method for these types');
  } else {
    const type_tags_rank = map((x) => get_position(x), type_tags);
    const max_rank = reduce(
      (prev, curr) => (curr > prev ? curr : prev),
      0,
      type_tags_rank,
    );
    const new_args = map(
      (arg) => successive_raise(arg, max_rank - get_position(type_tag(arg))),
      args,
    );

    return apply_generic(op, new_args);
  }
}

const z1 = make_complex_cartesian(2, 0);
const z2 = make_complex_cartesian(5, 0);
const i1 = make_integer(4);
const r1 = make_real(5);
const r2 = make_real(5);

display(add(z1, z2));
