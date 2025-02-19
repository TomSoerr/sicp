import {
  is_null,
  head,
  tail,
  list,
  is_undefined,
  pair,
  set_tail,
  error,
  equal,
  display,
} from 'sicp';

function assoc(key, records) {
  return (
    is_null(records) ? undefined
    : equal(key, head(head(records))) ? head(records)
    : assoc(key, tail(records))
  );
}

function make_table() {
  const local_table = list('*table*');

  function lookup(keys) {
    function for_each(prev_table, key_list) {
      const current_key = head(key_list);
      if (is_null(tail(key_list))) {
        // last key => fetch pair
        const record = assoc(current_key, tail(prev_table));
        return is_undefined(record) ? undefined : tail(record);
      }

      const subtable = assoc(current_key, tail(prev_table));
      if (is_undefined(subtable)) {
        return undefined;
      }
      return for_each(subtable, tail(key_list));
    }

    return for_each(local_table, keys);
  }

  function insert(keys, value) {
    function for_each(prev_table, key_list) {
      const current_key = head(key_list);
      if (is_null(tail(key_list))) {
        // last key => create pair
        set_tail(prev_table, pair(pair(current_key, value), tail(prev_table)));
        return;
      }

      let subtable = assoc(current_key, tail(prev_table));
      if (is_undefined(subtable)) {
        subtable = list(current_key);
        set_tail(prev_table, pair(subtable, tail(prev_table)));
      }

      for_each(subtable, tail(key_list));
    }
    for_each(local_table, keys);
  }

  function dispatch(m) {
    return (
      m === 'lookup' ? lookup
      : m === 'insert' ? insert
      : error(m, 'unknown operation -- table')
    );
  }
  return dispatch;
}

const operation_table = make_table();
const get = operation_table('lookup');
const put = operation_table('insert');

put(list('a', 'b'), 10);
put(list('a', 'c'), 11);
display(get(list('a', 'c'))); // 11
