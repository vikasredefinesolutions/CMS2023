import React from 'react';
import OrderDetails_type1 from './OrderDetails_type1';

const orderDetailsTemplates: _OrderDetailsTemplates = {
  type1: OrderDetails_type1,
  type2: OrderDetails_type1,
};

const OrderDetails: React.FC<{ id: number }> = ({ id }) => {
  const Component = orderDetailsTemplates[`type${id}` as 'type1' | 'type2'];
  return <Component />;
};

export default OrderDetails;
