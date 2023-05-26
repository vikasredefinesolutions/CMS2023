import { useEffect, useRef } from 'react';
import ProductDetails_Type1 from './ProductDetailsType1';

import {
  GoogleAnalyticsTrackerForAllStore,
  GoogleAnalyticsTrackerForCG,
} from '@helpers/common.helper';
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
  const isCaptured = useRef(false);

  const { details, colors } = props;
  const ProductDetails =
    ProductDetailTemplates[
      `type${props.productDetailsTemplateId}` as
        | 'type1'
        | 'type2'
        | 'type3'
        | 'type4'
    ];

  useEffect(() => {
    if (details && storeId && !isCaptured.current) {
      isCaptured.current = true;
      const payload = {
        storeId: storeId,
        customerId: customerId || 0,
        productId: details?.id,
        productName: details?.name,
        colorName: colors?.length
          ? colors.find((clr) => clr.productId === details?.id)?.name
          : '',
        price: details?.msrp,
        salesPrice: details?.salePrice,
        sku: details?.sku,
        brandName: details?.brandName,
        quantity: details?.quantity,
      };

      GoogleAnalyticsTrackerForCG(
        'GoogleProductDetailScript',
        storeId,
        payload,
      );
      GoogleAnalyticsTrackerForAllStore(
        'GoogleProductDetailScript',
        storeId,
        payload,
      );
    }
  }, [details?.id, storeId, customerId]);

  return <ProductDetails {...props} />;
};

export default ProductDetails;
