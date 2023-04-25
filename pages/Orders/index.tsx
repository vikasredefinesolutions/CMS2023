import { _defaultTemplates } from '@configs/template.config';
import { getServerSideProps } from '@controllers/getServerSideProps';
import OrdersTemplate from '@templates/Orders';
import { NextPage } from 'next';

const Orders: NextPage = () => {
  return (
    <>
      <OrdersTemplate id={_defaultTemplates.order} />
    </>
  );
};
export { getServerSideProps };

export default Orders;
