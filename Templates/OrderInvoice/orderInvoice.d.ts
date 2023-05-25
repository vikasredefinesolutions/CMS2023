import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import React from 'react';

interface _propsOrder {
  order: {
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  };
}
interface _OrderInvoiceTemplates {
  type1: React.Fc<_propsOrder>;
}
