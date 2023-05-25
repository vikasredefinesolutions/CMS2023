import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { GoogleAnalyticsTrackerForCG } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect, useRef } from 'react';
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
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const isCaptured = useRef(false);
  useEffect(() => {
    // GTM for purchase event
    if (order?.product?.length && order?.billing && !isCaptured.current) {
      isCaptured.current = true;
      const eventPayload = {
        storeId: storeId,
        customerId: customerId,
        orderId: order?.billing?.id,
        orderedShoppingCartItems: order?.product.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          colorVariants: item.attributeOptionValue,
          price: item.productTotal,
          quantity: item.totalQty,
        })),
      };
      GoogleAnalyticsTrackerForCG(
        'GoogleGetPurchaseJsonScript',
        storeId,
        eventPayload,
      );
    }
  }, [order, id]);

  const ThankYouSelected = ThankYouTemplates[id];
  return (
    <>
      <ThankYouSelected order={order} />
    </>
  );
};

export default ThankYouTemplate;
