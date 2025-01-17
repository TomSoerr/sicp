function below(painter1, painter2) {
  const split_point = make_vect(0, 0.5);
  const paint_bottom = transform_painter(
    painter1,
    make_vect(0, 0),
    make_vect(1, 0),
    split_point,
  );
  const paint_top = transform_painter(
    painter2,
    split_point,
    make_vect(1, 0.5),
    make_vect(0, 1),
  );
  return (frame) => {
    paint_bottom(frame);
    paint_top(frame);
  };
}

const below_rotate = (painter1, painter2) =>
  rotate270(beside(rotate90(painter1), rotate90(painter2)));
