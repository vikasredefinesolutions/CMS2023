import { CG_STORE_CODE } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import {
  GoogleAnalyticsTrackerForAllStore,
  GoogleAnalyticsTrackerForCG,
  KlaviyoScriptHelper,
} from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchCategoryByproductId } from '@services/product.service';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';
import uuid from 'react-uuid';
import CheckoutType1 from './checkoutType1';
import CheckoutType2 from './checkoutType2';
import CheckoutType5 from './checkoutType3';
import CheckoutType4 from './checkoutType4';
import CheckoutType3 from './checkoutType5';

interface _Props {
  templateId: number;
}

export interface CTTemplates {
  type1: FC<_Props>;
  type2: FC<_Props>;
  type3: FC<_Props>;
  type4: FC<_Props>;
  type5: FC<_Props>;
}

const checkoutTemplates: CTTemplates = {
  type1: CheckoutType1,
  type2: CheckoutType2,
  type3: CheckoutType3,
  type4: CheckoutType4,
  type5: CheckoutType5,
};

const CheckoutTemplate: FC<_Props> = ({ templateId }) => {
  const router = useRouter();
  const {
    cart: cartData,
    discount: cartDiscountDetails,
    isCartLoading,
  } = useTypedSelector_v2((state) => state.cart);
  const { id: storeId, mediaBaseUrl } = useTypedSelector_v2(
    (state) => state.store,
  );
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const isCaptured = useRef(false);

  const startCheckoutKalviyo = async (totalPrice: number) => {
    let allProductCategories: Array<{
      productId: number;
      categories: string[];
    }> = [];
    if (cartData?.length)
      await Promise.all(
        cartData?.map(async (item) => {
          const response = await FetchCategoryByproductId(
            item.productId,
            storeId,
          );
          if (response && response[0]?.name) {
            const catNames = response[0].name.split(' > ');
            allProductCategories.push({
              productId: item.productId,
              categories: catNames,
            });
          }
        }),
      );

    const itemsName = cartData?.map((item) => item.productName);
    const uniqueCategories = new Set(
      allProductCategories?.map((prdct) => prdct.categories)?.flat(),
    );
    const item = {
      $event_id: uuid(),
      $value: totalPrice,
      ItemNames: itemsName,
      CheckoutURL: window.location.href,
      Categories: Array.from(uniqueCategories),
      VisitorType: customerId ? 'high-value' : 'low-value',
      Items: cartData?.map((prdct) => ({
        ProductID: prdct.productId,
        SKU: prdct.sku,
        ProductName: prdct.productName,
        Quantity: prdct.totalQty,
        ItemPrice: prdct.totalPrice,
        RowTotal: prdct.totalPrice,
        ProductURL: `${window.location.origin}/${prdct.seName}.html`,
        ImageURL: `${mediaBaseUrl}${prdct.colorImage}`,
        ProductCategories:
          allProductCategories?.find(
            (cate) => cate.productId === prdct.productId,
          )?.categories || [],
      })),
    };

    KlaviyoScriptHelper(['track', 'Started Checkout', item]);
  };

  useEffect(() => {
    let totalPrice = 0;
    cartData?.forEach((item) => (totalPrice += item.totalPrice));
    if (cartData?.length && storeId && !isCaptured.current) {
      isCaptured.current = true;
      const payload = {
        storeId: storeId,
        customerId: customerId,
        ...(storeId !== CG_STORE_CODE
          ? {
              value: totalPrice || '',
              coupon: cartDiscountDetails?.coupon || '',
            }
          : {}),
        shoppingCartItemsModel: cartData?.map((item) => ({
          productId: item.productId,
          productName: item?.productName,
          colorVariants: item?.attributeOptionValue,
          price: item.totalPrice,
          quantity: item.totalQty,
        })),
      };

      GoogleAnalyticsTrackerForCG(
        'GoogleBeginCheckOutScript',
        storeId,
        payload,
      );
      GoogleAnalyticsTrackerForAllStore(
        'GoogleBeginCheckOutScript',
        storeId,
        payload,
      );

      startCheckoutKalviyo(totalPrice);
    }
  }, [cartData, storeId]);

  useEffect(() => {
    if (!isCartLoading && (!cartData?.length || cartData === null)) {
      router.push(paths.CART);
    }
  }, [cartData, isCartLoading]);
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const CheckoutSelectedTemplate =
    checkoutTemplates[
      `type${templateId}` as 'type1' | 'type2' | 'type3' | 'type4' | 'type5'
    ];

  return <CheckoutSelectedTemplate templateId={templateId} />;
};

export default CheckoutTemplate;
