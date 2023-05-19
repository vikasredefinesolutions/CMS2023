import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { TrackGTMEvent } from '@helpers/common.helper';
import React, { useEffect } from 'react';
import { _ThankYouTemplates } from './ThankYou';
import ThankYouType1 from './ThankYouType1/ThankYou_Type1';
import ThankYouType2 from './ThankYouType2/ThankYou_Type2';
import ThankYouType3 from './ThankYouType3/ThankYou_Type3';
import ThankYouType4 from './ThankYou_Type4';

interface _props {
  order: {
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  };
  id: 'type1' | 'type2' | 'type3';
}

const ThankYouTemplates: _ThankYouTemplates = {
  type1: ThankYouType1,
  type2: ThankYouType2,
  type3: ThankYouType3,
  type4: ThankYouType4,
};

const ThankYouTemplate: React.FC<_props> = ({ order, id }) => {
  useEffect(() => {
    // GTM for purchase event
    const purchaseEventPayload = {
      pageTitle: document?.title || 'Receipt',
      pageCategory: 'Thank you page',
      visitorType: 'high-value',
      customProperty1: '',
      namedItem: '',
      event: 'purchase',
      ecommerce: {
        transaction_id: `T_${order?.billing?.id}`,
        affiliation: '',
        value: order?.billing?.orderTotal,
        lifetimeValue: '',
        tax: order?.billing?.orderTax,
        shipping: order?.billing?.orderShippingCosts,
        currency: 'USD',
        coupon: order?.billing?.couponCode,
        discount: order?.billing?.digitalTotal,
        items: order?.product?.map((item) => ({
          item_name: item?.productName,
          item_id: item?.sku,
          item_brand: item?.brandName,
          item_category: '',
          item_category2: '',
          item_category3: '',
          item_category4: '',
          item_list_name: item?.productName,
          item_list_id: item?.productId,
          index: item?.productId,
          quantity: item?.totalQty,
          price: item?.totalPrice,
        })),
      },
    };
    TrackGTMEvent(purchaseEventPayload);
  }, []);

  const ThankYouSelected = ThankYouTemplates[id];
  return (
    <>
      <ThankYouSelected order={order} />
    </>
  );
};

export default ThankYouTemplate;
