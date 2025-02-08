import { list } from 'sicp';
import { attach_tag } from './table-helper.js';

function install_raise_package(put, get) {
  const raise_to_rational = (n) => get('make', 'rational')(n, 1);
  const raise_to_real = (n, d) => get('make', 'real')(n / d);
  const raise_to_complex = (x) => get('make_from_real_imag', 'complex')(x, 0);
  const denom = (x) => get('denom', 'rational')(x);
  const numer = (x) => get('number', 'rational')(x);

  put('raise', list('integer'), (x) =>
    attach_tag('rational', raise_to_rational(x)),
  );
  put('raise', list('rational'), (x) =>
    attach_tag('real', raise_to_real(numer(x), denom(x))),
  );
  put('raise', list('real'), (x) => attach_tag('complex', raise_to_complex(x)));
}
