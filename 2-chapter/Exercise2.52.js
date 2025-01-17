// 1.
const wave = segments_to_painter(
  list(
    line(0, 0.65, 0.15, 0.4),
    line(0.0, 0.85, 0.15, 0.6),
    line(0.15, 0.6, 0.3, 0.7),
    line(0.3, 0.7, 0.4, 0.7),
    line(0.4, 0.7, 0.35, 0.85),
    line(0.35, 0.85, 0.4, 1),
    line(0.6, 1, 0.65, 0.85),
    line(0.65, 0.85, 0.6, 0.7),
    line(0.6, 0.7, 0.7, 0.7),
    line(0.7, 0.7, 1, 0.4),
    line(1, 0.2, 0.6, 0.4),
    line(0.6, 0.4, 0.7, 0),
    line(0.6, 0, 0.5, 0.3),
    line(0.5, 0.3, 0.4, 0),
    line(0.3, 0, 0.4, 0.5),
    line(0.4, 0.5, 0.3, 0.6),
    line(0.3, 0.6, 0.15, 0.4),
    line(0.45, 0.85, 0.5, 0.8), // add smile
    line(0.5, 0.8, 0.55, 0.85),
  ),
);

// 2.
function corner_split(painter, n) {
  if (n === 0) {
    return painter;
  } else {
    const up = up_split(painter, n - 1);
    const right = right_split(painter, n - 1);
    const top_left = beside(up, up);
    const bottom_right = stack(right, right);
    const corner = rotate_180(corner_split(painter, n - 1)); // change corner image
    return stack(beside(top_left, corner), beside(painter, bottom_right));
  }
}

function square_limit(painter, n) {
  const combine4 = square_of_four(
    // change order
    turn_upside_down,
    flip_vert,
    flip_horiz,
    identity,
  );
  return combine4(corner_split(painter, n));
}
