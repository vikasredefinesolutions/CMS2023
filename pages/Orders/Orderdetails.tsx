import { _defaultTemplates } from '@configs/template.config';
import Template from '@templates/OrderDetails';
import { NextPage } from 'next';

const OrderDetails: NextPage = () => {
  return (
    <>
      <Template id={_defaultTemplates.orderDetails} />;
    </>
  );
};

export default OrderDetails;
