// 1.
// When a function that is not defined for the types of the argument gets called
// the assoc function will not stop running.
// apply_generic("exp", [z1, z2])
// get("exp", list("complex", "complex")) will return undefined
// coercion_list has the entry ("complex", "complex") and this function is used
// apply_generic() is called again with (in  this case) the same args
// no function is found and so the loop repeats

// 2.
// Yes and no, if an operation is defined for a higher type the apply_generic
// function cannot solve this issue because both arguments need to be raised.
// But this is not the way Louis is talking about this problem. If the operation
// is defined for both types it will not try coercion

// 3.

// add this to the apply_generic() function
if (type1 === type2) error('same type arguments');
