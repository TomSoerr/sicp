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

function assoc(key, records, same_key) {
  return (
    is_null(records) ? undefined
    : same_key(key, head(head(records))) ? head(records)
    : assoc(key, tail(records), same_key)
  );
}

function make_table(same_key) {
  const local_table = list('*table*');
  function lookup(key_1, key_2) {
    const subtable = assoc(key_1, tail(local_table), same_key);
    if (is_undefined(subtable)) {
      return undefined;
    } else {
      const record = assoc(key_2, tail(subtable), same_key);
      return is_undefined(record) ? undefined : tail(record);
    }
  }
  function insert(key_1, key_2, value) {
    const subtable = assoc(key_1, tail(local_table), same_key);
    if (is_undefined(subtable)) {
      set_tail(
        local_table,
        pair(list(key_1, pair(key_2, value)), tail(local_table)),
      );
    } else {
      const record = assoc(key_2, tail(subtable), same_key);
      if (is_undefined(record)) {
        set_tail(subtable, pair(pair(key_2, value), tail(subtable)));
      } else {
        set_tail(record, value);
      }
    }
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

function approximation(num1, num2) {
  return Math.abs(num1 - num2) < 2;
}

const operation_table = make_table(approximation);
const get = operation_table('lookup');
const put = operation_table('insert');

put(100300, 42, 'Hello World');
display(get(100301.9, 42.2));
