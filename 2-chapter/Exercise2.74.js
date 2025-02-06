import {
  is_undefined,
  is_null,
  head,
  tail,
  list,
  equal,
  set_tail,
  pair,
  error,
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
  function lookup(key_1, key_2) {
    const subtable = assoc(key_1, tail(local_table));
    if (is_undefined(subtable)) {
      return undefined;
    } else {
      const record = assoc(key_2, tail(subtable));
      return is_undefined(record) ? undefined : tail(record);
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

// solution below

function obj(lst) {
  function get_value(key, l) {
    return (
      is_null(l) ? undefined
      : equal(key, head(head(l))) ? tail(head(l))
      : get_value(key, tail(l))
    );
  }
  return (k) => get_value(k, lst);
}

function get_tag(file) {
  return head(file);
}

function get_content(file) {
  return tail(file);
}

const personnel_file_berlin = pair(
  'berlin',
  list(
    pair('berlin', list('Bernd', '12 €', list('More info'))),
    pair('berlin', list('Frieda', '18 €', list('More info'))),
  ),
);

const personnel_file_hamburg = pair(
  'hamburg',
  list(
    pair(
      'hamburg',
      obj(
        list(
          pair('name', 'Ben'),
          pair('salary', '22 €'),
          pair('more', list('More info')),
        ),
      ),
    ),
    pair(
      'hamburg',
      obj(
        list(
          pair('name', 'Mink'),
          pair('salary', '19 €'),
          pair('more', list('More info')),
        ),
      ),
    ),
  ),
);

(function install_berlin() {
  const get_name = (record) => head(record);

  function get_record(employee_name, personnel_file) {
    return (
      is_null(personnel_file) ? undefined
      : equal(employee_name, get_name(get_content(head(personnel_file)))) ?
        head(personnel_file)
      : get_record(employee_name, tail(personnel_file))
    );
  }

  function get_salary(employee_record) {
    return head(tail(employee_record));
  }

  put('GET record', list('berlin'), get_record);
  put('GET salary', list('berlin'), get_salary);
  return 'done';
})();

(function install_hamburg() {
  function get_record(employee_name, personnel_file) {
    return (
      is_null(personnel_file) ? undefined
      : equal(employee_name, get_content(head(personnel_file))('name')) ?
        head(personnel_file)
      : get_record(employee_name, tail(personnel_file))
    );
  }

  function get_salary(employee_record) {
    return employee_record('salary');
  }

  put('GET record', list('hamburg'), get_record);
  put('GET salary', list('hamburg'), get_salary);
  return 'done';
})();

// 1.

function get_record(employee_name, personnel_file) {
  return get('GET record', list(get_tag(personnel_file)))(
    employee_name,
    get_content(personnel_file),
  );
}

// each division database has to be tagged

display(get_record('Bernd', personnel_file_berlin));
display(get_record('Ben', personnel_file_hamburg));

// 2.

function get_salary(employee_record) {
  return get(
    'GET salary',
    list(get_tag(employee_record)),
  )(get_content(employee_record));
}

// each employee entry has to be tagged

display(get_salary(get_record('Bernd', personnel_file_berlin)));
display(get_salary(get_record('Ben', personnel_file_hamburg)));

// 3.

function find_employee_record(employee_name, personnel_file_list) {
  if (is_null(personnel_file_list)) return undefined;
  const record = get_record(employee_name, head(personnel_file_list));

  return record ? record : (
      find_employee_record(employee_name, tail(personnel_file_list))
    );
}

display(
  find_employee_record(
    'Bernd',
    list(personnel_file_berlin, personnel_file_hamburg),
  ),
);

// 4.
// The new company needs to create its one selector functions and add them to
// the operation table
