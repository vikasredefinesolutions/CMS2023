import ProductDetails_Type1 from './ProductDetailsType1';

import { _defaultTemplates } from '@configs/template.config';
import { NextPage } from 'next';
import { _StoreCache } from '../../pages/[slug]/slug';
import ProductDetails_Type2 from './productDetailType2';
import { _ProductDetailsProps } from './productDetailsTypes/productDetail.res';

type _Props = _ProductDetailsProps & _StoreCache;

export interface _ProductDetailsTemplates {
  type1: NextPage<_Props, _Props>;
  type2: NextPage<_Props, _Props>;
}

const ProductDetailTemplates: _ProductDetailsTemplates = {
  type1: ProductDetails_Type1,
  type2: ProductDetails_Type2,
};

const ProductDetails: NextPage<_ProductDetailsProps & _StoreCache> = (
  props,
) => {
  const ProductDetails =
    ProductDetailTemplates[_defaultTemplates.productDetails];
  return <ProductDetails {...props} />;
};

export default ProductDetails;
