import {
  is_undefined,
  is_null,
  is_string,
  is_number,
  head,
  tail,
  list,
  equal,
  set_tail,
  pair,
  error,
  is_pair,
  display,
} from 'sicp';

// operation_table, put and get
// from chapter 3 (section 3.3.3)

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

// From Chapter 2.3.2

function is_variable(x) {
  return is_string(x);
}

function is_same_variable(v1, v2) {
  return is_variable(v1) && is_variable(v2) && v1 === v2;
}

function make_sum(a1, a2) {
  return list('+', a1, a2);
}

function make_product(m1, m2) {
  return list('*', m1, m2);
}

function addend(s) {
  return head(s);
}

function augend(s) {
  return head(tail(s));
}

function multiplier(s) {
  return head(s);
}

function multiplicand(s) {
  return head(tail(s));
}

function base(s) {
  return head(s);
}

function exponent(s) {
  return head(tail(s));
}

function make_exponent(b, e) {
  return list('**', b, e);
}

function deriv(exp, variable) {
  return (
    is_number(exp) ? 0
    : is_variable(exp) ?
      is_same_variable(exp, variable) ? 1
      : 0
    : get('deriv', list(operator(exp)))(operands(exp), variable)
  );
}
function operator(exp) {
  return head(exp);
}

function operands(exp) {
  return tail(exp);
}

// solution below

// 1.
// To search in our operation table we need to call the operator() function
// however if the expression is only a variable or number, this function
// will generate an error.

// 2.
(function install_sum_product() {
  function sum(operands, variable) {
    return make_sum(
      deriv(addend(operands), variable),
      deriv(augend(operands), variable),
    );
  }

  function product(operands, variable) {
    return make_sum(
      make_product(
        multiplier(operands),
        deriv(multiplicand(operands), variable),
      ),
      make_product(
        deriv(multiplier(operands), variable),
        multiplicand(operands),
      ),
    );
  }

  put('deriv', list('*'), product);
  put('deriv', list('+'), sum);
  return 'done';
})();
// 3.

(function install_expo() {
  function exp(operands, variable) {
    return make_product(
      exponent(operands),
      make_product(
        make_exponent(base(operands), exponent(operands) - 1),
        deriv(base(operands), variable),
      ),
    );
  }

  put('deriv', list('**'), exp);
  return 'done';
})();

display(deriv(list('**', 'x', '2'), 'x'));

// 4.
// We would only need to change the lookup(key_1, key_2) function and switch the
// arguments
