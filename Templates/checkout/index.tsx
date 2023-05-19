import { _defaultTemplates } from '@configs/template.config';
import { paths } from '@constants/paths.constant';
import { TrackGTMEvent } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import CheckoutType1 from './checkoutType1';
import CheckoutType2 from './checkoutType2';
import CheckoutType3 from './checkoutType3';
import CheckoutType4 from './checkoutType4';

interface _Props {
  cartTemplateId: number;
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

const CheckoutTemplate: FC<_Props> = ({ cartTemplateId }) => {
  const router = useRouter();
  const {
    cart: cartData,
    discount: cartDiscountDetails,
    isCartLoading,
  } = useTypedSelector_v2((state) => state.cart);
  useEffect(() => {
    let totalPrice = 0;
    cartData?.forEach((item) => (totalPrice += item.totalPrice));
    const checkoutEventPayload = {
      pageTitle: document?.title || 'Checkout',
      pageCategory: 'Checkout page',
      visitorType: 'high-value',
      customProperty1: '',
      namedItem: '',
      event: 'begin_checkout',
      ecommerce: {
        value: totalPrice,
        currency: 'USD',
        coupon: cartDiscountDetails?.coupon || '',
        items: cartData?.map((item) => ({
          item_name: item?.productName,
          item_id: item?.sku,
          item_brand: item?.brandName,
          item_category: item?.categoryName,
          item_category2: '',
          item_category3: '',
          item_category4: '',
          item_variant: item?.attributeOptionValue,
          item_list_name: item?.productName,
          item_list_id: item?.productId,
          index: item?.productId,
          quantity: item?.totalQty,
          price: item?.totalPrice,
        })),
      },
    };
    TrackGTMEvent(checkoutEventPayload);
  }, []);

  useEffect(() => {
    if (!isCartLoading && (!cartData?.length || cartData === null)) {
      // console.log('---reaching condition---');
      router.push(paths.CART);
    }
  }, [cartData, isCartLoading]);

  const CheckoutSelectedTemplate =
    checkoutTemplates[_defaultTemplates.checkout];

  return <CheckoutSelectedTemplate cartTemplateId={cartTemplateId} />;
};

export default CheckoutTemplate;
