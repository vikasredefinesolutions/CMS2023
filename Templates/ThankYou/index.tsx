import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import React from 'react';
import { _ThankYouTemplates } from './ThankYou';
import ThankYouType1 from './ThankYouType1/ThankYou_Type1';
import ThankYouType2 from './ThankYouType2/ThankYou_Type2';
import ThankYouType3 from './ThankYou_Type3';
import ThankYouType4 from './ThankYou_Type4';

interface _props {
  order: {
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  };
  id: 'type1' | 'type2';
}

const ThankYouTemplates: _ThankYouTemplates = {
  type1: ThankYouType1,
  type2: ThankYouType2,
  type3: ThankYouType3,
  type4: ThankYouType4,
};

const ThankYouTemplate: React.FC<_props> = ({ order, id }) => {
  // console.log('id is ', id);

  const ThankYouSelected = ThankYouTemplates[id];
  return (
    <>
      <ThankYouSelected order={order} />
    </>
  );
};

export default ThankYouTemplate;
