import React from 'react';
import Orders_type1 from './Orders_Type1';
import Orders_Type2 from './Orders_Type2';
import Orders_type3 from './Orders_Type3';
import Orders_Type4 from './Orders_Type4';
import Orders_type6 from './Orders_Type6';
import Orders_type7 from './Orders_Type7';

const ordersTemplates: {
  type1: React.FC;
  type2: React.FC;
  type3: React.FC;
  type4: React.FC;

  type6: React.FC;
  type7: React.FC;
} = {
  type1: Orders_type1,
  type2: Orders_Type2,
  type3: Orders_type3,
  type4: Orders_Type4,
  type6: Orders_type6,
  type7: Orders_type7,
};

const OrdersTemplate: React.FC<{ id: string }> = ({ id }) => {
  const Template =
    ordersTemplates[
      (`type${id}` as 'type1') || 'type2' || 'type3' || 'type6' || 'type7'
    ];

  return <Template />;
};

export default OrdersTemplate;
