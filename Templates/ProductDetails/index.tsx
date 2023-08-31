import { useEffect, useRef } from 'react';
import ProductDetails_Type1 from './ProductDetailsType1';

import {
  GoogleAnalyticsTrackerForAllStore,
  GoogleAnalyticsTrackerForCG,
  KlaviyoScriptHelper,
} from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _globalStore } from 'store.global';
import ProductDetails_Type2 from './productDetailType2';
import ProductDetails_Type3 from './productDetailType3';
import ProductDetails_Type4 from './productDetailType4';
import ProductDetails_Type5 from './productDetailType5';
import ProductDetails_Type6 from './productDetailType6';
import ProductDetails_Type7 from './productDetailsType7';

import { _ProductDetailsTemplates, _Props } from './productDetails';
import ProductDetails_Type8 from './productDetailsType8';
import ProductDetails_Type9 from './productDetailsType9';
let mediaBaseUrl = _globalStore.blobUrl;
let ignoreFirstCleanUp = true;

const ProductDetailTemplates: _ProductDetailsTemplates = {
  type1: ProductDetails_Type1,
  type2: ProductDetails_Type2,
  type3: ProductDetails_Type3,
  type4: ProductDetails_Type4,
  type5: ProductDetails_Type5,
  type6: ProductDetails_Type6,
  type7: ProductDetails_Type7,
  type8: ProductDetails_Type8,
  type9: ProductDetails_Type9,
};

const ProductDetails: React.FC<_Props> = (props) => {
  const { update_productDetails } = useActions_v2();
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const { categoryArr } = useTypedSelector_v2((state) => state.product);
  const { sizes } = useTypedSelector_v2((state) => state.product.product);

  const isCaptured = useRef(false);
  const clientSideMediaUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaUrl;
  useEffect(() => {
    document.body.classList.add('product_details');
  }, []);

  const { details, colors } = props;
  const ProductDetails =
    ProductDetailTemplates[
      `type${props.productDetailsTemplateId}` as
        | 'type1'
        | 'type2'
        | 'type3'
        | 'type4'
        | 'type5'
        | 'type6'
        | 'type7'
        | 'type8'
        | 'type9'
    ];
  useEffect(() => {
    if (details && storeId && categoryArr.length && !isCaptured.current) {
      isCaptured.current = true;

      const colourName = colors?.length
        ? colors.find((clr) => clr.productId === details?.id)?.name
        : '';
      const payload = {
        storeId: storeId,
        customerId: customerId || 0,
        productId: details?.id,
        productName: details?.name,
        colorName: colourName,
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

      const item = {
        ProductName: details?.name,
        ProductID: details?.id,
        SKU: details?.sku,
        Categories: categoryArr,
        ImageURL: colors && `${mediaBaseUrl}${colors[0]?.imageUrl}`,
        URL: window.location.href,
        Brand: details?.brandName,
        Price: details?.salePrice,
        CompareAtPrice: details?.msrp,
        VisitorType: customerId ? 'high-value' : 'low-value',
        Sizes: sizes,
        Colors: colourName,
      };
      const viewedItem = {
        Title: item?.ProductName,
        ItemId: item?.ProductID,
        Categories: item?.Categories,
        ImageUrl: item?.ImageURL,
        Url: item?.URL,
        Metadata: {
          Brand: item?.Brand,
          Price: item?.Price,
          CompareAtPrice: item?.CompareAtPrice,
        },
      };
      KlaviyoScriptHelper(['track', 'Viewed Product', item]);
      KlaviyoScriptHelper(['trackViewedItem', viewedItem]);
    }
  }, [details?.id, storeId, customerId, categoryArr]);

  useEffect(() => {
    return () => {
      if (ignoreFirstCleanUp) {
        ignoreFirstCleanUp = false;
        return;
      }
      update_productDetails('CLEAN_UP');
    };
  }, []);
  return <ProductDetails {...props} />;
};

export default ProductDetails;
