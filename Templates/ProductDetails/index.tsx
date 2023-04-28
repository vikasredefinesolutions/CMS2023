import ProductDetails_Type1 from './ProductDetailsType1';

import ProductDetails_Type2 from './productDetailType2';
import ProductDetails_Type3 from './productDetailType3';
import { _ProductDetailsTemplates, _Props } from './productDetails';

const ProductDetailTemplates: _ProductDetailsTemplates = {
  type1: ProductDetails_Type1,
  type2: ProductDetails_Type2,
  type3: ProductDetails_Type3,
};

const ProductDetails: React.FC<_Props> = (props) => {
  const ProductDetails =
    ProductDetailTemplates[
      `type${props.productDetailsTemplateId}` as 'type1' | 'type2' | 'type3'
    ];
  return <ProductDetails {...props} />;
};

export default ProductDetails;
