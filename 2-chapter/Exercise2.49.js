import { list, pair } from 'sicp';

const make_vect = (x, y) => pair(x, y);
const make_segment = (v1, v2) => pair(v1, v2);

const line = (x1, y1, x2, y2) =>
  make_segment(make_vect(x1, y1), make_vect(x2, y2));

// 1.

const outline = segments_to_painter(
  list(line(0, 0, 0, 1), line(0, 1, 1, 1), line(1, 1, 1, 0), line(1, 0, 0, 0)),
);

const x = segments_to_painter(list(line(0, 0, 1, 1), line(0, 1, 1, 0)));

const diamond = segments_to_painter(
  list(
    line(0, 0.5, 0.5, 1),
    line(0.5, 1, 1, 0.5),
    line(1, 0.5, 0.5, 0),
    line(0.5, 0, 0, 0.5),
  ),
);

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
  ),
);
