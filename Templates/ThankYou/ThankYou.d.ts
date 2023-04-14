import React from 'react';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from 'types/API/user.res';

export interface _ThankYouProps {
  order: {
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  };
}

export interface _ThankYouTemplates {
  type1: React.FC<_ThankYouProps>;
  type2: React.FC<_ThankYouProps>;
  type3: React.FC<_ThankYouProps>;
  type4: React.FC<_ThankYouProps>;
}
