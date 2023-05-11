import { useEffect } from 'react';
import ProductDetails_Type1 from './ProductDetailsType1';

import { CaptureGTMEvent } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _ProductDetailsTemplates, _Props } from './productDetails';
import ProductDetails_Type2 from './productDetailType2';
import ProductDetails_Type3 from './productDetailType3';
import ProductDetails_Type4 from './productDetailType4';
import ProductDetails_Type5 from './productDetailType5';

const ProductDetailTemplates: _ProductDetailsTemplates = {
  type1: ProductDetails_Type1,
  type2: ProductDetails_Type2,
  type3: ProductDetails_Type3,
  type4: ProductDetails_Type4,
  type5: ProductDetails_Type5,
};

const ProductDetails: React.FC<_Props> = (props) => {
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const ProductDetails =
    ProductDetailTemplates[
      `type${props.productDetailsTemplateId}` as
        | 'type1'
        | 'type2'
        | 'type3'
        | 'type4'
    ];
  useEffect(() => {
    if (props.details) {
      const { SEO, details, colors } = props;
      const eventPayload = {
        pageTitle: SEO?.pageTitle,
        pageCategory: details?.categoryName,
        customProperty1: '',
        visitorType: customerId ? 'high-value' : 'low-value',
        event: 'view_item',
        ecommerce: {
          items: [
            {
              item_name: details?.name,
              item_id: details?.sku,
              item_brand: details?.brandName,
              item_category: details?.categoryName,
              item_variant: colors?.length ? colors[0]?.productSEName : '',
              index: details?.id,
              quantity: details?.quantity,
              item_list_name: details?.categoryName,
              item_list_id: details?.id,
              price: details?.salePrice,
            },
          ],
        },
      };
      CaptureGTMEvent(eventPayload);
    }
  }, []);
  return <ProductDetails {...props} />;
};

export default ProductDetails;
