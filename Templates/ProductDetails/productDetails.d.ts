import { _ProductDetailsProps } from '@templates/ProductDetails/productDetailsTypes/productDetail.res';
import { NextPage } from 'next';
import { _StoreCache } from 'pages/[slug]/slug';

interface _Props {
  id: number;
}

export interface _ProductDetailsTemplates {
  type1: NextPage<
    _ProductDetailsProps & _StoreCache,
    _ProductDetailsProps & _StoreCache
  >;
  type2: NextPage<
    _ProductDetailsProps & _StoreCache,
    _ProductDetailsProps & _StoreCache
  >;
}
