//############################################################################//
//                                                                            //
//                             dense term package                             //
//                                                                            //
//############################################################################//

function install_dense_term_package(put, get, apply_generic) {
  const tag = (p) => attach_tag('dense_term', p);
  const list_tag = (p) => attach_tag('dense_term_list', p);

  const make_term = (coeff) => tag(coeff);
  const coeff = contents;

  put('make', 'dense_term', make_term);
  put('make', 'dense_term_list', (L) => list_tag(L));
}
