import { NextPage } from 'next';
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
  type1: NextPage<_ThankYouProps>;
  type2: NextPage<_ThankYouProps>;
  type3: NextPage<_ThankYouProps>;
  type4: NextPage<_ThankYouProps>;
  type5: NextPage<_ThankYouProps>;
}
