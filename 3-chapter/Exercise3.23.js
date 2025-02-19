import {
  display,
  is_null,
  error,
  pair,
  tail,
  set_tail,
  head,
  set_head,
} from 'sicp';

// selectors

function front_ptr(dequeue) {
  return head(dequeue);
}

function rear_ptr(dequeue) {
  return tail(dequeue);
}

function set_front_ptr(dequeue, value) {
  return set_head(dequeue, value);
}

function set_rear_ptr(dequeue, value) {
  return set_tail(dequeue, value);
}

function get_forwards_ptr(item) {
  return head(tail(item));
}

function get_backwards_ptr(item) {
  return tail(tail(item));
}

function get_value(item) {
  return head(item);
}

function rear_dequeue(dequeue) {
  if (is_empty_dequeue(dequeue))
    error(dequeue, 'rear_dequeue called with an empty dequeue');
  return get_value(rear_ptr(dequeue));
}

function front_dequeue(dequeue) {
  if (is_empty_dequeue(dequeue))
    error(dequeue, 'front_dequeue called with an empty dequeue');
  return get_value(front_ptr(dequeue));
}

function dequeue_to_list(dequeue) {
  return is_null(dequeue) ? null : (
      pair(get_value(dequeue), dequeue_to_list(get_forwards_ptr(dequeue)))
    );
}

// predicates

function is_empty_dequeue(dequeue) {
  return is_null(front_ptr(dequeue));
}

// constructors

/**
 * @return pair(item, pair(forwards pointer, backwards pointer))
 */
function make_dequeue() {
  return pair(null, null);
}

// mutators

function set_backwards_ptr(item, ptr) {
  set_tail(tail(item), ptr);
}

function set_forwards_ptr(item, ptr) {
  set_head(tail(item), ptr);
}

function front_insert_dequeue(dequeue, item) {
  if (is_empty_dequeue(dequeue)) {
    const new_head = pair(item, pair(null, null));
    set_front_ptr(dequeue, new_head);
    set_rear_ptr(dequeue, new_head);
  } else {
    const old_head = front_ptr(dequeue);
    const new_head = pair(item, pair(old_head, null));
    set_backwards_ptr(old_head, new_head);

    set_front_ptr(dequeue, new_head);
    return dequeue;
  }
}

function front_delete_dequeue(dequeue) {
  if (is_empty_dequeue(dequeue)) {
    error(dequeue, 'front_delete_dequeue called with an empty dequeue');
  } else {
    const new_head = get_forwards_ptr(front_ptr(dequeue));
    set_backwards_ptr(new_head, null);
    set_front_ptr(dequeue, new_head);
    return dequeue;
  }
}

function rear_insert_dequeue(dequeue, item) {
  if (is_empty_dequeue(dequeue)) {
    const new_head = pair(item, pair(null, null));
    set_front_ptr(dequeue, new_head);
    set_rear_ptr(dequeue, new_head);
  } else {
    const old_tail = rear_ptr(dequeue);
    const new_tail = pair(item, pair(null, old_tail));
    set_forwards_ptr(old_tail, new_tail);

    set_rear_ptr(dequeue, new_tail);
    return dequeue;
  }
}

function rear_delete_dequeue(dequeue) {
  if (is_empty_dequeue(dequeue)) {
    error(dequeue, 'front_delete_dequeue called with an empty dequeue');
  } else {
    const new_tail = get_backwards_ptr(rear_ptr(dequeue));
    set_forwards_ptr(new_tail, null);
    set_rear_ptr(dequeue, new_tail);
    return dequeue;
  }
}

// tests

const q1 = make_dequeue();
front_insert_dequeue(q1, 'b');
front_insert_dequeue(q1, 'a');
// front_insert_dequeue(q1, 'c');
// front_insert_dequeue(q1, 'd');
rear_insert_dequeue(q1, 'x');
rear_insert_dequeue(q1, 'y');
rear_insert_dequeue(q1, 'z');

display(dequeue_to_list(front_ptr(q1)));
// ["a", ["b", ["x", ["y", ["z", null]]]]]

rear_delete_dequeue(q1);
front_delete_dequeue(q1);
display(dequeue_to_list(front_ptr(q1)));
// ["b", ["x", ["y", null]]]
