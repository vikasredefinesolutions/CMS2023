import { getServerSideProps } from '@controllers/getServerSideProps';
import MyAccountTabs from '@templates/account/accountTemplate_Type1/components/MyAccountTab';
import OrdersTemplate from '@templates/Orders';
import { NextPage } from 'next';

const Orders: NextPage = () => {
  return (
    <>
      <MyAccountTabs />
      <OrdersTemplate id='1' />
    </>
  );
};
export { getServerSideProps };

export default Orders;
