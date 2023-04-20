import ProductDetails_Type1 from './ProductDetailsType1';

import { _ProductDetailsTemplates } from '@templates/ProductDetails/productDetails';
import { NextPage } from 'next';
import { _StoreCache } from '../../pages/[slug]/slug';
import ProductDetails_Type2 from './productDetailType2';
import { _ProductDetailsProps } from './productDetailsTypes/productDetail.res';

const ProductDetailTemplates: _ProductDetailsTemplates = {
  type1: ProductDetails_Type1,
  type2: ProductDetails_Type2,
};

const ProductDetails: NextPage<_ProductDetailsProps & _StoreCache> = (
  props,
) => {
  const ProductDetails = ProductDetailTemplates['type1'];
  return <ProductDetails {...props} />;
};

export default ProductDetails;
