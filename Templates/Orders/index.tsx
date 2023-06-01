import React from 'react';
import Orders_type1 from './Orders_Type1';
import Orders_Type2 from './Orders_Type2';
import Orders_type3 from './Orders_Type3';

const ordersTemplates: {
  type1: React.FC;
  type2: React.FC;
  type3: React.FC;
} = {
  type1: Orders_type1,
  type2: Orders_Type2,
  type3: Orders_type3,
};

const OrdersTemplate: React.FC<{ id: string }> = ({ id }) => {
  const Template =
    ordersTemplates[(`type${id}` as 'type1') || 'type2' || 'type3' || 'type4'];
  return <Template />;
};

export default OrdersTemplate;
