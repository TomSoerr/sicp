import {
  list,
  pair,
  head,
  tail,
  is_undefined,
  is_null,
  equal,
  set_tail,
  is_pair,
  error,
} from 'sicp';

const type_tag = (datum) =>
  is_pair(datum) ? head(datum) : error(datum, 'bad tagged datum -- type_tag');

const attach_tag = (type_tag, contents) => pair(type_tag, contents);

const contents = (datum) =>
  is_pair(datum) ? tail(datum) : error(datum, 'bad tagged datum -- contents');

// operation_table, put and get
// from chapter 3 (section 3.3.3)
const assoc = (key, records) =>
  is_null(records) ? undefined
  : equal(key, head(head(records))) ? head(records)
  : assoc(key, tail(records));

function make_table() {
  const local_table = list('*table*');

  function lookup(key_1, key_2) {
    const subtable = assoc(key_1, tail(local_table));
    if (is_undefined(subtable)) {
      return undefined;
    } else {
      const record = assoc(key_2, tail(subtable));
      if (is_undefined(record)) {
        return undefined;
      } else {
        return tail(record);
      }
    }
  }

  function insert(key_1, key_2, value) {
    const subtable = assoc(key_1, tail(local_table));
    if (is_undefined(subtable)) {
      set_tail(
        local_table,
        pair(list(key_1, pair(key_2, value)), tail(local_table)),
      );
    } else {
      const record = assoc(key_2, tail(subtable));
      if (is_undefined(record)) {
        set_tail(subtable, pair(pair(key_2, value), tail(subtable)));
      } else {
        set_tail(record, value);
      }
    }
  }

  const dispatch = (m) =>
    m === 'lookup' ? lookup
    : m === 'insert' ? insert
    : 'undefined operation -- table';

  return dispatch;
}

const operation_table = make_table();
const get = operation_table('lookup');
const put = operation_table('insert');

export { get, put, type_tag, contents, attach_tag };
