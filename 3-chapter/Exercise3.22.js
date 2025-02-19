import { display, is_null, error, pair, tail, set_tail } from 'sicp';

function make_queue() {
  let front_ptr = null;
  let rear_ptr = null;

  const set_rear_ptr = (value) => {
    rear_ptr = value;
  };
  const set_front_ptr = (value) => {
    front_ptr = value;
  };

  function insert_queue(value) {
    const new_pair = pair(value, null);
    if (is_null(front_ptr)) {
      front_ptr = new_pair;
      rear_ptr = new_pair;
    } else {
      set_tail(rear_ptr, new_pair);
      rear_ptr = new_pair;
    }
    return pair(front_ptr, rear_ptr);
  }

  function delete_queue() {
    if (is_null(front_ptr)) {
      error(
        pair(front_ptr, rear_ptr),
        'delete_queue called with an empty queue',
      );
    } else {
      front_ptr = tail(front_ptr);
      return pair(front_ptr, rear_ptr);
    }
  }

  return (m) =>
    m === 'front_ptr' ? front_ptr
    : m === 'rear_pointer' ? rear_ptr
    : m === 'set_front_ptr' ? set_front_ptr
    : m === 'set_rear_ptr' ? set_rear_ptr
    : m === 'is_empty_queue' ? is_null(front_ptr)
    : m === 'insert_queue' ? insert_queue
    : m === 'delete_queue' ? delete_queue
    : error(m, 'unknown operation');
}

const q1 = make_queue();
display(q1('insert_queue')('a'));
display(q1('insert_queue')('b'));
display(q1('delete_queue')());
display(q1('delete_queue')());

// [["a", null], ["a", null]]
// [["a", ["b", null]], ["b", null]]
// [["b", null], ["b", null]]
// [null, ["b", null]]
