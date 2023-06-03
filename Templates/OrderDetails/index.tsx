import React from 'react';
import OrderDetails_type1 from './OrderDetails_type1';
import OrderDetails_type2 from './OrderDetails_type2';
import OrderDetails_type3 from './OrderDetails_type3';

const orderDetailsTemplates: _OrderDetailsTemplates = {
  type1: OrderDetails_type1,
  type2: OrderDetails_type2,
  type3: OrderDetails_type3,
};

const OrderDetails: React.FC<{ id: string }> = ({ id }) => {
  const Component =
    orderDetailsTemplates[
      (`type${id}` as 'type1') || 'type2' || 'type3' || 'type4'
    ];
  return <Component />;
};

export default OrderDetails;
