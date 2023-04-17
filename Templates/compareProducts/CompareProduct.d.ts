import { NextPage } from 'next';

export interface _CompareProductprops {
  products: _CompareProducts | null;
}
export interface _CompareProductTemplates {
  type1: NextPage<_CompareProductProps, _CompareProductProps>;
  // type2: NextPage<_CompareProductProps>;
  // type3: NextPage<_CompareProductProps, _CompareProductProps>;
  // type4: NextPage<_CompareProductProps, _CompareProductProps>;
}
