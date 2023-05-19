import { useEffect } from 'react';
import ProductDetails_Type1 from './ProductDetailsType1';

import { CaptureGTMEvent } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import ProductDetails_Type2 from './productDetailType2';
import ProductDetails_Type3 from './productDetailType3';
import ProductDetails_Type4 from './productDetailType4';
import ProductDetails_Type5 from './productDetailType5';
import { _ProductDetailsTemplates, _Props } from './productDetails';

const ProductDetailTemplates: _ProductDetailsTemplates = {
  type1: ProductDetails_Type1,
  type2: ProductDetails_Type2,
  type3: ProductDetails_Type3,
  type4: ProductDetails_Type4,
  type5: ProductDetails_Type5,
};

const ProductDetails: React.FC<_Props> = (props) => {
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const { id: storeId, pageType } = useTypedSelector_v2((state) => state.store);

  const { SEO, details, colors, storeCode } = props;
  const ProductDetails =
    ProductDetailTemplates[
      `type${props.productDetailsTemplateId}` as
        | 'type1'
        | 'type2'
        | 'type3'
        | 'type4'
    ];

  useEffect(() => {
    if (details) {
      const eventPayload = {
        pageTitle: SEO?.pageTitle,
        pageCategory: details?.categoryName,
        customProperty1: '',
        visitorType: customerId ? 'high-value' : 'low-value',
        event: 'view_item',
        ecommerce: {
          items: [
            {
              item_id: details?.sku,
              item_name: details?.name,
              item_brand: details?.brandName,
              item_category: '',
              item_category2: '',
              item_category3: '',
              item_category4: '',
              item_variant: colors?.length
                ? colors.find((clr) => clr.productId === details?.id)?.name
                : '',
              item_list_id: details?.id,
              item_list_name: details?.name,
              index: details?.id,
              price: details?.salePrice,
              quantity: details?.quantity,
            },
          ],
        },
      };
      CaptureGTMEvent(eventPayload);
    }
  }, [details?.id]);

  return <ProductDetails {...props} />;
};

export default ProductDetails;
