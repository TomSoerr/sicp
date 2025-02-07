import { list, pair, head, tail, is_undefined, is_null, equal } from 'sicp';

// operation_table, put and get
// from chapter 3 (section 3.3.3)
let coercion_list = null;

function put_coercion(type1, type2, item) {
  if (is_undefined(get_coercion(type1, type2))) {
    coercion_list = pair(list(type1, type2, item), coercion_list);
  } else {
    return coercion_list;
  }
}

function get_coercion(type1, type2) {
  const get_type1 = (list_item) => head(list_item);

  const get_type2 = (list_item) => head(tail(list_item));

  const get_item = (list_item) => head(tail(tail(list_item)));

  function get_coercion_iter(items) {
    if (is_null(items)) {
      return undefined;
    } else {
      const top = head(items);
      return equal(type1, get_type1(top)) && equal(type2, get_type2(top)) ?
          get_item(top)
        : get_coercion_iter(tail(items));
    }
  }
  return get_coercion_iter(coercion_list);
}

export { get_coercion, put_coercion };
