import { list, pair, head, tail, display } from 'sicp';

function make_frame(origin, edge1, edge2) {
  return list(origin, edge1, edge2);
}

function make_frame_alt(origin, edge1, edge2) {
  return pair(origin, pair(edge1, edge2));
}

const edge1_frame = (f) => head(tail(f));
const edge2_frame = (f) => head(tail(tail(f)));
const origin_frame = (f) => head(f);

const edge1_frame_alt = (f) => head(tail(f));
const edge2_frame_alt = (f) => tail(tail(f));
const origin_frame_alt = (f) => head(f);
