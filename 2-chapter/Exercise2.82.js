import { reduce } from './helper.js';
import {
  is_undefined,
  map,
  apply,
  error,
  list_ref,
  list,
  append,
  head,
  is_pair,
  tail,
} from 'sicp';
import { get_coercion } from './coercion-helper.js';
import { get } from './table-helper.js';

function type_tag(datum) {
  return is_pair(datum) ?
      head(datum)
    : error(datum, 'bad tagged datum -- type_tag');
}
function contents(datum) {
  return is_pair(datum) ?
      tail(datum)
    : error(datum, 'bad tagged datum -- contents');
}

//############################################################################//
//                                                                            //
//                                  solution                                  //
//                                                                            //
//############################################################################//

function apply_generic(op, args) {
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

  if (!is_undefined(fun)) {
    return apply(fun, map(contents, args));
  } else if (all_the_same(type_tags)) {
    error(list(op, type_tags), 'no method for these types');
  } else {
    const len = length(type_tags);
    function go_through(count) {
      const to_type = list_ref(type_tags, count);
      const items = reduce(
        (prev, current_arg, c) => {
          if (is_undefined(prev)) return undefined;

          const current_tag = head(current_arg);
          console.log(current_tag === to_type, count, c);
          if (current_tag === to_type) return append(prev, list(current_arg));

          const fn = get_coercion(current_tag, to_type);
          return is_undefined(fn) ? undefined : (
              append(prev, list(fn(current_arg)))
            );
        },
        null,
        args,
      );

      return (
        count >= len ? error(list(op, type_tags), 'no method for these types')
        : !is_undefined(items) && all_the_same(items) ? apply_generic(op, items)
        : go_through(count + 1)
      );
    }

    return go_through(0);
  }
}

// This operation will only work if the supplied operation to which the types
// should be conversed to have the same values.
// For example for an operation of (type1, type2, type2) this technique will not
// work because the coerced result has the same type.
