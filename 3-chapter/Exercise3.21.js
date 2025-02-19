const print_queue = (q) => {
  display(head(q));
};

const q1 = make_queue();
print_queue(insert_queue(q1, 'a'));
print_queue(insert_queue(q1, 'b'));
print_queue(delete_queue(q1));
print_queue(delete_queue(q1));

// printing the return value form insert_queue or delete_queue will show a pair
// of the que and the last element of the queue.
// when all elements are deleted the tail of the pair still points to the last
// element that was in the queue.
