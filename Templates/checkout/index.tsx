import { _defaultTemplates } from '@configs/template.config';
import { CG_STORE_CODE } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { GoogleAnalyticsTrackerForCG } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';
import CheckoutType1 from './checkoutType1';
import CheckoutType2 from './checkoutType2';
import CheckoutType3 from './checkoutType3';
import CheckoutType4 from './checkoutType4';

interface _Props {
  templateId: number;
}

export interface CTTemplates {
  type1: FC<_Props>;
  type2: FC<_Props>;
  type3: FC<_Props>;
  type4: FC<_Props>;
}

const checkoutTemplates: CTTemplates = {
  type1: CheckoutType1,
  type2: CheckoutType2,
  type3: CheckoutType3,
  type4: CheckoutType4,
};

const CheckoutTemplate: FC<_Props> = ({ templateId }) => {
  const router = useRouter();
  const {
    cart: cartData,
    discount: cartDiscountDetails,
    isCartLoading,
  } = useTypedSelector_v2((state) => state.cart);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const isCaptured = useRef(false);

  useEffect(() => {
    let totalPrice = 0;
    cartData?.forEach((item) => (totalPrice += item.totalPrice));
    if (cartData?.length && storeId === CG_STORE_CODE && !isCaptured.current) {
      isCaptured.current = true;
      const payload = {
        storeId: storeId,
        customerId: customerId,
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
    }
  }, [cartData]);

  useEffect(() => {
    if (!isCartLoading && (!cartData?.length || cartData === null)) {
      router.push(paths.CART);
    }
  }, [cartData, isCartLoading]);

  const CheckoutSelectedTemplate =
    checkoutTemplates[_defaultTemplates.checkout];

  return <CheckoutSelectedTemplate templateId={templateId} />;
};

export default CheckoutTemplate;
