import { getServerSideProps } from '@controllers/getServerSideProps';
import OrdersTemplate from '@templates/Orders';
import { NextPage } from 'next';

const Orders: NextPage = () => {
  return (
    <>
      <OrdersTemplate id='2' />
    </>
  );
};
export { getServerSideProps };

export default Orders;
