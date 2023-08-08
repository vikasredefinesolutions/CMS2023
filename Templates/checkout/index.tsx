import { storeBuilderTypeId } from '@configs/page.config';
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
import CheckoutType3 from './checkoutType3';
import CheckoutType4 from './checkoutType4';
import CheckoutType5 from './checkoutType5';
import CheckoutType6 from './checkoutType6';
import CheckoutType7Refactor from './checkoutType7Refactor';

interface _Props {
  templateId: number;
}

enum _CHECKOUT_TEMPLATE_ID {
  CG = 1,
  PMCG = 1,
  CYX = 7,
  PKHG = 2,
  UHP = 7,
  SMH = 7,
  DI = 5,
  BB = 7,
  USE = 6,
  porsche = 7,
  Uniti = 7,
  UCA = 7,
}
export interface CTTemplates {
  type1: FC<_Props>;
  type2: FC<_Props>;
  type3: FC<_Props>;
  type4: FC<_Props>;
  type5: FC<_Props>;
  type6: FC<_Props>;
  type7: FC<_Props>;
}

const checkoutTemplates: CTTemplates = {
  type1: CheckoutType1,
  type2: CheckoutType2,
  type3: CheckoutType3,
  type4: CheckoutType4,
  type5: CheckoutType5,
  type6: CheckoutType6,
  type7: CheckoutType7Refactor,
};

const CheckoutTemplate: FC<_Props> = () => {
  const router = useRouter();
  const store = useTypedSelector_v2((state) => state.store);
  const {
    cart: cartData,
    discount: cartDiscountDetails,
    isCartLoading,
  } = useTypedSelector_v2((state) => state.cart);
  const {
    id: storeId,
    mediaBaseUrl,
    storeTypeId,
  } = useTypedSelector_v2((state) => state.store);
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
        customerId: customerId || 0,
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
      if (store.storeTypeId === storeBuilderTypeId) {
        router.push(paths.SB_PRODUCT_LISTING);
        return;
      }

      router.push(paths.CART);
    }
  }, [cartData, isCartLoading]);

  const storeCode = useTypedSelector_v2((state) => state.store.code);

  const templateId =
    storeBuilderTypeId === storeTypeId
      ? 6
      : (_CHECKOUT_TEMPLATE_ID as any)[storeCode] || 7;

  const CheckoutSelectedTemplate =
    checkoutTemplates[
      `type${templateId}` as
        | 'type1'
        | 'type2'
        | 'type3'
        | 'type4'
        | 'type5'
        | 'type6'
        | 'type7'
    ];
  return <CheckoutSelectedTemplate templateId={templateId} />;
};

export default CheckoutTemplate;
