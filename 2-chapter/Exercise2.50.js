function flip_horz(painter) {
  return transform_painter(
    painter,
    make_vect(1, 0),
    make_vect(0, 0),
    make_vect(1, 1),
  );
}

function rotate_180(painter) {
  return transform_painter(
    painter,
    make_vect(1, 1),
    make_vect(0, 1),
    make_vect(1, 0),
  );
}

function rotate_270(painter) {
  return transform_painter(
    painter,
    make_vect(0, 1),
    make_vect(1, 1),
    make_vect(0, 0),
  );
}
