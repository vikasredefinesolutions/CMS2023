import React from 'react';
import OrderDetails_type1 from './OrderDetails_type1';
import OrderDetails_type2 from './OrderDetails_type2';

const orderDetailsTemplates: _OrderDetailsTemplates = {
  type1: OrderDetails_type1,
  type2: OrderDetails_type2,
};

const OrderDetails: React.FC<{ id: 'type1' | 'type2' }> = ({ id }) => {
  const Component = orderDetailsTemplates[id];
  return <Component />;
};

export default OrderDetails;
