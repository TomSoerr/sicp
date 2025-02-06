import { math_cos, error, math_sin } from 'sicp';

function make_from_mag_ang(m, a) {
  function dispatch(op) {
    return (
      op === 'real_part' ? math_cos(a) * m
      : op === 'imag_part' ? math_sin(a) * m
      : op === 'magnitude' ? m
      : op === 'angle' ? a
      : error(op, 'unknown op -- make_from_real_imag')
    );
  }
  return dispatch;
}
