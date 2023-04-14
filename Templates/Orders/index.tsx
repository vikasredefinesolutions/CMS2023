import React from 'react';
import Orders_type1 from './Orders_type1';

const ordersTemplates: {
  type1: React.FC;
  type2: React.FC;
} = {
  type1: Orders_type1,
  type2: Orders_type1,
};

const OrdersTemplate: React.FC<{ id: string }> = ({ id }) => {
  const Template = ordersTemplates[`type${id}` as 'type1' | `type2`];
  return <Template />;
};

export default OrdersTemplate;
